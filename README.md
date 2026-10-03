# NLP-Based Resume and Job Description Matching System

**Author**: Patel Aum Shirishkumar  
**Enrollment No**: 12302040601004  
**Department**: Department of Computer Engineering, A. D. Patel Institute of Technology (CVM University)  
**Course**: Natural Language Processing (Course Code: 202047809)  

---

## 1. Project Overview

This repository provides an automated, domain-aware candidate recommendation and semantic matching engine designed to overcome the classical shortcomings of legacy Applicant Tracking Systems (ATS).

### Key Technical Contributions:
1. **Section-Aware Normalization**: Segregates raw unstructured resumes into contextual zones (*Summary, Skills, Experience, Projects, Education*) while stripping PII for ethical bias-free recruitment.
2. **Lexical Baseline Implementations**: Vector Space TF-IDF with sub-linear term frequency scaling and Robertson-Spärck Jones Okapi BM25.
3. **Contextual Semantic Matching**: Dense bi-encoder representation leveraging Sentence-BERT (`all-MiniLM-L6-v2`) generating 384-dimensional contextual vectors with section weighting.
4. **Taxonomic Hard-Skill Overlap & Gap Diagnostic**: Phrase-matching over a 350+ technical competency taxonomy across 7 engineering sub-fields.
5. **Tri-Partite Hybrid Architecture**: Linearly combined scoring function:
   $$S_{\text{hybrid}} = \alpha \cdot S_{\text{semantic}} + \beta \cdot S_{\text{lexical}} + \gamma \cdot S_{\text{skill}}$$
   calibrated at $\alpha = 0.50, \beta = 0.20, \gamma = 0.30$.
6. **Academic Evaluation Suite**: Automated computation of Information Retrieval metrics: Precision@K ($K \in \{1, 3, 5\}$), Recall@K ($K \in \{3, 5\}$), Mean Reciprocal Rank (MRR), Normalized Discounted Cumulative Gain (NDCG@3, NDCG@5), and inference latency.

---

## 2. Directory Structure

```
nlp_resume_matcher/
├── dataset/
│   ├── resumes_corpus.json       # 17 annotated candidate resumes spanning 5 domains & edge cases
│   ├── job_descriptions.json    # 5 curated target JDs with graded ground truth (0 to 3)
│   └── skills_taxonomy.json      # Structured taxonomy of 350+ tech skills
├── src/
│   ├── __init__.py
│   ├── data_loader.py            # Data ingestion, corpus serialization, and text flattening
│   ├── preprocessor.py           # PII redaction, tokenization, and section extraction
│   ├── skill_extractor.py        # Taxonomic phrase matching, Jaccard, and skill gap diagnostics
│   ├── baseline_matcher.py       # TF-IDF cosine similarity and Okapi BM25 implementation
│   ├── semantic_matcher.py       # Contextual SBERT dense embeddings & section-weighted cosine
│   ├── hybrid_engine.py          # Tri-partite hybrid scoring and candidate ranking engine
│   └── evaluate.py               # Precision@K, Recall@K, MRR, NDCG@K, Latency calculations
├── results/                      # Output benchmark metrics and ablation tables
├── requirements.txt              # Standard Python library dependencies
├── run_experiments.py            # End-to-end benchmark execution script
└── README.md                     # Technical architecture documentation
```

---

## 3. Installation & Usage

### Prerequisites
- Python 3.8+ or Google Colab runtime
- `pip install -r requirements.txt`

### Running Experiments
To execute the complete benchmark across all five architectures (TF-IDF, BM25, Dense SBERT, SBERT+Skill, Hybrid) and compute all evaluation metrics:
```bash
python run_experiments.py
```

The script outputs a formatted comparative table in the console and saves the serialized results to `results/benchmark_metrics.json`.
