const fs = require('fs');
const path = require('path');

const datasetDir = path.join(__dirname, 'dataset');
const resumes = JSON.parse(fs.readFileSync(path.join(datasetDir, 'resumes_corpus.json'), 'utf8'));
const jds = JSON.parse(fs.readFileSync(path.join(datasetDir, 'job_descriptions.json'), 'utf8'));
const skillsTaxonomy = JSON.parse(fs.readFileSync(path.join(datasetDir, 'skills_taxonomy.json'), 'utf8'));

// Load previous functions
const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "as", "at", "be", "because", "been", "before", "being", "below",
  "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down",
  "during", "each", "few", "for", "from", "further", "had", "has", "have",
  "having", "he", "her", "here", "hers", "herself", "him", "himself", "his",
  "how", "i", "if", "in", "into", "is", "it", "its", "itself", "me", "more",
  "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only",
  "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
  "same", "she", "should", "so", "some", "such", "than", "that", "the", "their",
  "theirs", "them", "themselves", "then", "there", "these", "they", "this",
  "those", "through", "to", "too", "under", "until", "up", "very", "was", "we",
  "were", "what", "when", "where", "which", "while", "who", "whom", "why",
  "with", "would", "you", "your", "yours", "yourself", "yourselves"
]);

function tokenize(text) {
  if (!text) return [];
  const cleaned = text.toLowerCase()
    .replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\u2010-\u2015\u2212]/g, '-');
  const tokens = cleaned.match(/[a-zA-Z0-9]+(?:[\.\+\#\/\-][a-zA-Z0-9]+)*/g) || [];
  return tokens.filter(t => (!STOPWORDS.has(t) && t.length > 1) || t === 'c' || t === 'r');
}

function getResumeFullText(r) {
  const parts = [];
  if (r.summary) parts.push(`Summary: ${r.summary}`);
  if (r.skills) parts.push(`Skills: ${r.skills.join(', ')}`);
  if (r.experience) parts.push(`Experience: ${r.experience.join(' ')}`);
  if (r.projects) parts.push(`Projects: ${r.projects.join(' ')}`);
  if (r.education) parts.push(`Education: ${r.education}`);
  return parts.join(' \n');
}

function getJdFullText(jd) {
  return [
    `Title: ${jd.title}`,
    `Domain: ${jd.domain}`,
    `Required: ${jd.required_skills.join(', ')}`,
    `Preferred: ${jd.preferred_skills.join(', ')}`,
    `Description: ${jd.description}`
  ].join(' \n');
}

// Global IDF
const allDocs = [];
resumes.forEach(r => allDocs.push(getResumeFullText(r)));
jds.forEach(j => allDocs.push(getJdFullText(j)));

const df = {};
const N = allDocs.length;
allDocs.forEach(d => {
  const uniqueToks = new Set(tokenize(d));
  uniqueToks.forEach(t => { df[t] = (df[t] || 0) + 1; });
});

const tfidf_idf = {};
for (const t in df) tfidf_idf[t] = Math.log((N + 1) / (df[t] + 1)) + 1.0;

function computeTFIDFVector(text) {
  const toks = tokenize(text);
  const tf = {};
  toks.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
  const vec = {};
  for (const t in tf) {
    if (tfidf_idf[t]) vec[t] = (1.0 + Math.log(tf[t])) * tfidf_idf[t];
  }
  let norm = 0;
  for (const t in vec) norm += vec[t] * vec[t];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (const t in vec) vec[t] /= norm;
  }
  return vec;
}

function tfidfCosine(t1, t2) {
  const v1 = computeTFIDFVector(t1);
  const v2 = computeTFIDFVector(t2);
  let dot = 0;
  for (const t in v1) {
    if (v2[t]) dot += v1[t] * v2[t];
  }
  return dot;
}

// Diagnose JD_NLP_01
const nlpJd = jds.find(j => j.id === "JD_NLP_01");
const nlpJdText = getJdFullText(nlpJd);

console.log("=== CASE STUDY DIAGNOSTIC FOR NLP ENGINEER ROLE (JD_NLP_01) ===");
const candidatesScores = resumes.map(r => {
  const rText = getResumeFullText(r);
  const tfidf = tfidfCosine(rText, nlpJdText);
  return {
    id: r.id,
    name: r.name,
    domain: r.target_domain,
    tfidf_score: tfidf.toFixed(4)
  };
}).sort((a, b) => b.tfidf_score - a.tfidf_score);

console.table(candidatesScores.slice(0, 8));
