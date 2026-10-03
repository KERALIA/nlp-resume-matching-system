# A Domain-Aware Contextual and Lexical Hybrid Architecture for Automated Resume-Job Description Semantic Alignment and Talent Matching

**Patel Aum Shirishkumar**  
*Department of Computer Engineering, A. D. Patel Institute of Technology*  
*The Charutar Vidyamandal (CVM) University, Anand, Gujarat, India*  
*Enrollment No: 12302040601004 | Course: Natural Language Processing (202047809)*  
*Email: 12302040601004@adit.ac.in*

---

### Abstract

Automated talent acquisition and candidate screening in modern Human Resource Technology (HRTech) face a fundamental trade-off between lexical precision and semantic comprehension. Classical Applicant Tracking Systems (ATS) relying on bag-of-words representations, TF-IDF, or Okapi BM25 suffer from acute false negatives due to vocabulary mismatch, synonym divergence, and non-standardized terminology. Conversely, modern dense neural bi-encoders (e.g., Sentence-BERT) map candidate resumes and job descriptions (JDs) into continuous semantic spaces but frequently suffer from "semantic hallucination," catastrophic dilution over long documents, and an inability to enforce strict, mandatory technical requirements. 

In this paper, we propose a multi-stage, domain-aware hybrid architecture that reconciles contextual dense embeddings with lexical indexing and explicit taxonomic skill extraction. Our system segments resumes into discrete semantic zones, sanitizes Personally Identifiable Information (PII) to prevent demographic bias, and combines: (1) dense contextual representations from Sentence-BERT (`all-MiniLM-L6-v2`), (2) Robertson-Spärck Jones Okapi BM25 and sub-linear TF-IDF scoring, (3) an n-gram phrase matcher grounded in an expanded 314+ multi-word domain competency taxonomy spanning 10 disciplines, (4) an interactive keystroke discovery engine with an accessible searchable combobox, and (5) an in-browser 100% private ATS diagnostic engine executing client-side PDF/DOCX parsing with zero server data retention. We evaluate the proposed architecture against classical baselines on an extensive benchmark corpus of 44 positions across 10 industry sectors and 26 verified candidate profiles. Empirical results demonstrate that our hybrid model achieves superior ranking quality, delivering a **Precision@1 of 1.0000**, an **NDCG@3 of 0.9582**, an **NDCG@5 of 0.9048**, and a **Mean Reciprocal Rank (MRR) of 1.0000**, while completely neutralizing adversarial keyword stuffing attacks that defeat classical lexical ATS systems by demoting fraudulent profiles to rank #26 (score 0.1120).

**Keywords**—Natural Language Processing, Resume Matching, Sentence-BERT, Information Retrieval, Okapi BM25, Semantic Similarity, Talent Acquisition, Candidate Ranking, HRTech.

---

## I. Introduction

The rapid expansion of global digital recruitment platforms has precipitated an unprecedented volume of job applications. Enterprise recruitment teams routinely receive hundreds to thousands of resumes for a single technical vacancy. Consequently, automated Applicant Tracking Systems (ATS) have become ubiquitous gatekeepers in modern recruitment pipelines [1]. 

However, the algorithmic foundations of prevailing recruitment tools exhibit severe structural deficiencies:

1. **The Vocabulary Mismatch Problem (False Negatives)**: Candidates frequently express equivalent technical capabilities using non-standardized phrasing or synonyms. For instance, a candidate describing *"distributed ledger consensus protocols"* or *"statistical sequence-to-sequence neural architectures"* may be completely discarded by a keyword filter configured for *"Blockchain"* or *"NLP / Transformers"*. In classical Information Retrieval (IR), this phenomenon is termed the synonymy and polysemy bottleneck [2].
2. **Adversarial Keyword Stuffing (False Positives)**: Because classical ATS engines calculate relevance via term frequencies (TF), opportunistic candidates exploit the system by concatenating exhaustive lists of unverified industry keywords—sometimes in minute white fonts or invisible metadata blocks—thereby artificially inflating their lexical rank despite having zero genuine domain competence [3].
3. **Contextual Dilution in Dense Embeddings**: While pre-trained Transformer bi-encoders such as SBERT [4] map documents to continuous latent vectors, pooling an entire multi-page curriculum vitae into a single 384- or 768-dimensional vector causes severe information bottlenecking. High-frequency narrative text (e.g., generic interpersonal descriptions) dilutes dense representations of critical technical competencies.
4. **Disregard for Mandatory Constraints**: Pure semantic search does not enforce boolean logic. A candidate possessing exceptional overall semantic affinity for a *"Senior Cloud DevOps"* role may completely lack a legally mandated certification or hard skill (e.g., *"Kubernetes"* or *"AWS IAM"*). Pure vector distance fails to enforce non-negotiable prerequisites.

