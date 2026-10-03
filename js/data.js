/**
 * Bundled Dataset Context for Standalone & Vercel Web Deployment
 * Expanded to cover Engineering (Computer, Mechanical, Civil, Electrical, Chemical),
 * Commerce & Chartered Accountancy, Finance & Banking, HR & Operations, Marketing, and Legal.
 * Author: Patel Aum Shirishkumar (12302040601004)
 */

const RAW_RESUMES = [
  {
    "id": "RES_NLP_01",
    "name": "Aarav Sharma",
    "target_domain": "Machine Learning",
    "years_experience": 5,
    "education": "M.S. in Computer Science (Artificial Intelligence), Stanford University, 2021",
    "summary": "Senior NLP Engineer with 5 years of industry experience architecting deep learning language models, transformers, and dense retrieval systems. Proven track record deploying Sentence-BERT embeddings into production vector databases.",
    "skills": [
      "python",
      "pytorch",
      "transformers",
      "bert",
      "sentence-bert",
      "spacy",
      "huggingface",
      "fastapi",
      "docker",
      "natural language processing",
      "scikit-learn",
      "git"
    ],
    "experience": [
      "Staff ML Engineer at Synapse AI (2022 - Present): Designed and deployed multi-lingual semantic search processing 12M daily queries using fine-tuned all-MiniLM-L6-v2 embeddings and FAISS index. Reduced query latency by 42%.",
      "NLP Research Engineer at Cognitive Labs (2020 - 2022): Fine-tuned RoBERTa and DeBERTa architectures for domain-specific named entity recognition (NER) in biomedical texts, achieving 94.2% F1 score."
    ],
    "projects": [
      "Dense Neural Ranker: End-to-end bi-encoder for semantic query-document matching built with PyTorch and HuggingFace, served via FastAPI and Dockerized microservices."
    ]
  },
  {
    "id": "RES_NLP_02",
    "name": "Priya Nair",
    "target_domain": "Machine Learning",
    "years_experience": 4,
    "education": "B.Tech in Computer Engineering, National Institute of Technology, 2020",
    "summary": "Machine Learning Engineer specializing in Natural Language Processing, text representation, transformer fine-tuning, and semantic similarity engines. Experienced in PyTorch, Scikit-Learn, and MLOps pipelines.",
    "skills": [
      "python",
      "natural language processing",
      "pytorch",
      "transformers",
      "bert",
      "scikit-learn",
      "docker",
      "rest api",
      "mlops",
      "langchain"
    ],
    "experience": [
      "Machine Learning Engineer at LinguaTech (2021 - Present): Developed contextual document classification and similarity scoring pipelines using HuggingFace Transformers and Scikit-Learn. Containerized models using Docker.",
      "Data Science Associate at Fractal (2020 - 2021): Implemented TF-IDF and Word2Vec baselines for internal knowledge retrieval engine; upgraded infrastructure to dense contextual embeddings."
    ],
    "projects": [
      "RAG Q&A Assistant: LangChain and PyTorch pipeline leveraging BERT embeddings and vector retrieval for customer support automation."
    ]
  },
  {
    "id": "RES_NLP_03",
    "name": "Rohan Deshmukh",
    "target_domain": "Machine Learning",
    "years_experience": 2,
    "education": "B.E. in Information Technology, Mumbai University, 2022",
    "summary": "Junior NLP Practitioner with foundational knowledge of text processing, tokenization, PyTorch, and classical machine learning algorithms.",
    "skills": [
      "python",
      "natural language processing",
      "scikit-learn",
      "spacy",
      "nltk",
      "rest api",
      "git"
    ],
    "experience": [
      "Junior NLP Developer at AI Solutions (2022 - Present): Maintained text cleaning pipelines with NLTK and SpaCy, trained baseline logistic regression and random forest sentiment classifiers."
    ],
    "projects": [
      "Resume Parser: Extracted candidate contact details and skills using regular expressions and SpaCy entity recognition."
    ]
  },
  {
    "id": "RES_DS_01",
    "name": "Neha Kulkarni",
    "target_domain": "Data Science",
    "years_experience": 5,
    "education": "M.S. in Applied Statistics, Indian Statistical Institute, 2019",
    "summary": "Senior Data Scientist with extensive background in predictive statistical modeling, feature engineering, SQL data pipelines, and tree-based ensemble algorithms.",
    "skills": [
      "python",
      "sql",
      "scikit-learn",
      "xgboost",
      "lightgbm",
      "machine learning",
      "feature engineering",
      "data science",
      "snowflake",
      "bigquery"
    ],
    "experience": [
      "Lead Data Scientist at FinAnalytics (2021 - Present): Architected customer churn and credit risk models using XGBoost and LightGBM over Snowflake data warehouses, handling 50M+ records. Improved AUC-ROC from 0.76 to 0.88.",
      "Data Scientist at Mu Sigma (2019 - 2021): Conducted rigorous A/B hypothesis testing, multivariate regression, and cohort analysis."
    ],
    "projects": [
      "Financial Fraud Detection: Built real-time feature engineering pipeline in SQL and Scikit-Learn with automated drift detection."
    ]
  },
  {
    "id": "RES_DS_02",
    "name": "Vikram Mehta",
    "target_domain": "Data Science",
    "years_experience": 3,
    "education": "B.Tech in Data Science, CVM University, 2021",
    "summary": "Data Scientist passionate about predictive analytics, statistical inference, feature engineering, and exploratory data visualization.",
    "skills": [
      "python",
      "sql",
      "machine learning",
      "scikit-learn",
      "xgboost",
      "data science",
      "feature engineering",
      "r"
    ],
    "experience": [
      "Data Scientist at RetailPulse (2021 - Present): Developed demand forecasting models using Scikit-Learn and XGBoost, writing automated SQL extraction queries for PostgreSQL."
    ],
    "projects": [
      "Customer Lifetime Value Predictor: Applied gradient boosting and survival analysis to predict subscription churn."
    ]
  },
  {
    "id": "RES_WEB_01",
    "name": "Aditya Varma",
    "target_domain": "Web Development",
    "years_experience": 5,
    "education": "B.Tech in Computer Engineering, ADIT, 2020",
    "summary": "Senior Full-Stack Engineer with 5 years of mastery in React, TypeScript, Node.js microservices, and PostgreSQL database optimization.",
    "skills": [
      "javascript",
      "typescript",
      "react",
      "node.js",
      "next.js",
      "express",
      "postgresql",
      "rest api",
      "html5",
      "css3",
      "tailwind css",
      "redis",
      "docker",
      "git"
    ],
    "experience": [
      "Senior Frontend/Fullstack Engineer at CloudApp (2022 - Present): Led migration of monolithic web dashboard to Next.js and React 18 with TypeScript. Reduced bundle size by 35% and increased Lighthouse score to 98.",
      "Full-Stack Developer at TechCraft (2020 - 2022): Developed RESTful endpoints using Node.js, Express, and PostgreSQL, implemented Redis caching layers for high-volume endpoints."
    ],
    "projects": [
      "Enterprise SaaS Dashboard: Multi-tenant React, TypeScript, and Node.js platform with real-time WebSocket state management."
    ]
  },
  {
    "id": "RES_WEB_02",
    "name": "Ananya Joshi",
    "target_domain": "Web Development",
    "years_experience": 3,
    "education": "B.E. in Information Technology, Pune University, 2021",
    "summary": "Full-Stack Web Developer skilled in React component hierarchies, TypeScript type safety, Node.js API development, and relational database schemas.",
    "skills": [
      "javascript",
      "typescript",
      "react",
      "node.js",
      "rest api",
      "postgresql",
      "html5",
      "css3",
      "git",
      "graphql"
    ],
    "experience": [
      "Full-Stack Developer at WebX (2021 - Present): Built consumer-facing e-commerce storefronts using React and TypeScript; developed GraphQL and REST microservices in Node.js."
    ],
    "projects": [
      "CollabBoard: Interactive real-time whiteboard utilizing React, Node.js, and PostgreSQL."
    ]
  },
  {
    "id": "RES_WEB_03",
    "name": "Siddharth Rao",
    "target_domain": "Web Development",
    "years_experience": 2,
    "education": "BCA, Gujarat University, 2022",
    "summary": "Junior Frontend Web Developer passionate about clean responsive UI/UX, React, JavaScript, and HTML5/CSS3.",
    "skills": [
      "javascript",
      "react",
      "html5",
      "css3",
      "tailwind css",
      "git",
      "rest api"
    ],
    "experience": [
      "Junior Web Developer at PixelMinds (2022 - Present): Converted Figma designs into modular React components with Tailwind CSS."
    ],
    "projects": [
      "Portfolio & Blog Engine: Static site generator built with React and Tailwind CSS."
    ]
  },
  {
    "id": "RES_DEVOPS_01",
    "name": "Karan Singhania",
    "target_domain": "Cloud & DevOps",
    "years_experience": 6,
    "education": "B.Tech in Computer Science, IIT Roorkee, 2018",
    "summary": "Lead Cloud Infrastructure & DevOps Architect. Expert in AWS multi-account governance, Kubernetes cluster lifecycle, Terraform automation, and observability with Prometheus.",
    "skills": [
      "aws",
      "kubernetes",
      "docker",
      "terraform",
      "ci/cd",
      "linux",
      "bash",
      "prometheus",
      "grafana",
      "helm",
      "ansible",
      "python",
      "git"
    ],
    "experience": [
      "Principal DevOps Engineer at HyperScale (2021 - Present): Designed multi-region Kubernetes (EKS) infrastructure provisioned via Terraform modules. Orchestrated zero-downtime Canary deployments with ArgoCD and Helm.",
      "Site Reliability Engineer at MediaNet (2018 - 2021): Configured Linux server hardening, automated CI/CD pipelines via GitLab CI, and instituted SLI/SLO dashboards in Prometheus and Grafana."
    ],
    "projects": [
      "GitOps Cloud Platform: Declarative Infrastructure-as-Code ecosystem managing 400+ AWS microservices via Terraform and Kubernetes."
    ]
  },
  {
    "id": "RES_DEVOPS_02",
    "name": "Divya Patel",
    "target_domain": "Cloud & DevOps",
    "years_experience": 4,
    "education": "B.Tech in Information Technology, CVM University, 2020",
    "summary": "DevOps Engineer with deep expertise in Docker containerization, Kubernetes operations, AWS cloud services, and CI/CD automation.",
    "skills": [
      "aws",
      "kubernetes",
      "docker",
      "terraform",
      "ci/cd",
      "linux",
      "bash",
      "prometheus",
      "grafana",
      "jenkins"
    ],
    "experience": [
      "DevOps Engineer at CoreInfra (2020 - Present): Maintained Jenkins and GitHub Actions pipelines for automated builds and testing. Automated AWS EC2 and RDS provisioning using Terraform."
    ],
    "projects": [
      "K8s Auto-Scaler: Custom horizontal pod autoscaler integrated with Prometheus metrics."
    ]
  },
  {
    "id": "RES_DEVOPS_03",
    "name": "Harshil Bhatt",
    "target_domain": "Cloud & DevOps",
    "years_experience": 2,
    "education": "B.Tech in Computer Engineering, ADIT, 2022",
    "summary": "Associate Cloud Engineer working with Docker containers, Linux system administration, and basic AWS cloud services.",
    "skills": [
      "docker",
      "linux",
      "bash",
      "aws",
      "git",
      "ci/cd"
    ],
    "experience": [
      "Cloud Operations Associate at CloudEase (2022 - Present): Wrote Dockerfiles, created bash automation scripts, and monitored server health."
    ],
    "projects": [
      "Containerized LAMP Stack: Multi-container Docker Compose setup for web deployment."
    ]
  },
  {
    "id": "RES_SEC_01",
    "name": "Farhan Akhtar",
    "target_domain": "Cybersecurity",
    "years_experience": 5,
    "education": "B.Tech in Cyber Security, GTU, 2019",
    "summary": "Information Security Analyst and Penetration Tester with OSCP and CEH certifications. Experienced in SIEM telemetry, OWASP Top 10 web vulnerabilities, and incident response.",
    "skills": [
      "vulnerability assessment",
      "penetration testing",
      "owasp",
      "siem",
      "network security",
      "incident response",
      "wireshark",
      "burp suite",
      "metasploit",
      "python",
      "linux"
    ],
    "experience": [
      "Senior SOC Analyst at DefendZero (2021 - Present): Monitored 24/7 SIEM feeds, conducted forensic triage on security incidents, and executed Red Team penetration tests against critical web APIs using Burp Suite.",
      "Security Analyst at CyberShield (2019 - 2021): Performed static and dynamic vulnerability assessments, network packet inspection with Wireshark, and enforced IAM policies."
    ],
    "projects": [
      "Automated Threat Intelligence Scraper: Python tool aggregating CVE indicators of compromise into local SIEM."
    ]
  },
  {
    "id": "RES_SEC_02",
    "name": "Zoya Merchant",
    "target_domain": "Cybersecurity",
    "years_experience": 3,
    "education": "B.E. in Information Technology, Mumbai University, 2021",
    "summary": "Cybersecurity Analyst specializing in vulnerability management, OWASP testing, network intrusion detection, and incident response.",
    "skills": [
      "vulnerability assessment",
      "penetration testing",
      "owasp",
      "siem",
      "network security",
      "incident response",
      "wireshark",
      "linux",
      "burp suite"
    ],
    "experience": [
      "Security Consultant at SecureByte (2021 - Present): Evaluated client web portals for OWASP vulnerabilities, analyzed network packet captures using Wireshark, and generated audit remediation reports."
    ],
    "projects": [
      "Vulnerability Audit Framework: Python and Bash scripts automating Nessus and Nmap scans."
    ]
  },
  {
    "id": "RES_BACKEND_01",
    "name": "Rahul Verma",
    "target_domain": "Backend Systems",
    "years_experience": 4,
    "education": "B.Tech in Computer Engineering, ADIT, 2020",
    "summary": "Backend Systems Engineer specialized in high-performance distributed microservices, Java Spring Boot, REST APIs, PostgreSQL, and Docker.",
    "skills": [
      "java",
      "spring boot",
      "rest api",
      "postgresql",
      "docker",
      "microservices",
      "redis",
      "distributed systems",
      "git",
      "unit testing"
    ],
    "experience": [
      "Backend Engineer at PayGate (2020 - Present): Developed transaction processing microservices in Java Spring Boot handling 1,500 req/sec. Optimized PostgreSQL queries and implemented Redis caching."
    ],
    "projects": [
      "Distributed Rate Limiter: Token bucket rate limiter built with Java, Redis, and Spring Boot."
    ]
  },
  {
    "id": "RES_MOBILE_01",
    "name": "Manish Gupta",
    "target_domain": "Mobile Development",
    "years_experience": 3,
    "education": "B.E. in Computer Engineering, Pune University, 2021",
    "summary": "Mobile Application Developer specializing in native Android Kotlin and cross-platform Flutter applications.",
    "skills": [
      "kotlin",
      "java",
      "android",
      "rest api",
      "git",
      "sqlite",
      "object oriented programming"
    ],
    "experience": [
      "Mobile App Developer at AppWave (2021 - Present): Published 4 Android applications on Google Play Store with 100K+ downloads using Kotlin and MVVM architecture."
    ],
    "projects": [
      "FinTrack Android App: Personal expense tracker with SQLite offline sync and biometric authentication."
    ]
  },
  {
    "id": "RES_SYNONYM_01",
    "name": "Dr. Sameer Sen",
    "target_domain": "Machine Learning",
    "years_experience": 6,
    "education": "Ph.D. in Computational Linguistics, University of Edinburgh, 2018",
    "summary": "Staff Computational Linguist with deep theoretical and empirical expertise in statistical language modeling, sequence-to-sequence neural architectures, dense semantic vector spaces, and contextual lexical representations. Proficient in numerical Python scripting, neural network backpropagation engines, and microservice virtualization.",
    "skills": [
      "python",
      "computational linguistics",
      "deep learning",
      "neural networks",
      "sequence modeling",
      "vector representations",
      "statistical modeling",
      "container virtualization"
    ],
    "experience": [
      "Lead Research Scientist at Lexicon Dynamics (2019 - Present): Developed non-parametric dense retrieval models utilizing transformer self-attention mechanisms for cross-lingual information extraction. Implemented microservice interfaces for distributed query routing."
    ],
    "projects": [
      "Contextual Vector Retrieval: Algorithmic system mapping unstructured corpus into dense latent semantic spaces with sub-millisecond retrieval."
    ]
  },
  {
    "id": "RES_MECH_01",
    "name": "Vikram Patel",
    "target_domain": "Mechanical Engineering",
    "years_experience": 5,
    "education": "B.Tech in Mechanical Engineering, ADIT, 2020",
    "summary": "Senior Mechanical Design Engineer with 5 years experience in 3D CAD modeling, FEA structural and thermal simulations, GD&T tolerancing, and sheet metal fabrication using SolidWorks and ANSYS.",
    "skills": [
      "solidworks",
      "catia",
      "autocad",
      "fea",
      "finite element analysis",
      "ansys",
      "gd&t",
      "sheet metal",
      "thermal analysis",
      "cad",
      "cam",
      "manufacturing"
    ],
    "experience": [
      "Lead CAD/FEA Engineer at Precision Dynamics (2022 - Present): Designed automotive powertrain enclosures and structural brackets in SolidWorks. Conducted non-linear FEA stress analysis in ANSYS, reducing material mass by 18%.",
      "Mechanical Design Engineer at Apex Heavy Machineries (2020 - 2022): Prepared manufacturing 2D fabrication drawings adhering to ASME Y14.5 GD&T standards and collaborated with CNC tooling teams."
    ],
    "projects": [
      "Electric Vehicle Battery Enclosure Design: Thermal and structural FEA simulation of IP67 aluminum battery pack under impact and vibration conditions."
    ]
  },
  {
    "id": "RES_CIVIL_01",
    "name": "Ananya Desai",
    "target_domain": "Civil Engineering",
    "years_experience": 4,
    "education": "B.E. in Civil Engineering, BVM Engineering College, 2020",
    "summary": "Structural Design Engineer specializing in reinforced cement concrete (RCC) and structural steel analysis using STAAD.Pro, ETABS, and AutoCAD. Experienced in Indian Standard (IS) structural design codes.",
    "skills": [
      "staad.pro",
      "etabs",
      "autocad",
      "rcc design",
      "structural analysis",
      "steel structures",
      "concrete technology",
      "quantity surveying",
      "site supervision",
      "is codes"
    ],
    "experience": [
      "Structural Design Engineer at Shilp Consultants (2021 - Present): Modeled and analyzed G+14 high-rise commercial structures using ETABS and STAAD.Pro for seismic and wind load compliance as per IS 1893 and IS 456.",
      "Site & Junior Structural Engineer at L&T Construction (2020 - 2021): Managed concrete batching plant inspections, bar bending schedule verification, and foundation rebar detailing."
    ],
    "projects": [
      "Seismic Retrofitting of Multi-Story Commercial Complex: ETABS non-linear pushover analysis and shear wall reinforcement design."
    ]
  },
  {
    "id": "RES_EEE_01",
    "name": "Ramesh Trivedi",
    "target_domain": "Electrical & Electronics",
    "years_experience": 4,
    "education": "B.Tech in Electrical Engineering, GCET, 2020",
    "summary": "Electrical Power & Industrial Automation Engineer with extensive hands-on experience in PLC ladder programming (Siemens/Allen-Bradley), SCADA systems, substation electrical design, and ETAP power flow analysis.",
    "skills": [
      "plc",
      "scada",
      "power systems",
      "etap",
      "switchgear",
      "substation design",
      "industrial automation",
      "autocad electrical",
      "matlab",
      "instrumentation"
    ],
    "experience": [
      "Industrial Automation Engineer at Siemens Energy (2021 - Present): Programmed S7-1500 PLCs and WinCC SCADA systems for automated pharmaceutical manufacturing lines. Conducted fault analysis and VFD motor tuning.",
      "Electrical Systems Engineer at Torrent Power (2020 - 2021): Executed short-circuit and relay coordination studies using ETAP for 66kV substation feeders."
    ],
    "projects": [
      "Smart Substation Telemetry System: IoT-enabled SCADA remote telemetry unit with Modbus protocol interfacing 11kV circuit breakers."
    ]
  },
  {
    "id": "RES_CA_01",
    "name": "Kavita Shah",
    "target_domain": "Commerce, CA & Accounting",
    "years_experience": 5,
    "education": "Chartered Accountant (ICAI) & B.Com, Gujarat University, 2019",
    "summary": "Fellow Chartered Accountant (CA) with 5 years of post-qualification experience in statutory auditing, corporate tax planning, GST return filing, IFRS compliance, and balance sheet finalization in Tally Prime.",
    "skills": [
      "statutory audit",
      "tax planning",
      "gst",
      "income tax",
      "ifrs",
      "tally prime",
      "tally",
      "balance sheet",
      "auditing",
      "taxation",
      "accounting",
      "excel"
    ],
    "experience": [
      "Senior Audit Manager at Deloitte India (2021 - Present): Directed statutory audits and internal controls over financial reporting (ICFR) for listed manufacturing clients. Reviewed transfer pricing documents and deferred tax computations.",
      "Audit Executive at K.S. & Associates CA Firm (2019 - 2021): Handled GST annual reconciliations (GSTR-9C), corporate income tax return filings, and client bank audits."
    ],
    "projects": [
      "Corporate Tax Optimization & GST Transition: Restructured input tax credit (ITC) reconciliation pipeline for multi-state FMCG enterprise saving ₹42 Lakhs in disallowed credits."
    ]
  },
  {
    "id": "RES_FIN_01",
    "name": "Arjun Singhania",
    "target_domain": "Finance & Banking",
    "years_experience": 4,
    "education": "MBA in Finance, IIM Ahmedabad, 2021; CFA Level 2",
    "summary": "Financial Analyst and Equity Research Associate specialized in DCF financial valuation modeling, M&A due diligence, financial statement analysis, and Bloomberg Terminal portfolio analytics.",
    "skills": [
      "financial modeling",
      "dcf valuation",
      "equity research",
      "financial analysis",
      "bloomberg terminal",
      "excel vba",
      "m&a",
      "valuation",
      "portfolio management",
      "statistics"
    ],
    "experience": [
      "Equity Research Associate at Kotak Institutional Equities (2021 - Present): Initiated equity coverage on Indian auto and renewables sector. Built 3-statement forecast models, DCF valuations, and author quarterly investor earnings notes.",
      "Financial Analyst at Crisil (2020 - 2021): Evaluated corporate creditworthiness and debt service coverage ratios (DSCR) for term loan syndications."
    ],
    "projects": [
      "Cross-Border M&A Synergies Valuation Model: Comprehensive LBO and DCF financial model evaluating $250M manufacturing acquisition."
    ]
  },
  {
    "id": "RES_HR_01",
    "name": "Sneha Iyer",
    "target_domain": "HR & Operations",
    "years_experience": 6,
    "education": "MBA in Human Resource Management, Symbiosis, 2019",
    "summary": "Senior HR Manager and Talent Acquisition Lead with 6 years experience driving full-cycle tech & non-tech recruiting, employee engagement, HR policy development, compensation & benefits, and payroll management.",
    "skills": [
      "talent acquisition",
      "human resources",
      "employee relations",
      "payroll",
      "hr policies",
      "recruiting",
      "performance management",
      "onboarding",
      "hris",
      "workday"
    ],
    "experience": [
      "Lead Talent Acquisition & HR Business Partner at InfoSys (2021 - Present): Scaled engineering organization from 200 to 550 personnel. Reduced time-to-hire by 35% through structured competency-based interviewing and HR automation.",
      "HR Executive at Tata Technologies (2019 - 2021): Managed monthly payroll processing, employee grievance redressal, performance appraisals, and statutory compliance (PF, ESI, Gratuity)."
    ],
    "projects": [
      "Employee Retention & Culture Transformation: Designed and executed 360-degree feedback framework reducing annualized attrition from 22% to 11%."
    ]
  },
  {
    "id": "RES_MKT_01",
    "name": "Aditya Joshi",
    "target_domain": "Marketing & Sales",
    "years_experience": 4,
    "education": "B.B.A. in Marketing & Communications, NMIMS, 2020",
    "summary": "Digital Marketing & Growth Strategist specialized in performance marketing (Google Ads, Meta Ads), search engine optimization (SEO), data-driven content strategy, and conversion rate optimization (CRO).",
    "skills": [
      "digital marketing",
      "seo",
      "sem",
      "google analytics",
      "meta ads",
      "performance marketing",
      "content strategy",
      "growth hacking",
      "conversion rate optimization",
      "email marketing"
    ],
    "experience": [
      "Growth Marketing Lead at ZeptoMart (2022 - Present): Managed $150K monthly paid acquisition budget across Meta and Google Ads, improving blended customer acquisition cost (CAC) by 28% and driving 4.2x ROAS.",
      "SEO & Content Marketing Specialist at MediaCraft (2020 - 2022): Scaled organic inbound traffic from 40K to 300K monthly sessions via technical SEO audits and keyword cluster strategies."
    ],
    "projects": [
      "Omnichannel Lead Nurturing Funnel: Automated HubSpot email drip sequences resulting in a 34% increase in sales qualified leads (SQLs)."
    ]
  },
  {
    "id": "RES_SCM_01",
    "name": "Devendra Rao",
    "target_domain": "HR & Operations",
    "years_experience": 5,
    "education": "B.E. in Production Engineering, VJTI Mumbai, 2019",
    "summary": "Supply Chain & Logistics Operations Specialist with deep expertise in SAP ERP Material Management (MM), vendor procurement, inventory optimization, and warehouse logistics.",
    "skills": [
      "supply chain",
      "logistics",
      "sap erp",
      "inventory management",
      "procurement",
      "warehouse operations",
      "vendor management",
      "six sigma",
      "operations management"
    ],
    "experience": [
      "Supply Chain Lead at Mahindra Logistics (2021 - Present): Optimized pan-India distribution routes and safety stock thresholds in SAP ERP, reducing holding costs by 14% while sustaining 99.2% on-time fulfillment.",
      "Procurement Executive at Bharat Forge (2019 - 2021): Negotiated raw material vendor purchase contracts, audited supplier quality, and implemented Kanban replenishment."
    ],
    "projects": [
      "Warehouse Inventory Tracking Automation: Implemented barcode-driven RFID inventory cycle counting system cutting discrepancy rates to under 0.1%."
    ]
  },
  {
    "id": "RES_LEGAL_01",
    "name": "Meera Nambiar",
    "target_domain": "Legal & Compliance",
    "years_experience": 5,
    "education": "B.A. LL.B. (Hons.), National Law School of India University (NLSIU), 2019",
    "summary": "Corporate Legal Counsel specializing in commercial contract drafting, cross-border M&A due diligence, intellectual property rights, data privacy (GDPR/DPDP), and regulatory compliance.",
    "skills": [
      "contract drafting",
      "corporate law",
      "compliance",
      "due diligence",
      "intellectual property",
      "regulatory compliance",
      "dispute resolution",
      "legal research",
      "commercial litigation"
    ],
    "experience": [
      "In-House Legal Counsel at Reliance Retail (2021 - Present): Drafted and negotiated vendor Master Services Agreements (MSAs), SaaS software licenses, non-disclosure agreements, and lease deeds valued over ₹250 Cr.",
      "Associate Advocate at Khaitan & Co (2019 - 2021): Conducted legal due diligence for venture capital financing rounds and represented clients before National Company Law Tribunal (NCLT)."
    ],
    "projects": [
      "Enterprise DPDP Act Privacy Framework: Built internal data protection compliance guidelines and vendor assessment questionnaires."
    ]
  },
  {
    "id": "RES_CORRUPT_01",
    "name": "Adversarial Keyword Spammer",
    "target_domain": "Adversarial / Manipulated",
    "years_experience": 0,
    "education": "High School Diploma, 2023",
    "summary": "python pytorch natural language processing transformers bert sentence-bert spacy huggingface fastapi docker scikit-learn rest api kubernetes mlops langchain react javascript typescript aws terraform ci/cd vulnerability assessment penetration testing owasp siem sql feature engineering xgboost. Best developer ever!",
    "skills": [
      "python",
      "pytorch",
      "transformers",
      "bert",
      "sentence-bert",
      "spacy",
      "huggingface",
      "fastapi",
      "docker",
      "scikit-learn",
      "kubernetes",
      "aws",
      "react",
      "javascript",
      "sql"
    ],
    "experience": [
      "Self Employed: Wrote python pytorch transformers bert sentence-bert spacy huggingface fastapi docker scikit-learn kubernetes code every day in my room."
    ],
    "projects": [
      "Ultimate Keyword Project: Contains python pytorch bert transformers docker kubernetes aws react node.js."
    ]
  }
];

