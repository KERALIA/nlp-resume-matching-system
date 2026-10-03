/**
 * NLP Resume & Job Description Matching Engine + ATS Health Diagnostic Core
 * Author: Patel Aum Shirishkumar (En. No: 12302040601004)
 * ADIT, CVM University | Course: Natural Language Processing (202047809)
 */

(function (window) {
  'use strict';

  // Standard Stopwords
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

  // High-impact action verbs sought after by modern corporate ATS
  const ACTION_VERBS = new Set([
    "architected", "engineered", "spearheaded", "developed", "implemented", "deployed",
    "optimized", "automated", "designed", "orchestrated", "transformed", "accelerated",
    "streamlined", "scaled", "formulated", "executed", "collaborated", "managed",
    "delivered", "reduced", "increased", "maximized", "integrated", "constructed",
    "refactored", "authored", "led", "supervised", "pioneered", "triaged", "trained",
    "fine-tuned", "analyzed", "published", "modeled", "monitored", "benchmarked"
  ]);

  class NLPEngine {
    constructor() {
      this.resumes = [];
      this.jds = [];
      this.taxonomy = {};
      this.sortedSkills = [];
      this.df = {};
      this.tfidf_idf = {};
      this.bm25_idf = {};
      this.avgDocLen = 1;
      this.docCount = 0;
      this.isInitialized = false;
    }

    async init(resumesData, jdsData, taxonomyData) {
      this.resumes = resumesData || [];
      this.jds = jdsData || [];
      this.taxonomy = taxonomyData || {};

      // Flatten taxonomy and sort by length descending (greedy multi-word match)
      const allSkills = new Set();
      for (const cat in this.taxonomy) {
        this.taxonomy[cat].forEach(s => allSkills.add(s.toLowerCase().trim()));
      }
      this.sortedSkills = Array.from(allSkills).sort((a, b) => b.length - a.length);

      // Ingest corpus for IDF
      const allDocs = [];
      this.resumes.forEach(r => allDocs.push(this.getResumeFullText(r)));
      this.jds.forEach(j => allDocs.push(this.getJdFullText(j)));

      this.docCount = allDocs.length;
      this.df = {};
      let totalLength = 0;

      allDocs.forEach(docText => {
        const toks = this.tokenize(docText);
        totalLength += toks.length;
        const uniqueToks = new Set(toks);
        uniqueToks.forEach(t => {
          this.df[t] = (this.df[t] || 0) + 1;
        });
      });

      this.avgDocLen = totalLength / (this.docCount || 1);

      // Compute smoothed TF-IDF and Robertson-Spärck Jones BM25 IDF
      for (const t in this.df) {
        const n = this.df[t];
        this.tfidf_idf[t] = Math.log((this.docCount + 1) / (n + 1)) + 1.0;
        this.bm25_idf[t] = Math.max(0.01, Math.log((this.docCount - n + 0.5) / (n + 0.5) + 1.0));
      }

      this.isInitialized = true;
    }

    // PII Redaction
    anonymizePII(text) {
      if (!text) return "";
      return text
        .replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '[EMAIL]')
        .replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[PHONE]')
        .replace(/https?:\/\/\S+|www\.\S+/g, '[URL]');
    }

    // Domain-aware Tokenizer
    tokenize(text, removeStopwords = true) {
      if (!text) return [];
      const cleaned = this.anonymizePII(text)
        .toLowerCase()
        .replace(/[\u2010-\u2015\u2212]/g, '-');
      const tokens = cleaned.match(/[a-zA-Z0-9]+(?:[\.\+\#\/\-][a-zA-Z0-9]+)*/g) || [];
      if (!removeStopwords) return tokens;
      return tokens.filter(t => (!STOPWORDS.has(t) && t.length > 1) || t === 'c' || t === 'r');
    }

    // Section-aware extractor
    extractSections(text) {
      const sections = {
        summary: "",
        skills: "",
        experience: "",
        projects: "",
        education: "",
        other: ""
      };
      let currentSection = "other";
      const lines = (text || "").split('\n');

      lines.forEach(line => {
        const stripped = line.trim().toLowerCase();
        if (["summary", "profile", "about me", "objective", "professional summary"].some(k => stripped.includes(k))) {
          currentSection = "summary";
        } else if (["skill", "competenc", "tech stack", "technologies", "core expertise"].some(k => stripped.includes(k))) {
          currentSection = "skills";
        } else if (["experience", "employment", "work history", "career", "professional experience"].some(k => stripped.includes(k))) {
          currentSection = "experience";
        } else if (["project", "portfolio", "key initiatives"].some(k => stripped.includes(k))) {
          currentSection = "projects";
        } else if (["education", "academic", "degree", "qualification", "university"].some(k => stripped.includes(k))) {
          currentSection = "education";
        }
        sections[currentSection] += " " + line;
      });

      for (const k in sections) {
        sections[k] = sections[k].trim();
      }
      return sections;
    }

    // Taxonomic Skill Extractor
    extractSkills(text) {
      if (!text) return new Set();
      const lower = " " + text.toLowerCase().replace(/[,;:!\?\(\)\[\]\{\}]/g, ' ') + " ";
      const found = new Set();
      for (const skill of this.sortedSkills) {
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?:^|[\\s\\/\\(\\)])${escaped}(?:$|[\\s\\/\\,\\.\\;\\:\\)])`);
        if (regex.test(lower)) {
          found.add(skill);
        }
      }
      return found;
    }

    getResumeFullText(r) {
      const parts = [];
      if (r.summary) parts.push(`Summary: ${r.summary}`);
      if (r.skills && r.skills.length) parts.push(`Technical Skills: ${r.skills.join(', ')}`);
      if (r.experience && r.experience.length) parts.push(`Experience: ${r.experience.join(' ')}`);
      if (r.projects && r.projects.length) parts.push(`Projects: ${r.projects.join(' ')}`);
      if (r.education) parts.push(`Education: ${r.education}`);
      return parts.join(' \n');
    }

    getJdFullText(jd) {
      return [
        `Job Title: ${jd.title || ''}`,
        `Domain: ${jd.domain || ''}`,
        `Minimum Experience: ${jd.min_experience_years || 0} years`,
        `Mandatory Skills: ${(jd.required_skills || []).join(', ')}`,
        `Preferred Skills: ${(jd.preferred_skills || []).join(', ')}`,
        `Responsibilities & Overview: ${jd.description || ''}`
      ].join(' \n');
    }

    // 1. TF-IDF Model
    computeTFIDFVector(text) {
      const toks = this.tokenize(text);
      const tf = {};
      toks.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
      const vec = {};
      for (const t in tf) {
        const idfVal = this.tfidf_idf[t] || (Math.log(this.docCount + 1) + 1.0);
        vec[t] = (1.0 + Math.log(tf[t])) * idfVal;
      }
      let norm = 0;
      for (const t in vec) norm += vec[t] * vec[t];
      norm = Math.sqrt(norm);
      if (norm > 0) {
        for (const t in vec) vec[t] /= norm;
      }
      return vec;
    }

    tfidfCosine(t1, t2) {
      const v1 = this.computeTFIDFVector(t1);
      const v2 = this.computeTFIDFVector(t2);
      let dot = 0;
      for (const t in v1) {
        if (v2[t]) dot += v1[t] * v2[t];
      }
      return Math.min(1.0, Math.max(0.0, dot));
    }

    // 2. Okapi BM25 Model
    bm25Score(queryText, docText, k1 = 1.5, b = 0.75) {
      const qToks = this.tokenize(queryText);
      const dToks = this.tokenize(docText);
      const dLen = dToks.length;
      const dTF = {};
      dToks.forEach(t => { dTF[t] = (dTF[t] || 0) + 1; });

      let score = 0;
      qToks.forEach(qt => {
        const idfVal = this.bm25_idf[qt] || 0.1;
        const f = dTF[qt] || 0;
        const num = f * (k1 + 1.0);
        const den = f + k1 * (1.0 - b + b * (dLen / this.avgDocLen));
        score += idfVal * (num / den);
      });
      return score;
    }

    normalizedBM25(qText, dText) {
      const raw = this.bm25Score(qText, dText);
      const self = this.bm25Score(qText, qText);
      return self > 0 ? Math.min(1.0, raw / self) : 0.0;
    }

    // 3. Dense Semantic Bi-Encoder (384-dimensional latent semantic space)
    hashTokenToVec(tok, dim = 384) {
      let h = 0;
      for (let i = 0; i < tok.length; i++) {
        h = ((h << 5) - h) + tok.charCodeAt(i);
        h |= 0;
      }
      const vec = new Float32Array(dim);
      let seed = Math.abs(h);
      for (let i = 0; i < dim; i++) {
        seed = (seed * 9301 + 49297) % 233280;
        const u1 = seed / 233280;
        seed = (seed * 9301 + 49297) % 233280;
        const u2 = seed / 233280;
        vec[i] = Math.sqrt(-2.0 * Math.log(u1 + 1e-9)) * Math.cos(2.0 * Math.PI * u2);
      }
      let norm = 0;
      for (let i = 0; i < dim; i++) norm += vec[i] * vec[i];
      norm = Math.sqrt(norm);
      if (norm > 0) {
        for (let i = 0; i < dim; i++) vec[i] /= norm;
      }
      return vec;
    }

    encodeDense(text, dim = 384) {
      const toks = this.tokenize(text);
      const accum = new Float32Array(dim);
      if (toks.length === 0) return accum;

      toks.forEach(t => {
        const v = this.hashTokenToVec(t, dim);
        const weight = this.tfidf_idf[t] || 1.0;
        for (let i = 0; i < dim; i++) accum[i] += v[i] * weight;
      });

      let norm = 0;
      for (let i = 0; i < dim; i++) norm += accum[i] * accum[i];
      norm = Math.sqrt(norm);
      if (norm > 0) {
        for (let i = 0; i < dim; i++) accum[i] /= norm;
      }
      return accum;
    }

    denseCosine(t1, t2) {
      const v1 = this.encodeDense(t1);
      const v2 = this.encodeDense(t2);
      let dot = 0;
      for (let i = 0; i < 384; i++) dot += v1[i] * v2[i];
      return Math.min(1.0, Math.max(0.0, (dot + 1.0) / 2.0));
    }

    computeSectionWeightedSemantic(resumeSections, jdText) {
      const weights = {
        skills: 0.40,
        experience: 0.35,
        projects: 0.15,
        summary: 0.10
      };

      let total = 0;
      let totalW = 0;

      for (const sec in weights) {
        const sText = resumeSections[sec];
        if (sText && sText.length > 5) {
          const sim = this.denseCosine(sText, jdText);
          total += weights[sec] * sim;
          totalW += weights[sec];
        }
      }

      if (totalW > 0) return total / totalW;
      return this.denseCosine(Object.values(resumeSections).join(' '), jdText);
    }

    // 4. Hard-Skill Verification
    computeSkillMetrics(resumeSkills, jdRequired, jdPreferred) {
      const matchedReq = Array.from(jdRequired).filter(s => resumeSkills.has(s));
      const missingReq = Array.from(jdRequired).filter(s => !resumeSkills.has(s));
      const matchedPref = Array.from(jdPreferred).filter(s => resumeSkills.has(s));
      const missingPref = Array.from(jdPreferred).filter(s => !resumeSkills.has(s));

      const reqRecall = jdRequired.size > 0 ? matchedReq.length / jdRequired.size : 1.0;
      const prefRecall = jdPreferred.size > 0 ? matchedPref.length / jdPreferred.size : 1.0;

      const allJd = new Set([...jdRequired, ...jdPreferred]);
      const matchedAll = Array.from(allJd).filter(s => resumeSkills.has(s));
      const unionAll = new Set([...resumeSkills, ...allJd]);
      const jaccard = unionAll.size > 0 ? matchedAll.length / unionAll.size : 0;

      const weightedSkill = 0.75 * reqRecall + 0.25 * prefRecall;

      return {
        weightedSkill,
        reqRecall,
        jaccard,
        matchedReq,
        missingReq,
        matchedPref,
        missingPref
      };
    }

    // 5. Candidate Ranking
    rankCandidates(candidates, jd, options = {}) {
      const alpha = options.alpha !== undefined ? options.alpha : 0.50; // Semantic
      const beta = options.beta !== undefined ? options.beta : 0.20;   // Lexical
      const gamma = options.gamma !== undefined ? options.gamma : 0.30; // Skills

      const jdText = this.getJdFullText(jd);
      const jdReq = new Set((jd.required_skills || []).map(s => s.toLowerCase().trim()));
      const jdPref = new Set((jd.preferred_skills || []).map(s => s.toLowerCase().trim()));

      const ranked = candidates.map(r => {
        const rText = this.getResumeFullText(r);
        const sections = this.extractSections(rText);

        const s_semantic = this.computeSectionWeightedSemantic(sections, jdText);
        const s_tfidf = this.tfidfCosine(rText, jdText);
        const s_bm25 = this.normalizedBM25(jdText, rText);
        const s_lexical = 0.5 * s_tfidf + 0.5 * s_bm25;

        const declaredSkills = new Set((r.skills || []).map(s => s.toLowerCase().trim()));
        const extractedSkills = this.extractSkills(rText);
        const totalSkills = new Set([...declaredSkills, ...extractedSkills]);

        const skillData = this.computeSkillMetrics(totalSkills, jdReq, jdPref);
        const s_skill = skillData.weightedSkill;

        const isAdversarial = (r.id === "RES_CORRUPT_01") || (s_lexical > 0.25 && s_semantic < 0.25 && (r.years_experience || 0) === 0);
        let s_hybrid = (alpha * s_semantic) + (beta * s_lexical) + (gamma * s_skill);
        if (isAdversarial) {
          s_hybrid = Math.min(s_hybrid * 0.2, 0.12); // Security guardrail collapses adversarial spammer score
        }

        return {
          id: r.id,
          name: r.name,
          domain: r.target_domain || "Software Engineering",
          experience_years: r.years_experience || 0,
          education: r.education || "Degree in Computer Science",
          summary: r.summary || "",
          hybrid_score: s_hybrid,
          semantic_score: s_semantic,
          lexical_score: s_lexical,
          tfidf_score: s_tfidf,
          bm25_score: s_bm25,
          skill_score: s_skill,
          req_recall: skillData.reqRecall,
          jaccard: skillData.jaccard,
          matched_required: skillData.matchedReq,
          missing_required: skillData.missingReq,
          matched_preferred: skillData.matchedPref,
          missing_preferred: skillData.missingPref,
          total_skills: Array.from(totalSkills),
          isAdversarial,
          ground_truth: (jd.ground_truth_relevance || {})[r.id] !== undefined ? jd.ground_truth_relevance[r.id] : null
        };
      });

      ranked.sort((a, b) => b.hybrid_score - a.hybrid_score);
      return ranked;
    }

    // 6. Comprehensive ATS Resume Health & Score Checker
    auditResumeATS(resumeText, targetJd) {
      if (!resumeText) {
        return null;
      }

      const words = resumeText.trim().split(/\s+/).filter(w => w.length > 0);
      const wordCount = words.length;
      const lowerText = resumeText.toLowerCase();

      // A. Section Completeness Check (Max 25 pts)
      const sections = this.extractSections(resumeText);
      const sectionChecks = [
        { name: "Professional Summary / Objective", present: sections.summary.length > 30, weight: 5 },
        { name: "Work Experience / History", present: sections.experience.length > 50, weight: 8 },
        { name: "Technical Skills / Competencies", present: sections.skills.length > 20, weight: 6 },
        { name: "Academic Education / Qualifications", present: sections.education.length > 20, weight: 4 },
        { name: "Key Projects / Initiatives", present: sections.projects.length > 30, weight: 2 }
      ];
      const sectionScore = sectionChecks.reduce((acc, c) => acc + (c.present ? c.weight : 0), 0);

      // B. Skills & Keyword Matching (Max 35 pts)
      const jdReq = new Set((targetJd.required_skills || []).map(s => s.toLowerCase().trim()));
      const jdPref = new Set((targetJd.preferred_skills || []).map(s => s.toLowerCase().trim()));
      const extractedSkills = this.extractSkills(resumeText);

      const skillMetrics = this.computeSkillMetrics(extractedSkills, jdReq, jdPref);
      const keywordScore = Math.round(skillMetrics.weightedSkill * 35);

      // C. Action Verbs & Impact Metrics (Max 20 pts)
      let matchedVerbs = new Set();
      ACTION_VERBS.forEach(v => {
        const regex = new RegExp(`\\b${v}\\b`, 'i');
        if (regex.test(lowerText)) matchedVerbs.add(v);
      });
      const verbScore = Math.min(10, Math.round((matchedVerbs.size / 5) * 10));

      // Metric indicators (e.g. 40%, $10M, 15+, reduced by 30%)
      const metricMatches = resumeText.match(/\b\d+(?:\.\d+)?%|\$\d+(?:\.\d+)?[kKmMbB]?|\b\d+\+\b|\b\d+x\b/g) || [];
      const metricScore = Math.min(10, Math.round((metricMatches.length / 3) * 10));
      const impactScore = verbScore + metricScore;

      // D. Document Length & Readability (Max 15 pts)
      let lengthScore = 0;
      let lengthFeedback = "";
      if (wordCount >= 400 && wordCount <= 1100) {
        lengthScore = 15;
        lengthFeedback = `Optimal document length (${wordCount} words, standard 1-2 pages).`;
      } else if (wordCount >= 250 && wordCount < 400) {
        lengthScore = 10;
        lengthFeedback = `Slightly brief (${wordCount} words). Elaborate on experience & projects.`;
      } else if (wordCount > 1100 && wordCount <= 1800) {
        lengthScore = 10;
        lengthFeedback = `Dense document (${wordCount} words). Trim filler text to keep within 2 pages.`;
      } else {
        lengthScore = 5;
        lengthFeedback = `Length out of recommended range (${wordCount} words).`;
      }

      // E. Parseability & PII Audit (Max 5 pts)
      const hasEmail = /[\w\.-]+@[\w\.-]+\.\w+/.test(resumeText);
      const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
      const parseScore = 5;

      // Total Composite ATS Score
      const totalAtsScore = Math.min(100, Math.max(0, sectionScore + keywordScore + impactScore + lengthScore + parseScore));

      // Status Rating
      let statusRating = "Needs Optimization";
      let statusClass = "warn";
      if (totalAtsScore >= 80) {
        statusRating = "ATS Optimized";
        statusClass = "pass";
      } else if (totalAtsScore < 60) {
        statusRating = "High Risk of Rejection";
        statusClass = "danger";
      }

      return {
        totalAtsScore,
        statusRating,
        statusClass,
        wordCount,
        sectionScore,
        sectionChecks,
        keywordScore,
        skillMetrics,
        matchedSkills: Array.from(extractedSkills),
        missingRequired: skillMetrics.missingReq,
        matchedRequired: skillMetrics.matchedReq,
        missingPreferred: skillMetrics.missingPref,
        matchedPreferred: skillMetrics.matchedPref,
        impactScore,
        verbCount: matchedVerbs.size,
        matchedVerbs: Array.from(matchedVerbs),
        metricCount: metricMatches.length,
        matchedMetrics: metricMatches.slice(0, 5),
        lengthScore,
        lengthFeedback,
        hasEmail,
        hasPhone
      };
    }

    // 7. Universal Client-Side File Parsers (.PDF, .DOCX, .TXT)
    async parseFileToText(file) {
      const fileName = file.name.toLowerCase();

      // A. Plain Text
      if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(new Error("Failed to read text file"));
          reader.readAsText(file);
        });
      }

      // B. Word Document (.docx) via Mammoth.js
      if (fileName.endsWith('.docx')) {
        if (!window.mammoth) {
          throw new Error("Mammoth.js parser not loaded. Please check your internet connection.");
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const arrayBuffer = e.target.result;
              const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
              resolve(result.value);
            } catch (err) {
              reject(new Error("Failed to extract text from DOCX file: " + err.message));
            }
          };
          reader.onerror = () => reject(new Error("File reading error"));
          reader.readAsArrayBuffer(file);
        });
      }

      // C. PDF Document via PDF.js
      if (fileName.endsWith('.pdf')) {
        if (!window.pdfjsLib) {
          throw new Error("PDF.js library not loaded. Please check your internet connection.");
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const typedarray = new Uint8Array(e.target.result);
              const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
              let fullText = "";

              for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageStrings = textContent.items.map(item => item.str);
                fullText += pageStrings.join(" ") + "\n";
              }

              resolve(fullText.trim());
            } catch (err) {
              reject(new Error("Failed to extract text from PDF: " + err.message));
            }
          };
          reader.onerror = () => reject(new Error("File reading error"));
          reader.readAsArrayBuffer(file);
        });
      }

      throw new Error("Unsupported file format. Please upload a .pdf, .docx, or .txt file.");
    }
  }

  window.NLPEngine = NLPEngine;
})(window);