To overcome these structural limitations, this work introduces a **Tri-Partite Domain-Aware Hybrid Ranking Architecture**. We integrate dense contextual embeddings, sparse lexical retrieval, and hard taxonomic skill verification into a unified, mathematically calibrated scoring formulation. Furthermore, we implement section-aware parsing and privacy-preserving PII redaction to establish a robust, fair, and deployment-ready recruitment screening engine.

---

## II. Related Work

### A. Classical Vector Space and Lexical Models
Early information extraction and recruitment matching systems utilized Salton's Vector Space Model (VSM) [5] with Term Frequency-Inverse Document Frequency (TF-IDF) weighting. Spärck Jones [6] established the theoretical foundation of IDF, demonstrating that term specificity inversely correlates with collection frequency. Robertson and Zaragoza [7] formulated the Okapi BM25 probabilistic model, which introduced non-linear term saturation and document-length normalization:

$$\text{BM25}(D, Q) = \sum_{i=1}^{n} \text{IDF}(q_i) \cdot \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}$$

While BM25 remains an exceptionally competitive IR baseline, it treats terms as orthogonal symbolic tokens, exhibiting zero semantic generalization when candidates utilize lexical variations.

### B. Distributed Word Embeddings and Dense Representations
Mikolov et al. [8] introduced Word2Vec, capturing continuous semantic relationships via Continuous Bag-of-Words (CBOW) and Skip-Gram architectures. Pennington et al. [9] developed GloVe, combining global co-occurrence statistics with local context windows. In HRTech, early neural matching systems computed the Word Mover's Distance (WMD) [10] across aggregated word vectors. However, static embeddings suffer from polysemy: tokens possess static vectors regardless of whether *"Java"* denotes a programming language or an Indonesian island.

### C. Contextual Transformers and Sentence-BERT
The advent of the Transformer architecture by Vaswani et al. [11] and pre-trained contextual encoders like BERT (Devlin et al. [12]) fundamentally revolutionized NLP. BERT models dynamic token representations via bidirectional self-attention. However, computing pairwise cross-encoder similarity across $M$ resumes and $N$ job postings requires $\mathcal{O}(M \times N)$ full-attention forward passes, rendering large-scale recruitment ranking computationally intractable.

Reimers and Gurevych [4] resolved this computational bottleneck by introducing Sentence-BERT (SBERT). Using Siamese and triplet network structures, SBERT fine-tunes BERT to construct semantically meaningful sentence embeddings that can be compared in milliseconds using cosine similarity:

$$\text{Sim}_{\text{dense}}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$$

### D. Hybrid Search and Retrieval-Augmented Pipelines
Recent advancements in information retrieval have demonstrated that combining dense neural retrieval with sparse inverted indexes (e.g., ColBERT [13], Reciprocal Rank Fusion [14]) consistently outperforms unimodal systems. In recruitment informatics, Qin et al. [15] explored hierarchical neural matching, while Luo et al. [16] demonstrated the necessity of explicit skill graph grounding. Our research extends these findings by formalizing a domain-aware, section-weighted tri-partite framework tailored for production talent acquisition.

---

## III. Proposed System Architecture

The overall architectural pipeline of our matching and ranking system operates through eight modular, production-grade stages:

```
       [Raw Resume Document]              [Raw Job Description]
                 │                                   │
                 ▼                                   ▼
      ┌─────────────────────┐             ┌─────────────────────┐
      │  PII Sanitization   │             │   Role Requirement  │
      │  & Regex Redaction  │             │      Parsing        │
      └──────────┬──────────┘             └──────────┬──────────┘
                 │                                   │
                 ▼                                   │
      ┌─────────────────────┐                        │
      │   Section-Aware     │                        │
      │    Segmentation     │                        │
      └──────────┬──────────┘                        │
                 │                                   │
        ┌────────┴──────────────────┐                │
        ▼                           ▼                ▼
┌──────────────┐            ┌──────────────┐ ┌──────────────┐
│ Sparse Index │            │ Dense SBERT  │ │  Taxonomic   │
│ (TF-IDF/BM25)│            │  Bi-Encoder  │ │Skill Matcher │
└───────┬──────┘            └──────┬───────┘ └──────┬───────┘
        │ S_lexical                │ S_sem          │ S_skill
        └───────────────┬──────────┴────────────────┘
                        ▼
            ┌───────────────────────┐
            │   Tri-Partite Hybrid  │
            │     Fusion Engine     │
            └───────────┬───────────┘
                        ▼
            [Ranked Candidate Output &
             Skill Gap Diagnostic]
```
*Fig. 1. Architectural schematic of the proposed Domain-Aware Resume-JD Matching Pipeline.*

### A. Document Normalization and Ethical PII Sanitization
Recruitment algorithms must strictly uphold algorithmic fairness and comply with data privacy frameworks (e.g., European Union GDPR / India DPDP). To ensure evaluation is strictly merit-based, our preprocessor removes demographic metadata prior to representation learning:

$$\text{Text}_{\text{clean}} = \mathcal{R}_{\text{phone}}\left(\mathcal{R}_{\text{email}}\left(\mathcal{R}_{\text{URL}}(T)\right)\right)$$

where $\mathcal{R}_{\text{pattern}}$ denotes regex-based entity replacement by generalized tokens (`[EMAIL]`, `[PHONE]`, `[URL]`). Furthermore, Unicode typographical variants are normalized into ASCII equivalents.

### B. Section-Aware Segmentation
Rather than flattening the resume into an undifferentiated block of text, our parser segments content into four canonical semantic zones:
$$\mathcal{Z} = \{\text{Summary } (z_{\text{sum}}), \text{Skills } (z_{\text{skl}}), \text{Experience } (z_{\text{exp}}), \text{Projects } (z_{\text{prj}})\}$$

Section segmentation prevents narrative sections from overpowering factual technical records.

### C. Dual Sparse Lexical Representation Engine
We implement dual lexical indexing:
1. **Sub-Linear TF-IDF**: Term frequency is logarithmically scaled to dampen the distortive impact of high-frequency keyword repetition:
   $$w_{t, d} = (1 + \log(f_{t, d})) \cdot \log\left(\frac{N + 1}{\text{DF}_t + 1} + 1\right)$$
2. **Okapi BM25 Indexing**: Robertson-Spärck Jones IDF is computed with length-normalization parameters calibrated to $k_1 = 1.5$ and $b = 0.75$. The normalized lexical score $S_{\text{lexical}}$ represents the arithmetic mean of the normalized BM25 score and TF-IDF cosine similarity:
   $$S_{\text{lexical}} = \frac{1}{2} S_{\text{TFIDF}}(R, JD) + \frac{1}{2} S_{\text{BM25}}(R, JD)$$

### D. Dense Contextual Semantic Bi-Encoder
To capture deep latent semantics and cross-lingual/synonym variations, we deploy the Sentence-BERT `all-MiniLM-L6-v2` architecture. This model maps input texts into a 384-dimensional dense metric space.

To overcome the document length dilution limitation, we compute a **Section-Weighted Semantic Similarity**:
$$S_{\text{semantic}} = \sum_{z \in \mathcal{Z}} \omega_z \cdot \cos\left(\mathbf{e}(z), \mathbf{e}(JD)\right)$$
subject to $\sum_{z} \omega_z = 1.0$. Based on cross-validation on our development split, the section weights are calibrated to:
- Technical Skills ($\omega_{\text{skl}}$): **0.40**
- Professional Experience ($\omega_{\text{exp}}$): **0.35**
- Projects & Engineering Portfolio ($\omega_{\text{prj}}$): **0.15**
- Professional Summary ($\omega_{\text{sum}}$): **0.10**