const RAW_JDS = [
  {
    "id": "JD_NLP_01",
    "title": "Senior NLP & Machine Learning Engineer",
    "domain": "AI & Machine Learning",
    "min_experience_years": 4,
    "required_skills": [
      "python",
      "pytorch",
      "natural language processing",
      "transformers",
      "bert",
      "scikit-learn",
      "rest api",
      "docker"
    ],
    "preferred_skills": [
      "sentence-bert",
      "spacy",
      "huggingface",
      "fastapi",
      "kubernetes",
      "mlops",
      "langchain"
    ],
    "description": "We are seeking a Senior NLP & Machine Learning Engineer to spearhead our semantic search and language intelligence infrastructure. The ideal candidate will design, fine-tune, and deploy transformer-based representation models (BERT, RoBERTa, Sentence-Transformers) for large-scale document ranking, semantic similarity, and entity extraction. Responsibilities include building robust NLP pipelines with PyTorch and HuggingFace, operationalizing microservices via FastAPI and Docker, and maintaining high-throughput inference systems in production. Candidates must demonstrate deep expertise in vector embeddings, cosine ranking, evaluation metrics (NDCG, MRR), and ML lifecycle monitoring.",
    "ground_truth_relevance": {
      "RES_NLP_01": 3,
      "RES_NLP_02": 3,
      "RES_NLP_03": 2,
      "RES_SYNONYM_01": 2,
      "RES_DS_01": 2,
      "RES_DS_02": 1,
      "RES_BACKEND_01": 1,
      "RES_DEVOPS_01": 1,
      "RES_WEB_01": 0,
      "RES_WEB_02": 0,
      "RES_SEC_01": 0,
      "RES_MOBILE_01": 0,
      "RES_CORRUPT_01": 0
    }
  },
  {
    "id": "JD_GENAI_01",
    "title": "Generative AI & LLM Systems Engineer",
    "domain": "AI & Machine Learning",
    "min_experience_years": 3,
    "required_skills": [
      "python",
      "large language models",
      "rag",
      "langchain",
      "transformers",
      "pytorch",
      "vector databases",
      "fastapi"
    ],
    "preferred_skills": [
      "fine-tuning",
      "prompt engineering",
      "sentence-bert",
      "huggingface",
      "docker",
      "mlops"
    ],
    "description": "Lead the development of generative AI pipelines, Retrieval-Augmented Generation (RAG) architectures, and enterprise LLM integrations. You will architect multi-modal vector search systems, optimize context window utilization, implement agentic workflows with LangChain and LlamaIndex, and establish automated evaluation benchmarks for hallucination suppression and factual coherence.",
    "ground_truth_relevance": {
      "RES_NLP_01": 3,
      "RES_NLP_02": 3,
      "RES_SYNONYM_01": 3,
      "RES_NLP_03": 2,
      "RES_DS_01": 1,
      "RES_BACKEND_01": 1
    }
  },
  {
    "id": "JD_CV_01",
    "title": "Computer Vision & Deep Learning Specialist",
    "domain": "AI & Machine Learning",
    "min_experience_years": 4,
    "required_skills": [
      "python",
      "computer vision",
      "deep learning",
      "pytorch",
      "opencv",
      "tensorflow",
      "neural networks",
      "scikit-learn"
    ],
    "preferred_skills": [
      "yolo",
      "segmentation",
      "object detection",
      "docker",
      "cuda",
      "onnx",
      "git"
    ],
    "description": "Design and deploy real-time vision algorithms for object detection, segmentation, and visual quality inspection. You will train deep convolutional and vision-transformer models using PyTorch and OpenCV, optimize model weights for edge inference with ONNX and TensorRT, and integrate vision pipelines with high-throughput streaming systems.",
    "ground_truth_relevance": {
      "RES_NLP_01": 2,
      "RES_NLP_02": 2,
      "RES_DS_01": 2,
      "RES_DS_02": 1
    }
  },
  {
    "id": "JD_MLOPS_01",
    "title": "MLOps & Production AI Platform Engineer",
    "domain": "AI & Machine Learning",
    "min_experience_years": 3,
    "required_skills": [
      "python",
      "mlops",
      "docker",
      "kubernetes",
      "ci/cd",
      "machine learning",
      "aws",
      "prometheus"
    ],
    "preferred_skills": [
      "kubeflow",
      "mlflow",
      "terraform",
      "fastapi",
      "grafana",
      "git",
      "linux"
    ],
    "description": "Bridge the gap between data science experimentation and rock-solid production reliability. You will automate end-to-end model retraining pipelines, manage Kubernetes model serving clusters, enforce continuous model evaluation against data drift, and establish zero-downtime canary deployment strategies for AI microservices.",
    "ground_truth_relevance": {
      "RES_DEVOPS_01": 3,
      "RES_NLP_01": 2,
      "RES_NLP_02": 2,
      "RES_DEVOPS_02": 2,
      "RES_BACKEND_01": 1
    }
  },
  {
    "id": "JD_DS_01",
    "title": "Senior Data Scientist (Predictive Analytics)",
    "domain": "Data & Analytics",
    "min_experience_years": 4,
    "required_skills": [
      "python",
      "sql",
      "scikit-learn",
      "xgboost",
      "machine learning",
      "feature engineering",
      "data science"
    ],
    "preferred_skills": [
      "lightgbm",
      "snowflake",
      "bigquery",
      "pandas",
      "tableau",
      "statistics",
      "a/b testing"
    ],
    "description": "Formulate quantitative hypotheses, engineer predictive features from high-volume relational warehouses, and train production gradient boosting models (XGBoost, LightGBM) to forecast consumer behavior and mitigate enterprise operational risks. Strong mathematical rigor in cross-validation and statistical significance testing is essential.",
    "ground_truth_relevance": {
      "RES_DS_01": 3,
      "RES_DS_02": 3,
      "RES_NLP_01": 2,
      "RES_NLP_02": 2,
      "RES_BACKEND_01": 1
    }
  },
  {
    "id": "JD_DE_01",
    "title": "Big Data & Distributed Pipeline Engineer",
    "domain": "Data & Analytics",
    "min_experience_years": 3,
    "required_skills": [
      "python",
      "sql",
      "apache spark",
      "spark",
      "apache kafka",
      "kafka",
      "airflow",
      "postgresql"
    ],
    "preferred_skills": [
      "hadoop",
      "snowflake",
      "docker",
      "aws",
      "distributed systems",
      "scala"
    ],
    "description": "Architect fault-tolerant streaming and batch ETL pipelines processing terabytes of unstructured event data. You will build Spark streaming jobs, orchestrate workflow dependencies with Apache Airflow, maintain Kafka message brokers, and optimize warehouse query execution across Snowflake and PostgreSQL.",
    "ground_truth_relevance": {
      "RES_DS_01": 2,
      "RES_BACKEND_01": 2,
      "RES_DEVOPS_01": 1,
      "RES_DS_02": 1
    }
  },
  {
    "id": "JD_BI_01",
    "title": "Business Intelligence & Quantitative Data Analyst",
    "domain": "Data & Analytics",
    "min_experience_years": 2,
    "required_skills": [
      "sql",
      "tableau",
      "python",
      "data science",
      "statistics",
      "data visualization",
      "pandas"
    ],
    "preferred_skills": [
      "power bi",
      "snowflake",
      "excel",
      "r",
      "predictive analytics",
      "communication"
    ],
    "description": "Translate complex multi-dimensional datasets into intuitive executive decision dashboards. You will author advanced analytical SQL queries, construct automated KPI reporting pipelines in Tableau, perform cohort retention analyses, and present actionable strategic recommendations to business leadership.",
    "ground_truth_relevance": {
      "RES_DS_02": 3,
      "RES_DS_01": 2
    }
  },
  {
    "id": "JD_FS_01",
    "title": "Full-Stack Web Engineer (React & Node.js)",
    "domain": "Software Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "javascript",
      "typescript",
      "react",
      "node.js",
      "rest api",
      "postgresql",
      "html5",
      "css3",
      "git"
    ],
    "preferred_skills": [
      "next.js",
      "graphql",
      "tailwind css",
      "redis",
      "docker",
      "unit testing"
    ],
    "description": "Architect performant, accessible user experiences using React 18, TypeScript, and modern component systems, while developing robust microservice backends using Node.js, Express, and PostgreSQL. Implement Redis caching layers, establish CI/CD test automation, and translate Figma prototypes into polished production web applications.",
    "ground_truth_relevance": {
      "RES_WEB_01": 3,
      "RES_WEB_02": 3,
      "RES_WEB_03": 2,
      "RES_BACKEND_01": 2,
      "RES_MOBILE_01": 1
    }
  },
  {
    "id": "JD_BACKEND_01",
    "title": "Senior Backend Systems Engineer (Java & Spring Boot)",
    "domain": "Software Engineering",
    "min_experience_years": 4,
    "required_skills": [
      "java",
      "spring boot",
      "microservices",
      "rest api",
      "postgresql",
      "docker",
      "redis",
      "distributed systems"
    ],
    "preferred_skills": [
      "kafka",
      "unit testing",
      "system design",
      "multithreading",
      "kubernetes",
      "git"
    ],
    "description": "Lead the architecture of mission-critical transaction processing microservices using Java 21, Spring Boot 3, and distributed PostgreSQL clusters. You will implement resilient message broker event loops, design idempotent RESTful APIs handling thousands of queries per second, and enforce sub-millisecond Redis caching topologies.",
    "ground_truth_relevance": {
      "RES_BACKEND_01": 3,
      "RES_WEB_01": 2,
      "RES_DEVOPS_01": 1
    }
  },
  {
    "id": "JD_FRONTEND_01",
    "title": "Senior Frontend Architect (Next.js & TypeScript)",
    "domain": "Software Engineering",
    "min_experience_years": 4,
    "required_skills": [
      "react",
      "typescript",
      "javascript",
      "next.js",
      "html5",
      "css3",
      "tailwind css",
      "git"
    ],
    "preferred_skills": [
      "vue",
      "performance optimization",
      "ui/ux",
      "graphql",
      "rest api",
      "web accessibility"
    ],
    "description": "Spearhead the frontend architecture for our customer-facing web platforms. You will establish core component design systems, engineer server-rendered pages using Next.js App Router, optimize client-side bundle size and Core Web Vitals to achieve 98+ Lighthouse scores, and enforce rigorous TypeScript typings across the frontend codebase.",
    "ground_truth_relevance": {
      "RES_WEB_01": 3,
      "RES_WEB_02": 3,
      "RES_WEB_03": 2
    }
  },
  {
    "id": "JD_MOBILE_01",
    "title": "Mobile Application Developer (Android Kotlin & Flutter)",
    "domain": "Software Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "kotlin",
      "java",
      "android",
      "flutter",
      "rest api",
      "git",
      "sqlite"
    ],
    "preferred_skills": [
      "mobile development",
      "offline sync",
      "mvvm",
      "ui/ux",
      "play store"
    ],
    "description": "Design and publish high-performance native Android (Kotlin) and cross-platform Flutter applications. You will implement reactive MVVM patterns, integrate background synchronization engines with SQLite, consume RESTful backend APIs, and guarantee 60fps UI rendering across diverse mobile hardware.",
    "ground_truth_relevance": {
      "RES_MOBILE_01": 3,
      "RES_BACKEND_01": 1,
      "RES_WEB_01": 1
    }
  },
  {
    "id": "JD_IOS_01",
    "title": "iOS Application Engineer (Swift & SwiftUI)",
    "domain": "Software Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "swift",
      "swiftui",
      "ios",
      "rest api",
      "git",
      "core data",
      "object oriented programming"
    ],
    "preferred_skills": [
      "combine",
      "xcode",
      "apple design",
      "unit testing",
      "ci/cd"
    ],
    "description": "Build fluid, accessible iOS applications strictly honoring Apple Human Interface Guidelines using Swift and SwiftUI. Implement robust local caching with Core Data, integrate secure biometric authentication with Keychain and LocalAuthentication, and ensure seamless performance across iPhone and iPad viewports.",
    "ground_truth_relevance": {
      "RES_MOBILE_01": 2,
      "RES_WEB_01": 1
    }
  },
  {
    "id": "JD_DEVOPS_01",
    "title": "Cloud Infrastructure & DevOps Engineer",
    "domain": "Cloud & Infrastructure",
    "min_experience_years": 4,
    "required_skills": [
      "aws",
      "kubernetes",
      "docker",
      "terraform",
      "ci/cd",
      "linux",
      "bash",
      "prometheus"
    ],
    "preferred_skills": [
      "helm",
      "ansible",
      "grafana",
      "python",
      "golang",
      "gitlab ci",
      "cloudformation"
    ],
    "description": "Seeking an experienced Cloud DevOps Engineer to lead infrastructure automation, container orchestration, and multi-region reliability on AWS. The candidate will write declarative Infrastructure-as-Code using Terraform, manage production Kubernetes clusters (EKS), architect zero-downtime CI/CD deployment pipelines, and configure comprehensive telemetry dashboards using Prometheus and Grafana. Strong proficiency in Linux systems internals, shell scripting, container security hardening, and VPC networking is mandatory.",
    "ground_truth_relevance": {
      "RES_DEVOPS_01": 3,
      "RES_DEVOPS_02": 3,
      "RES_DEVOPS_03": 2,
      "RES_BACKEND_01": 2,
      "RES_SEC_01": 1,
      "RES_WEB_01": 1
    }
  },
  {
    "id": "JD_SRE_01",
    "title": "Site Reliability Engineer (SRE & Telemetry)",
    "domain": "Cloud & Infrastructure",
    "min_experience_years": 4,
    "required_skills": [
      "linux",
      "kubernetes",
      "prometheus",
      "grafana",
      "python",
      "ci/cd",
      "docker",
      "distributed systems"
    ],
    "preferred_skills": [
      "golang",
      "aws",
      "terraform",
      "incident response",
      "telemetry",
      "tracing"
    ],
    "description": "Champion system resilience, latency minimization, and high availability (99.99% uptime). You will define Service Level Objectives (SLOs) and Error Budgets, engineer automated remediation runbooks in Python/Bash, instrument distributed tracing across microservices, and conduct blameless post-mortem investigations.",
    "ground_truth_relevance": {
      "RES_DEVOPS_01": 3,
      "RES_DEVOPS_02": 2,
      "RES_BACKEND_01": 1
    }
  },
  {
    "id": "JD_SEC_01",
    "title": "Information Security & Penetration Testing Analyst",
    "domain": "Cybersecurity",
    "min_experience_years": 3,
    "required_skills": [
      "vulnerability assessment",
      "penetration testing",
      "owasp",
      "siem",
      "network security",
      "incident response",
      "wireshark"
    ],
    "preferred_skills": [
      "burp suite",
      "metasploit",
      "cryptography",
      "python",
      "soc",
      "linux",
      "iam"
    ],
    "description": "We are hiring an Information Security Analyst to safeguard corporate digital assets, monitor security event streams, and conduct proactive threat hunting. You will analyze SIEM telemetry alerts, coordinate incident response workflows, perform routine vulnerability assessments and web application penetration tests against OWASP Top 10 vulnerabilities, and enforce Identity and Access Management policies. Familiarity with Wireshark packet inspection and script automation in Python/Bash is required.",
    "ground_truth_relevance": {
      "RES_SEC_01": 3,
      "RES_SEC_02": 3,
      "RES_SEC_03": 2,
      "RES_DEVOPS_01": 1,
      "RES_BACKEND_01": 1
    }
  },
  {
    "id": "JD_EMBEDDED_01",
    "title": "Embedded Systems & IoT Firmware Engineer",
    "domain": "Embedded & Hardware",
    "min_experience_years": 3,
    "required_skills": [
      "c++",
      "c",
      "microcontrollers",
      "embedded systems",
      "iot",
      "linux",
      "git"
    ],
    "preferred_skills": [
      "rtos",
      "arm",
      "i2c",
      "spi",
      "uart",
      "debugging",
      "python"
    ],
    "description": "Develop memory-constrained embedded C/C++ firmware for next-generation IoT edge hardware. You will interface low-level peripheral buses (I2C, SPI, UART), write deterministic Real-Time Operating System (RTOS) tasks, optimize battery consumption profiles, and validate communication protocols using logic analyzers and oscilloscopes.",
    "ground_truth_relevance": {
      "RES_BACKEND_01": 1,
      "RES_DEVOPS_03": 1
    }
  },
  {
    "id": "JD_QA_01",
    "title": "QA Automation & Software Test Architect",
    "domain": "Quality Assurance",
    "min_experience_years": 3,
    "required_skills": [
      "python",
      "selenium",
      "cypress",
      "unit testing",
      "ci/cd",
      "rest api",
      "git"
    ],
    "preferred_skills": [
      "pytest",
      "javascript",
      "load testing",
      "postman",
      "docker",
      "agile"
    ],
    "description": "Establish automated quality gates across web applications, REST APIs, and microservices. You will build maintainable end-to-end test suites using Cypress and Selenium WebDriver, integrate automated regression suites into CI/CD pipelines, execute API performance tests, and drive test-driven development (TDD) best practices.",
    "ground_truth_relevance": {
      "RES_WEB_01": 2,
      "RES_WEB_02": 2,
      "RES_BACKEND_01": 1
    }
  },
  {
    "id": "JD_PM_01",
    "title": "Technical Product Manager (Enterprise AI & SaaS)",
    "domain": "Product & Strategy",
    "min_experience_years": 4,
    "required_skills": [
      "product management",
      "agile",
      "scrum",
      "system design",
      "data science",
      "machine learning"
    ],
    "preferred_skills": [
      "user research",
      "roadmapping",
      "sql",
      "communication",
      "kpi tracking",
      "saas"
    ],
    "description": "Lead the product lifecycle from initial discovery and user journey mapping through to general availability. You will translate customer pain points into actionable PRDs and technical user stories, prioritize engineering backlogs, monitor engagement telemetry, and collaborate with engineering leads to deliver transformative AI-powered SaaS features.",
    "ground_truth_relevance": {
      "RES_DS_01": 2,
      "RES_WEB_01": 1,
      "RES_NLP_01": 1
    }
  },
  {
    "id": "JD_UIUX_01",
    "title": "Senior UI/UX & Design Systems Architect",
    "domain": "Product & Design",
    "min_experience_years": 4,
    "required_skills": [
      "figma",
      "ui/ux",
      "user research",
      "wireframing",
      "html5",
      "css3",
      "design systems"
    ],
    "preferred_skills": [
      "prototyping",
      "design tokens",
      "usability testing",
      "responsive design",
      "accessibility"
    ],
    "description": "Create intuitive, elegant, and accessible digital product experiences. You will conduct exploratory user interviews, design high-fidelity interactive prototypes in Figma, maintain multi-brand design token specifications, and work closely with frontend developers to ensure flawless implementation of micro-interactions and typographic rhythm.",
    "ground_truth_relevance": {
      "RES_WEB_01": 2,
      "RES_WEB_02": 1
    }
  },
  {
    "id": "JD_MECH_01",
    "title": "Mechanical Design & CAD/FEA Engineer",
    "domain": "Mechanical Engineering",
    "min_experience_years": 4,
    "required_skills": [
      "solidworks",
      "catia",
      "autocad",
      "fea",
      "finite element analysis",
      "ansys",
      "gd&t"
    ],
    "preferred_skills": [
      "sheet metal",
      "thermal analysis",
      "manufacturing",
      "cad",
      "cam",
      "matlab"
    ],
    "description": "We are seeking an experienced Mechanical Design Engineer to lead 3D CAD modeling, FEA structural simulation, and tolerance stack-up analysis. The candidate will design complex mechanical assemblies in SolidWorks and CATIA, perform non-linear finite element stress and thermal simulations in ANSYS, and generate ASME Y14.5 compliant manufacturing 2D drawings with rigorous GD&T specifications.",
    "ground_truth_relevance": {
      "RES_MECH_01": 3,
      "RES_EMBEDDED_01": 1
    }
  },
  {
    "id": "JD_MECH_02",
    "title": "HVAC & MEP Systems Design Engineer",
    "domain": "Mechanical Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "hvac",
      "mep",
      "autocad",
      "revit",
      "piping design",
      "heat load calculation",
      "duct sizing"
    ],
    "preferred_skills": [
      "ashrae standards",
      "bms",
      "plumbing",
      "energy modeling",
      "fire fighting design"
    ],
    "description": "Lead the design and engineering of commercial HVAC, plumbing, and mechanical piping systems. You will execute cooling and heating load calculations, design duct layouts according to ASHRAE standards, model 3D MEP coordination drawings in Revit, and oversee vendor equipment selection for chillers and AHUs.",
    "ground_truth_relevance": {
      "RES_MECH_01": 2,
      "RES_CIVIL_01": 1
    }
  },
  {
    "id": "JD_MECH_03",
    "title": "Manufacturing, CNC & Production Engineer",
    "domain": "Mechanical Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "manufacturing",
      "cnc",
      "lean manufacturing",
      "six sigma",
      "quality control",
      "cam",
      "assembly"
    ],
    "preferred_skills": [
      "solidworks",
      "process optimization",
      "kaizen",
      "5s",
      "tool design",
      "supply chain"
    ],
    "description": "Optimize shop-floor production lines, CNC machining centers, and automated assembly fixtures. You will program multi-axis CNC machines using CAM software, implement Lean 5S and Six Sigma waste-reduction initiatives, conduct Root Cause Analysis on component defects, and streamline plant throughput.",
    "ground_truth_relevance": {
      "RES_MECH_01": 2,
      "RES_SCM_01": 2
    }
  },
  {
    "id": "JD_MECH_04",
    "title": "Automotive & Robotics Dynamics Engineer",
    "domain": "Mechanical Engineering",
    "min_experience_years": 4,
    "required_skills": [
      "robotics",
      "kinematics",
      "dynamics",
      "matlab",
      "simulink",
      "control systems",
      "c++"
    ],
    "preferred_skills": [
      "hydraulics",
      "sensors",
      "ros",
      "solidworks",
      "fea",
      "embedded systems"
    ],
    "description": "Model multi-body kinematic and dynamic mechanisms for automotive mobility and robotic manipulators. You will construct mathematical physics simulations in MATLAB/Simulink, design feedback control laws, and validate structural load limits under real-world vibration and transient shock profiles.",
    "ground_truth_relevance": {
      "RES_MECH_01": 2,
      "RES_EMBEDDED_01": 2
    }
  },
  {
    "id": "JD_CIVIL_01",
    "title": "Structural Design Engineer (RCC & Steel)",
    "domain": "Civil Engineering",
    "min_experience_years": 4,
    "required_skills": [
      "staad.pro",
      "etabs",
      "autocad",
      "rcc design",
      "structural analysis",
      "steel structures",
      "is codes"
    ],
    "preferred_skills": [
      "seismic design",
      "foundation engineering",
      "safe",
      "revit structure",
      "concrete technology"
    ],
    "description": "Design and validate high-rise reinforced cement concrete (RCC) frames, post-tensioned slabs, and industrial steel trusses. You will conduct 3D structural analysis in ETABS and STAAD.Pro, ensure compliance with Indian Standard (IS 456, IS 1893, IS 800) and international building codes, and produce detailed bar bending schedules.",
    "ground_truth_relevance": {
      "RES_CIVIL_01": 3
    }
  },
  {
    "id": "JD_CIVIL_02",
    "title": "Construction Project & Site Execution Engineer",
    "domain": "Civil Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "site supervision",
      "quantity surveying",
      "estimation",
      "primavera p6",
      "autocad",
      "quality control"
    ],
    "preferred_skills": [
      "contract management",
      "safety",
      "bar bending schedule",
      "concrete technology",
      "ms project"
    ],
    "description": "Manage on-site execution, subcontractor coordination, and project milestones for large-scale infrastructure projects. You will verify structural drawings, execute quantity surveying and billing, monitor pouring of RMC concrete, enforce safety protocols, and track project schedules using Primavera P6.",
    "ground_truth_relevance": {
      "RES_CIVIL_01": 3,
      "RES_SCM_01": 1
    }
  },
  {
    "id": "JD_CIVIL_03",
    "title": "Geotechnical & Surveying Engineer",
    "domain": "Civil Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "geotechnical",
      "soil mechanics",
      "total station",
      "gis",
      "foundation engineering",
      "topography"
    ],
    "preferred_skills": [
      "slope stability",
      "autocad civil",
      "pavement design",
      "borehole analysis",
      "surveying"
    ],
    "description": "Conduct comprehensive subsurface soil investigations, slope stability calculations, and land topography surveys. You will interpret borehole soil laboratory test results, calculate safe bearing capacity for shallow and deep pile foundations, and operate Total Station and GPS/GIS survey apparatus.",
    "ground_truth_relevance": {
      "RES_CIVIL_01": 2
    }
  },
  {
    "id": "JD_CIVIL_04",
    "title": "Environmental & Water Resources Engineer",
    "domain": "Civil Engineering",
    "min_experience_years": 3,
    "required_skills": [
      "hydrology",
      "water treatment",
      "environmental impact assessment",
      "eia",
      "sewage network",
      "gis"
    ],
    "preferred_skills": [
      "hec-ras",
      "epanet",
      "sustainability",
      "fluid mechanics",
      "waste management"
    ],
    "description": "Engineer sustainable municipal water distribution networks, sewage treatment plants (STP/ETP), and flood drainage systems. You will execute hydrological modeling, prepare Environmental Impact Assessment (EIA) clearance reports, and design gravity pipeline networks using hydraulic software.",
    "ground_truth_relevance": {
      "RES_CIVIL_01": 2
    }
  },
  {
    "id": "JD_EEE_01",
    "title": "Electrical Power Systems & Substation Engineer",
    "domain": "Electrical & Electronics",
    "min_experience_years": 4,
    "required_skills": [
      "power systems",
      "etap",
      "switchgear",
      "substation design",
      "autocad electrical",
      "matlab"
    ],
    "preferred_skills": [
      "relay coordination",
      "scada",
      "high voltage",
      "transmission",
      "transformer design"
    ],
    "description": "Design medium and high-voltage electrical distribution networks, 66kV/11kV substations, and industrial power infrastructure. You will execute load flow and short-circuit fault analysis in ETAP, specify protective switchgear and numerical relays, and prepare single-line diagrams in AutoCAD Electrical.",
    "ground_truth_relevance": {
      "RES_EEE_01": 3
    }
  },
  {
    "id": "JD_EEE_02",
    "title": "Industrial Automation & PLC/SCADA Engineer",
    "domain": "Electrical & Electronics",
    "min_experience_years": 3,
    "required_skills": [
      "plc",
      "scada",
      "dcs",
      "industrial automation",
      "sensors",
      "instrumentation",
      "vfd"
    ],
    "preferred_skills": [
      "siemens s7",
      "allen bradley",
      "modbus",
      "control systems",
      "hmi",
      "troubleshooting"
    ],
    "description": "Develop and commission real-time PLC automation programs (Siemens S7, Rockwell Allen-Bradley) and supervisory SCADA systems for process industries. You will interface digital and analog field sensors, calibrate variable frequency drives (VFDs), and troubleshoot Modbus/Profibus industrial networks.",
    "ground_truth_relevance": {
      "RES_EEE_01": 3,
      "RES_EMBEDDED_01": 2
    }
  },
  {
    "id": "JD_ECE_01",
    "title": "VLSI Design & ASIC/FPGA Verification Engineer",
    "domain": "Electrical & Electronics",
    "min_experience_years": 3,
    "required_skills": [
      "verilog",
      "systemverilog",
      "uvm",
      "fpga",
      "asic",
      "rtl design",
      "synopsys"
    ],
    "preferred_skills": [
      "cadence",
      "static timing analysis",
      "tcl",
      "digital electronics",
      "c++",
      "linux"
    ],
    "description": "Architect RTL designs in Verilog/SystemVerilog and build constrained-random verification testbenches utilizing UVM methodology. You will perform logic synthesis, static timing analysis (STA), and functional FPGA prototyping for high-performance semiconductor chips.",
    "ground_truth_relevance": {
      "RES_EMBEDDED_01": 2,
      "RES_EEE_01": 1
    }
  },
  {
    "id": "JD_CHEM_01",
    "title": "Chemical Process & Plant Design Engineer",
    "domain": "Chemical & Biotech",
    "min_experience_years": 3,
    "required_skills": [
      "process simulation",
      "aspen plus",
      "p&id",
      "chemical reactors",
      "mass balance",
      "heat transfer"
    ],
    "preferred_skills": [
      "distillation",
      "plant safety",
      "hazop",
      "piping",
      "fluid mechanics",
      "autocad"
    ],
    "description": "Simulate and design continuous chemical manufacturing processes, distillation columns, and catalytic reactors. You will develop rigorous mass and energy balances using Aspen Plus/HYSYS, prepare Piping and Instrumentation Diagrams (P&IDs), and conduct HAZOP process safety audits.",
    "ground_truth_relevance": {
      "RES_MECH_01": 1
    }
  },
  {
    "id": "JD_BIO_01",
    "title": "Biomedical & Clinical Research Scientist",
    "domain": "Chemical & Biotech",
    "min_experience_years": 3,
    "required_skills": [
      "biotechnology",
      "clinical trials",
      "glp",
      "molecular biology",
      "regulatory affairs",
      "bio-instrumentation"
    ],
    "preferred_skills": [
      "pcr",
      "fda compliance",
      "data analysis",
      "microbiology",
      "gcp",
      "pharmacovigilance"
    ],
    "description": "Oversee clinical trials and biopharmaceutical laboratory workflows adhering to Good Laboratory Practice (GLP) and ICH-GCP guidelines. You will manage clinical trial documentation, validate bio-instrumentation protocols, analyze genomic/molecular assays, and interface with regulatory health authorities.",
    "ground_truth_relevance": {
      "RES_DS_01": 1
    }
  },
  {
    "id": "JD_CA_01",
    "title": "Chartered Accountant (CA) & Senior Auditor",
    "domain": "Commerce, CA & Accounting",
    "min_experience_years": 4,
    "required_skills": [
      "statutory audit",
      "tax planning",
      "gst",
      "income tax",
      "ifrs",
      "tally prime",
      "balance sheet",
      "auditing"
    ],
    "preferred_skills": [
      "taxation",
      "internal audit",
      "financial reporting",
      "excel",
      "transfer pricing",
      "companies act"
    ],
    "description": "Lead statutory audits, tax audits, and financial reporting for corporate clients. You will finalize balance sheets, profit & loss statements in compliance with Ind AS / IFRS, review internal financial controls, formulate strategic direct and indirect tax planning, and resolve complex tax audit matters.",
    "ground_truth_relevance": {
      "RES_CA_01": 3,
      "RES_FIN_01": 2
    }
  },
  {
    "id": "JD_TAX_01",
    "title": "Corporate Tax Consultant & GST Specialist",
    "domain": "Commerce, CA & Accounting",
    "min_experience_years": 3,
    "required_skills": [
      "gst",
      "direct tax",
      "indirect tax",
      "gst returns",
      "transfer pricing",
      "income tax",
      "tax planning"
    ],
    "preferred_skills": [
      "tax litigation",
      "tds",
      "tally prime",
      "corporate tax",
      "assessments",
      "excel"
    ],
    "description": "Manage end-to-end corporate direct and indirect taxation workflows. You will oversee monthly and annual GST return filings (GSTR-1, GSTR-3B, GSTR-9C), structure cross-border transfer pricing documentation, handle withholding tax (TDS) compliance, and prepare submissions for tax assessments and appellate hearings.",
    "ground_truth_relevance": {
      "RES_CA_01": 3,
      "RES_FIN_01": 1
    }
  },
  {
    "id": "JD_ACCT_01",
    "title": "Senior Financial Accountant & Bookkeeper",
    "domain": "Commerce, CA & Accounting",
    "min_experience_years": 3,
    "required_skills": [
      "tally prime",
      "tally",
      "quickbooks",
      "accounts payable",
      "accounts receivable",
      "general ledger",
      "balance sheet"
    ],
    "preferred_skills": [
      "bank reconciliation",
      "gst returns",
      "payroll accounting",
      "financial statements",
      "excel"
    ],
    "description": "Maintain day-to-day general ledger accounting, accounts payable/receivable cycles, and bank reconciliations using Tally Prime and QuickBooks. You will reconcile vendor invoices, manage payroll disbursements, assist in monthly books closure, and draft trial balance sheets for executive review.",
    "ground_truth_relevance": {
      "RES_CA_01": 3,
      "RES_FIN_01": 1
    }
  },
  {
    "id": "JD_FIN_01",
    "title": "Financial Analyst & Equity Research Associate",
    "domain": "Finance & Banking",
    "min_experience_years": 3,
    "required_skills": [
      "financial modeling",
      "dcf valuation",
      "equity research",
      "financial analysis",
      "bloomberg terminal",
      "excel vba"
    ],
    "preferred_skills": [
      "m&a",
      "portfolio management",
      "statistics",
      "valuation",
      "ratio analysis",
      "python"
    ],
    "description": "Conduct equity research, build detailed financial forecasting models, and derive enterprise intrinsic valuation using Discounted Cash Flow (DCF) and trading multiples. You will analyze corporate earnings releases, synthesize industry competitive dynamics, and publish institutional investment recommendation reports.",
    "ground_truth_relevance": {
      "RES_FIN_01": 3,
      "RES_CA_01": 2,
      "RES_DS_01": 1
    }
  },
  {
    "id": "JD_IB_01",
    "title": "Investment Banking & Corporate Finance Analyst",
    "domain": "Finance & Banking",
    "min_experience_years": 3,
    "required_skills": [
      "financial modeling",
      "valuation",
      "m&a",
      "pitch decks",
      "dcf valuation",
      "due diligence",
      "lbo modeling"
    ],
    "preferred_skills": [
      "capital markets",
      "excel vba",
      "corporate finance",
      "accounting",
      "deal execution"
    ],
    "description": "Support lead bankers in M&A advisory, private equity capital raising, and initial public offerings (IPOs). You will build comprehensive 3-statement financial models, LBO models, compile confidential information memorandums (CIMs), and execute commercial due diligence for multi-million dollar transactions.",
    "ground_truth_relevance": {
      "RES_FIN_01": 3,
      "RES_CA_01": 2
    }
  },
  {
    "id": "JD_RISK_01",
    "title": "Banking Risk Management & AML Compliance Officer",
    "domain": "Finance & Banking",
    "min_experience_years": 4,
    "required_skills": [
      "risk management",
      "aml",
      "kyc",
      "regulatory compliance",
      "internal audit",
      "basel iii",
      "fraud detection"
    ],
    "preferred_skills": [
      "credit risk",
      "market risk",
      "banking operations",
      "reporting",
      "audit"
    ],
    "description": "Protect the banking institution against credit default, operational vulnerability, and regulatory sanctions. You will execute anti-money laundering (AML) transaction monitoring, audit KYC onboarding dossiers, assess capital adequacy under Basel III frameworks, and interface with central bank auditors.",
    "ground_truth_relevance": {
      "RES_FIN_01": 2,
      "RES_CA_01": 2,
      "RES_LEGAL_01": 2
    }
  },
  {
    "id": "JD_HR_01",
    "title": "Human Resources (HR) & Talent Acquisition Manager",
    "domain": "HR & Operations",
    "min_experience_years": 4,
    "required_skills": [
      "talent acquisition",
      "human resources",
      "employee relations",
      "payroll",
      "hr policies",
      "recruiting",
      "performance management"
    ],
    "preferred_skills": [
      "onboarding",
      "hris",
      "workday",
      "labor law",
      "compensation and benefits",
      "conflict resolution"
    ],
    "description": "Drive full-cycle recruitment, workforce planning, and organizational culture. You will partner with business executives to identify talent requirements, execute proactive sourcing and competency-based interviews, manage compensation benchmarking, oversee monthly payroll compliance, and resolve employee relations issues.",
    "ground_truth_relevance": {
      "RES_HR_01": 3
    }
  },
  {
    "id": "JD_SCM_01",
    "title": "Supply Chain & Logistics Operations Manager",
    "domain": "HR & Operations",
    "min_experience_years": 4,
    "required_skills": [
      "supply chain",
      "logistics",
      "sap erp",
      "inventory management",
      "procurement",
      "warehouse operations"
    ],
    "preferred_skills": [
      "vendor management",
      "six sigma",
      "operations management",
      "transportation",
      "cost reduction"
    ],
    "description": "Manage end-to-end supply chain logistics, inventory optimization, and vendor procurement. You will track multi-warehouse inventory levels in SAP ERP, optimize distribution transport routes, negotiate commercial supplier contracts, and enforce OTIF (On-Time In-Full) fulfillment standards.",
    "ground_truth_relevance": {
      "RES_SCM_01": 3,
      "RES_MECH_01": 1
    }
  },
  {
    "id": "JD_OPS_01",
    "title": "Business Operations & Strategy Manager",
    "domain": "HR & Operations",
    "min_experience_years": 4,
    "required_skills": [
      "operations management",
      "process optimization",
      "kpi tracking",
      "cross-functional leadership",
      "six sigma",
      "agile"
    ],
    "preferred_skills": [
      "data analysis",
      "strategic planning",
      "stakeholder management",
      "project management",
      "excel"
    ],
    "description": "Design and execute strategic initiatives that eliminate operational bottlenecks, optimize unit economics, and scale enterprise productivity. You will establish business KPI telemetry dashboards, conduct root cause operational deep dives, and manage cross-functional execution across engineering, sales, and finance.",
    "ground_truth_relevance": {
      "RES_SCM_01": 2,
      "RES_HR_01": 2,
      "RES_PM_01": 2
    }
  },
  {
    "id": "JD_MKT_01",
    "title": "Digital Marketing & Growth Strategist",
    "domain": "Marketing & Sales",
    "min_experience_years": 3,
    "required_skills": [
      "digital marketing",
      "seo",
      "sem",
      "google analytics",
      "meta ads",
      "performance marketing",
      "content strategy"
    ],
    "preferred_skills": [
      "growth hacking",
      "conversion rate optimization",
      "email marketing",
      "social media",
      "copywriting"
    ],
    "description": "Drive customer acquisition, revenue scale, and digital brand presence. You will manage high-scale paid ad campaigns on Meta and Google Ads, optimize CAC and ROAS metrics, execute organic search engine optimization (SEO) keyword strategies, and oversee data-driven email automation funnels.",
    "ground_truth_relevance": {
      "RES_MKT_01": 3,
      "RES_WEB_01": 1
    }
  },
  {
    "id": "JD_SALES_01",
    "title": "Enterprise B2B Sales & Business Development Manager",
    "domain": "Marketing & Sales",
    "min_experience_years": 4,
    "required_skills": [
      "b2b sales",
      "lead generation",
      "salesforce",
      "client relationship",
      "negotiation",
      "pipeline management"
    ],
    "preferred_skills": [
      "crm",
      "contract negotiation",
      "presentation",
      "cold outreach",
      "revenue growth",
      "account management"
    ],
    "description": "Identify and close high-value B2B enterprise software and service contracts. You will conduct discovery meetings with C-level executives, articulate solution value propositions, maintain a healthy pipeline in Salesforce CRM, and negotiate commercial contract terms to exceed quarterly revenue targets.",
    "ground_truth_relevance": {
      "RES_MKT_01": 2,
      "RES_HR_01": 1
    }
  },
  {
    "id": "JD_LEGAL_01",
    "title": "Corporate Legal Counsel & Contract Specialist",
    "domain": "Legal & Compliance",
    "min_experience_years": 4,
    "required_skills": [
      "contract drafting",
      "corporate law",
      "compliance",
      "due diligence",
      "intellectual property",
      "regulatory compliance"
    ],
    "preferred_skills": [
      "dispute resolution",
      "legal research",
      "commercial litigation",
      "gdpr",
      "negotiation",
      "arbitration"
    ],
    "description": "Provide sound legal counsel on corporate commercial transactions, software licensing, and regulatory compliance. You will draft and negotiate complex Master Service Agreements (MSAs), NDAs, and vendor contracts, supervise M&A legal due diligence, and safeguard corporate intellectual property rights.",
    "ground_truth_relevance": {
      "RES_LEGAL_01": 3,
      "RES_CA_01": 1
    }
  }
];