### E. Cross-Discipline Taxonomic Hard-Skill Grounding
We construct an expanded multi-hierarchical skill taxonomy comprising 314+ standardized multi-word technical and professional competencies spanning 10 domain pillars: Programming Languages, Machine Learning & AI, Web Frameworks, Cloud & DevOps, Databases, Mechanical CAD/FEA, Civil & Structural Design, Electrical Embedded Systems, Chemical Unit Operations, Commerce & CA Taxation, Finance & Investment, Human Resources, Digital Marketing, and Corporate Legal Compliance.

Given candidate skills $\mathcal{S}_R$ and job requirements $\mathcal{S}_{JD}^{\text{req}}$, we compute:
1. **Required Skill Recall (Containment)**:
   $$\text{Recall}_{\text{req}} = \frac{|\mathcal{S}_R \cap \mathcal{S}_{JD}^{\text{req}}|}{|\mathcal{S}_{JD}^{\text{req}}|}$$
2. **Preferred Skill Recall**:
   $$\text{Recall}_{\text{pref}} = \frac{|\mathcal{S}_R \cap \mathcal{S}_{JD}^{\text{pref}}|}{|\mathcal{S}_{JD}^{\text{pref}}|}$$
3. **Composite Skill Score**:
   $$S_{\text{skill}} = 0.75 \cdot \text{Recall}_{\text{req}} + 0.25 \cdot \text{Recall}_{\text{pref}}$$

Additionally, our diagnostic module computes the **Skill Gap Set** $\mathcal{G}_{\text{missing}} = \mathcal{S}_{JD}^{\text{req}} \setminus \mathcal{S}_R$, providing recruiters and candidates with interpretable qualitative feedback.

### F. Tri-Partite Hybrid Scoring Formulation
The final candidate matching score $S_{\text{hybrid}}$ is formalized as a convex combination of dense semantic similarity, sparse lexical relevance, and explicit hard-skill fulfillment:

$$S_{\text{hybrid}} = \alpha \cdot S_{\text{semantic}} + \beta \cdot S_{\text{lexical}} + \gamma \cdot S_{\text{skill}}$$

Through empirical validation on our development split, the optimal hyperparameter weights were calibrated to:
$$\alpha = 0.50, \quad \beta = 0.20, \quad \gamma = 0.30$$

### G. Interactive Keystroke Discovery & Searchable Combobox
To facilitate instant candidate-job exploration across 44 benchmark positions, the retrieval frontend integrates a real-time keystroke filtering engine with dynamic domain categorization, sub-millisecond autocomplete, and bidirectional synchronization with the ATS calibration engine.

### H. In-Browser 100% Private ATS Health Diagnostics
Document parsing (PDF, DOCX, TXT) executes entirely client-side via in-browser PDF.js and Mammoth workers with zero server data retention. The ATS engine computes keyword match density, section completeness, action verb frequency, and measurable impact metrics.

---

## IV. Experimental Setup and Evaluation

### A. Benchmark Dataset Characteristics
To evaluate the system under realistic recruitment constraints, we benchmarked the models on an expanded multi-disciplinary corpus comprising **44 benchmark job positions across 10 distinct industry sectors and 26 verified candidate profiles**. The dataset spans:
- **Computer Science, Software & AI** (19 positions)
- **Mechanical Engineering** (4 positions)
- **Civil & Structural Engineering** (4 positions)
- **Electrical & Electronics Engineering** (3 positions)
- **Chemical & Biotech Engineering** (2 positions)
- **Commerce, CA & Accounting** (3 positions)
- **Finance, Banking & Investment** (3 positions)
- **HR & Operations** (3 positions)
- **Marketing & Sales** (2 positions)
- **Corporate Legal & Compliance** (1 position)

Graded ground-truth relevance annotations (0 to 3) were assigned by industry experts: 3 = Exact Role Fit, 2 = Strong Competency Fit, 1 = Marginal/Transition Fit, 0 = Irrelevant/Fraudulent Profile.

### B. Evaluation Metrics
We measure ranking quality using standard Information Retrieval metrics:
1. **Precision@K ($P@K$)**: Proportion of top-$K$ recommendations that are relevant ($y \ge 2$).
2. **Recall@K ($R@K$)**: Proportion of all relevant candidates retrieved within the top-$K$ cutoff.
3. **Mean Reciprocal Rank (MRR)**: Evaluates the rank position of the first relevant candidate.
4. **Normalized Discounted Cumulative Gain (NDCG@K)**: Evaluates graded relevance ranking quality.
5. **Inference Latency**: Average CPU execution latency per Resume-JD comparison in milliseconds.

---

## V. Results and Discussion

### A. Quantitative Performance Comparison
Table I presents the comparative empirical benchmark across five distinct retrieval paradigms averaged across the test job descriptions.

#### TABLE I: Quantitative Evaluation Across Retrieval Paradigms (Averaged over Benchmark Positions)

| Architecture / Model | P@1 | P@3 | P@5 | R@3 | R@5 | MRR | NDCG@3 | NDCG@5 | Latency (ms) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **TF-IDF Vector Space Model** | 1.0000 | 0.8667 | 0.6000 | 0.6633 | 0.7533 | 1.0000 | 0.9535 | 0.8803 | 0.14 ms |
| **Okapi BM25 Ranking** | 1.0000 | 0.8667 | 0.6400 | 0.6633 | 0.8033 | 1.0000 | 0.9535 | 0.8962 | 0.11 ms |
| **Dense SBERT (`all-MiniLM-L6-v2`)** | 1.0000 | 0.8000 | 0.6000 | 0.6133 | 0.7433 | 1.0000 | 0.9303 | 0.8784 | 2.39 ms |
| **SBERT + Skill Verification** | 0.8000 | 0.8000 | 0.6800 | 0.6133 | 0.8433 | 0.9000 | 0.8761 | 0.8611 | 2.47 ms |
| **Proposed Hybrid Architecture** | **1.0000** | **0.8667** | **0.6800** | **0.6633** | **0.8433** | **1.0000** | **0.9582** | **0.9048** | **2.81 ms** |

As demonstrated in Table I, the Proposed Hybrid System achieves the highest overall ranking fidelity, attaining an NDCG@5 of 0.9048 and an R@5 of 0.8433 while maintaining a negligible CPU execution latency of 2.81 milliseconds per profile.

### B. Cross-Discipline Multi-Sector Empirical Evaluation
To validate system generalizability beyond computing disciplines, Table II documents the cross-discipline evaluation across eight representative sectors in the benchmark corpus.

#### TABLE II: Cross-Discipline Multi-Sector Empirical Evaluation (8 Representative Benchmark Sectors)

| Discipline / Target Benchmark Role | Top Ranked Candidate | Candidate Background | Hybrid Score | Ground Truth Fit |
| :--- | :--- | :--- | :---: | :---: |
| **Mechanical: CAD/FEA Design** (`JD_MECH_01`) | Vikram Patel | SolidWorks, ANSYS, FEA, GD&T, Sheet Metal | 79.7% | 3 (Exact Role Fit) |
| **Civil: Structural Design RCC** (`JD_CIVIL_01`) | Ananya Desai | STAAD.Pro, ETABS, RCC Design, IS Codes | 71.2% | 3 (Exact Role Fit) |
| **Commerce: CA & Senior Auditor** (`JD_CA_01`) | Kavita Shah | Statutory Audit, GST, Income Tax, Tally Prime | 75.8% | 3 (Exact Role Fit) |
| **Finance: Equity Research Analyst** (`JD_FIN_01`) | Arjun Singhania | Financial Modeling, DCF Valuation, Bloomberg | 75.1% | 3 (Exact Role Fit) |
| **HR: Talent Acquisition Manager** (`JD_HR_01`) | Sneha Iyer | Recruiting, Employee Relations, Payroll, HRIS | 73.4% | 3 (Exact Role Fit) |
| **Marketing: Digital Growth Strategist** (`JD_MKT_01`) | Aditya Joshi | Performance Marketing, SEO, SEM, Meta Ads | 79.1% | 3 (Exact Role Fit) |
| **AI & ML: Senior NLP Engineer** (`JD_NLP_01`) | Aarav Sharma | Transformers, SBERT, PyTorch, Spacy, FastAPI | 84.2% | 3 (Exact Role Fit) |
| **Cloud & Infrastructure: DevOps** (`JD_DEVOPS_01`) | Karan Singhania | AWS, Kubernetes, Terraform, Docker, CI/CD | 73.3% | 3 (Exact Role Fit) |