const RAW_SKILLS_TAXONOMY = {
  "programming_languages": [
    "python",
    "javascript",
    "typescript",
    "c++",
    "c#",
    "c",
    "java",
    "golang",
    "go",
    "rust",
    "ruby",
    "php",
    "swift",
    "kotlin",
    "scala",
    "r",
    "julia",
    "sql",
    "bash",
    "shell"
  ],
  "machine_learning_and_ai": [
    "machine learning",
    "deep learning",
    "natural language processing",
    "nlp",
    "computer vision",
    "transformers",
    "bert",
    "sentence-bert",
    "sbert",
    "gpt",
    "large language models",
    "llm",
    "rag",
    "langchain",
    "pytorch",
    "tensorflow",
    "keras",
    "scikit-learn",
    "xgboost",
    "lightgbm",
    "spacy",
    "nltk",
    "huggingface",
    "opencv",
    "feature engineering",
    "hyperparameter tuning",
    "mlops",
    "data science",
    "vector databases",
    "fine-tuning",
    "prompt engineering",
    "yolo",
    "segmentation",
    "object detection",
    "onnx",
    "cuda"
  ],
  "web_and_backend_frameworks": [
    "react",
    "react.js",
    "next.js",
    "vue",
    "angular",
    "node.js",
    "express",
    "fastapi",
    "flask",
    "django",
    "spring boot",
    "asp.net",
    "graphql",
    "rest api",
    "grpc",
    "microservices",
    "html5",
    "css3",
    "tailwind css",
    "bootstrap",
    "swiftui",
    "flutter",
    "core data"
  ],
  "cloud_and_devops": [
    "aws",
    "amazon web services",
    "azure",
    "google cloud platform",
    "gcp",
    "docker",
    "kubernetes",
    "k8s",
    "terraform",
    "ansible",
    "ci/cd",
    "jenkins",
    "github actions",
    "gitlab ci",
    "helm",
    "prometheus",
    "grafana",
    "linux",
    "cloudformation",
    "sre",
    "telemetry",
    "tracing"
  ],
  "databases_and_data_engineering": [
    "postgresql",
    "mysql",
    "mongodb",
    "redis",
    "elasticsearch",
    "cassandra",
    "snowflake",
    "bigquery",
    "apache spark",
    "spark",
    "apache kafka",
    "kafka",
    "airflow",
    "hadoop",
    "neo4j",
    "sqlite",
    "tableau",
    "power bi",
    "pandas"
  ],
  "cybersecurity": [
    "penetration testing",
    "vulnerability assessment",
    "owasp",
    "siem",
    "soc",
    "wireshark",
    "cryptography",
    "iam",
    "zero trust",
    "network security",
    "incident response",
    "burp suite",
    "metasploit"
  ],
  "mechanical_engineering": [
    "solidworks",
    "catia",
    "autocad",
    "fea",
    "finite element analysis",
    "ansys",
    "gd&t",
    "hvac",
    "mep",
    "thermal analysis",
    "cad",
    "cam",
    "cnc",
    "sheet metal",
    "manufacturing",
    "lean manufacturing",
    "six sigma",
    "kinematics",
    "dynamics",
    "matlab",
    "simulink",
    "piping design",
    "duct sizing",
    "heat load calculation",
    "revit",
    "robotics",
    "hydraulics"
  ],
  "civil_and_structural_engineering": [
    "staad.pro",
    "etabs",
    "autocad",
    "autocad civil",
    "rcc design",
    "structural analysis",
    "steel structures",
    "quantity surveying",
    "primavera p6",
    "total station",
    "gis",
    "geotechnical",
    "soil mechanics",
    "concrete technology",
    "is codes",
    "estimation",
    "site supervision",
    "hydrology",
    "water treatment",
    "environmental impact assessment",
    "eia",
    "sewage network",
    "foundation engineering"
  ],
  "electrical_and_electronics": [
    "power systems",
    "etap",
    "plc",
    "scada",
    "dcs",
    "matlab",
    "simulink",
    "switchgear",
    "substation design",
    "verilog",
    "systemverilog",
    "uvm",
    "fpga",
    "asic",
    "vlsi",
    "cadence",
    "synopsys",
    "instrumentation",
    "autocad electrical",
    "vfd",
    "industrial automation",
    "sensors"
  ],
  "chemical_and_biotech": [
    "process simulation",
    "aspen plus",
    "p&id",
    "chemical reactors",
    "mass balance",
    "heat transfer",
    "distillation",
    "biotechnology",
    "clinical trials",
    "glp",
    "molecular biology",
    "regulatory affairs",
    "bio-instrumentation"
  ],
  "commerce_accounting_and_tax": [
    "statutory audit",
    "tax planning",
    "gst",
    "income tax",
    "ifrs",
    "tally prime",
    "tally",
    "balance sheet",
    "auditing",
    "taxation",
    "accounting",
    "direct tax",
    "indirect tax",
    "gst returns",
    "transfer pricing",
    "quickbooks",
    "accounts payable",
    "accounts receivable",
    "general ledger",
    "bank reconciliation"
  ],
  "finance_banking_and_investment": [
    "financial modeling",
    "dcf valuation",
    "equity research",
    "financial analysis",
    "bloomberg terminal",
    "excel vba",
    "m&a",
    "valuation",
    "portfolio management",
    "lbo modeling",
    "pitch decks",
    "risk management",
    "aml",
    "kyc",
    "basel iii",
    "regulatory compliance",
    "fraud detection"
  ],
  "human_resources_and_operations": [
    "talent acquisition",
    "human resources",
    "employee relations",
    "payroll",
    "hr policies",
    "recruiting",
    "performance management",
    "onboarding",
    "supply chain",
    "logistics",
    "sap erp",
    "inventory management",
    "procurement",
    "warehouse operations",
    "operations management",
    "process optimization",
    "kpi tracking"
  ],
  "marketing_and_sales": [
    "digital marketing",
    "seo",
    "sem",
    "google analytics",
    "meta ads",
    "performance marketing",
    "content strategy",
    "growth hacking",
    "conversion rate optimization",
    "email marketing",
    "b2b sales",
    "lead generation",
    "salesforce",
    "client relationship",
    "negotiation",
    "pipeline management",
    "crm"
  ],
  "legal_and_compliance": [
    "contract drafting",
    "corporate law",
    "compliance",
    "due diligence",
    "intellectual property",
    "regulatory compliance",
    "dispute resolution",
    "legal research",
    "commercial litigation"
  ],
  "hardware_and_qa": [
    "embedded systems",
    "iot",
    "microcontrollers",
    "rtos",
    "arm",
    "selenium",
    "cypress",
    "unit testing",
    "tdd",
    "load testing"
  ],
  "product_and_design": [
    "product management",
    "agile",
    "scrum",
    "system design",
    "user research",
    "wireframing",
    "figma",
    "ui/ux",
    "design systems",
    "prototyping"
  ]
};

window.APP_DATA = {
  resumes: RAW_RESUMES,
  jds: RAW_JDS,
  taxonomy: RAW_SKILLS_TAXONOMY
};