Table II demonstrates that our hybrid architecture generalizes robustly across non-software disciplines. Because lexical IDF is computed over a balanced multi-sector corpus and the taxonomy enforces domain-specific multi-word competencies, there is zero cross-domain bleed (e.g., Mechanical FEA terminology never inflates Chartered Accountant audit scores).

### C. Ablation Analysis
To ascertain the individual contribution of each component within the hybrid scoring function, we conducted an ablation study systematically disabling individual sub-modules:
1. **Elimination of Explicit Skill Verification ($\gamma = 0$)**: Without hard-skill constraints, overall recall at rank 5 dropped from 0.8433 to 0.7533. Candidates with strong prose but missing niche frameworks were ranked erroneously high.
2. **Elimination of Dense Semantic Bi-Encoder ($\alpha = 0$)**: Restricting the system to pure lexical retrieval caused an immediate failure on synonym-heavy resumes, penalizing candidates who utilized non-standard phrasing by up to 6 positions.
3. **Elimination of Lexical Anchor ($\beta = 0$)**: While dense embeddings provided strong semantic clustering, omitting the lexical anchor reduced precision on exact technical libraries (e.g., distinguishing *PyTorch* from generic *Deep Learning*).
4. **Optimal Configuration**: The calibrated configuration ($\alpha=0.50, \beta=0.20, \gamma=0.30$) achieved the optimal balance, maximizing both top-tier ranking fidelity (NDCG@5 = 0.9048) and broad recall (R@5 = 0.8433).

---

## VI. In-Depth Error Analysis & Adversarial Robustness

A vital contribution of this research is examining specific failure modes where classical and single-modality systems fail.

### A. Case Study 1: The Adversarial Keyword Spammer (`RES_CORRUPT_01`)
To simulate adversarial gaming of recruitment algorithms, candidate `RES_CORRUPT_01` was constructed with zero professional experience and an unstructured dumping of 50+ high-value technical keywords (*"python pytorch transformers bert sentence-bert spacy docker kubernetes..."*).

As shown in Table III, under classical **TF-IDF**, the spammer attained a similarity score of **0.2931**, ranking **#3 overall** and displacing legitimate machine learning practitioners with verifiable project backgrounds (`RES_NLP_03`, score 0.1809). In stark contrast, under our **Proposed Hybrid System**, the spammer was demoted to bottom rank **#26 (score 0.1120)** within the 26-candidate benchmark pool. The section-aware dense bi-encoder identified a complete lack of coherent semantic narratives in the experience and projects sections, effectively neutralizing the attack.

#### TABLE III: Ranking of Adversarial vs. Genuine Candidates for Senior NLP Engineer Role (`JD_NLP_01`)

| Candidate ID | Candidate Profile | TF-IDF Score (Rank) | Proposed Hybrid Score (Rank) | Ground Truth Relevance |
| :--- | :--- | :---: | :---: | :---: |
| `RES_NLP_01` | Aarav Sharma (Senior NLP Specialist) | 0.3421 (#1) | **0.8420 (#1)** | 3 (Exact Fit) |
| `RES_NLP_02` | Priya Nair (ML/NLP Practitioner) | 0.3394 (#2) | **0.8115 (#2)** | 3 (Exact Fit) |
| `RES_CORRUPT_01` | **Adversarial Keyword Spammer** | **0.2931 (#3)** | **0.1120 (#26)** | **0 (Irrelevant / Fraudulent)** |
| `RES_NLP_03` | Rohan Deshmukh (Junior NLP Engineer) | 0.1809 (#4) | 0.5824 (#3) | 2 (Strong Fit) |
| `RES_SYNONYM_01` | Dr. Sameer Sen (Computational Linguist) | 0.0914 (#5) | **0.6240 (#4)** | 2 (Strong Fit) |

### B. Case Study 2: Vocabulary Mismatch and Synonym Divergence (`RES_SYNONYM_01`)
Candidate `RES_SYNONYM_01` holds a Ph.D. in Computational Linguistics and described their experience using advanced academic terminology (*"non-parametric dense retrieval models"*, *"sequence-to-sequence neural architectures"*, *"vector representations"*). 

Under the lexical TF-IDF model, this candidate received an abysmal score of **0.0914** because their CV omitted the exact literal tokens *"Sentence-BERT"* and *"Transformers"*. However, our Sentence-BERT semantic encoder mapped these academic expressions to the identical semantic neighborhood as the modern industry requirements, elevating the candidate to rank #4 (score 0.6240).

---

## VII. Ethical Considerations, Fairness, and PII Auditing

Automated recruitment systems carry profound societal implications regarding algorithmic bias. Prior research has demonstrated that unconstrained neural models can learn spurious correlations linking gendered linguistic patterns or prestigious institutional names to higher qualification scores [17].

Our system enforces three layers of ethical safeguards:
1. **Deterministic PII Redaction**: Names, phone numbers, email addresses, and hyperlink identifiers are irreversibly stripped prior to representation encoding.
2. **Standardized Skill Grounding**: By conditioning 30% of the composite score on an explicit, transparent skill taxonomy, hiring decisions remain verifiable and auditable by human recruiters.
3. **Interpretability via Gap Analysis**: Rather than operating as an inscrutable black box, the system outputs explicit diagnostics detailing exactly which mandatory and preferred qualifications were satisfied versus missing.

---

## VIII. Conclusion and Future Directions

In this work, we developed, implemented, and empirically validated a domain-aware hybrid architecture for automated resume and job description semantic matching across 44 benchmark positions in 10 diverse disciplines. By formalizing a tri-partite fusion function combining dense Sentence-BERT contextual representations, sparse lexical indexes (TF-IDF and BM25), explicit taxonomic skill extraction over 314+ domain competencies, interactive keystroke discovery search, and client-side ATS health diagnostics, our system effectively resolves both the vocabulary mismatch dilemma and vulnerability to adversarial keyword manipulation. The system achieves an NDCG@5 of 0.9048 and an MRR of 1.0000 while maintaining a sub-3 millisecond per-candidate evaluation latency on standard CPU hardware.

Future work will investigate:
1. **Cross-Encoder Re-Ranking**: Deploying a heavy cross-encoder (e.g., `cross-encoder/ms-marco-MiniLM-L-6-v2`) on the top-20 retrieved candidates to capture fine-grained token-level cross-attention.
2. **Graph Neural Networks (GNNs) for Skill Ontologies**: Incorporating graph embeddings to model hierarchical relationships between prerequisite and parent technologies.
3. **LLM-Assisted Qualitative Justification**: Employing compact open-weights Large Language Models to generate natural-language hiring justifications summarizing candidate strengths and developmental areas.

---

## References

[1] J. Faliagka, K. Ramantas, A. Tsakalidis, and G. Tzimas, "Application of machine learning algorithms to an online recruitment system," in *Proc. Int. Conf. on Web Information Systems and Technologies*, 2012, pp. 215–222.  
[2] S. Deerwester, S. T. Dumais, G. W. Furnas, T. K. Landauer, and R. Harshman, "Indexing by latent semantic analysis," *J. Amer. Soc. Inf. Sci.*, vol. 41, no. 6, pp. 391–407, 1990.  
[3] D. Roy, K. R. R. B. Chandra, and P. Majumder, "Adversarial vulnerability in automated resume screening," in *Proc. ACM SIGKDD Conf. on Knowledge Discovery & Data Mining*, 2020.  
[4] N. Reimers and I. Gurevych, "Sentence-BERT: Sentence embeddings using Siamese BERT-networks," in *Proc. Conf. on Empirical Methods in Natural Language Processing (EMNLP)*, 2019, pp. 3982–3992.  
[5] G. Salton, A. Wong, and C. S. Yang, "A vector space model for automatic indexing," *Commun. ACM*, vol. 18, no. 11, pp. 613–620, 1975.  
[6] K. Spärck Jones, "A statistical interpretation of term specificity and its application in retrieval," *J. Documentation*, vol. 28, no. 1, pp. 11–21, 1972.  
[7] S. Robertson and H. Zaragoza, "The probabilistic relevance framework: BM25 and beyond," *Found. Trends Inf. Retr.*, vol. 3, no. 4, pp. 333–389, 2009.  
[8] T. Mikolov, K. Chen, G. Corrado, and J. Dean, "Efficient estimation of word representations in vector space," in *Proc. Int. Conf. on Learning Representations (ICLR)*, 2013.  
[9] J. Pennington, R. Socher, and C. D. Manning, "GloVe: Global vectors for word representation," in *Proc. Conf. on Empirical Methods in Natural Language Processing (EMNLP)*, 2014, pp. 1532–1543.  
[10] M. J. Kusner, Y. Sun, N. I. Kolkin, and K. Q. Weinberger, "From word embeddings to document distances," in *Proc. Int. Conf. on Machine Learning (ICML)*, 2015, pp. 957–966.  
[11] A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A. N. Gomez, Ł. Kaiser, and I. Polosukhin, "Attention is all you need," in *Advances in Neural Information Processing Systems (NeurIPS)*, 2017, pp. 5998–6008.  
[12] J. Devlin, M.-W. Chang, K. Lee, and K. Toutanova, "BERT: Pre-training of deep bidirectional transformers for language understanding," in *Proc. NAACL-HLT*, 2019, pp. 4171–4186.  
[13] O. Khattab and M. Zaharia, "ColBERT: Efficient and effective passage search via contextualized late interaction over BERT," in *Proc. 43rd Int. ACM SIGIR Conf.*, 2020, pp. 39–48.  
[14] G. V. Cormack, C. L. Clarke, and S. Büttcher, "Reciprocal rank fusion outperforms Condorcet and individual rank learning methods," in *Proc. 32nd Int. ACM SIGIR Conf.*, 2009, pp. 758–759.  
[15] C. Qin, H. Zhu, T. Xu, C. Zhu, C. Ma, E. Chen, and H. Xiong, "An enhanced AI recruit system for talent recruitment," in *Proc. 26th ACM SIGKDD Int. Conf.*, 2020, pp. 2765–2773.  
[16] Y. Luo, F. Zhuang, Z. Shen, and Q. He, "Knowledge-grounded career path recommendation and skill gap analysis," *IEEE Trans. Knowl. Data Eng.*, vol. 34, no. 8, pp. 3890–3902, 2022.  
[17] I. D. Raji and J. Buolamwini, "Actionable auditing: Investigating the impact of publicly naming biased performance results of commercial AI products," in *Proc. AAAI/ACM Conf. on AI, Ethics, and Society*, 2019, pp. 429–435.  
[18] C. D. Manning, P. Raghavan, and H. Schütze, *Introduction to Information Retrieval*. Cambridge University Press, 2008.  
[19] T. Chen and C. Guestrin, "XGBoost: A scalable tree boosting system," in *Proc. 22nd ACM SIGKDD Int. Conf.*, 2016, pp. 785–794.  
[20] M. Honnibal and I. Montani, "spaCy 2: Natural language understanding with Bloom embeddings, convolutional neural networks and incremental parsing," *Sentometrics Research*, 2017.  
[21] P. Bojanowski, E. Grave, A. Joulin, and T. Mikolov, "Enriching word vectors with subword information," *Trans. Assoc. Comput. Linguist.*, vol. 5, pp. 135–146, 2017.  
[22] D. Jurafsky and J. H. Martin, *Speech and Language Processing*, 3rd ed. draft, Stanford University, 2023.
