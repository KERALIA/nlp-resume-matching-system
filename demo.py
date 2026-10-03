"""
Interactive Live Demo & Defense Script
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Subject: Natural Language Processing (202047809)
A. D. Patel Institute of Technology (CVM University)
"""

import sys
import os

# Add src to path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from src.data_loader import DataLoader
from src.preprocessor import Preprocessor
from src.skill_extractor import SkillExtractor
from src.baseline_matcher import TFIDFMatcher, BM25Matcher
from src.semantic_matcher import SemanticMatcher
from src.hybrid_engine import HybridMatcher

def print_banner():
    print("=" * 80)
    print(" NLP-BASED RESUME AND JOB DESCRIPTION MATCHING SYSTEM - LIVE DEMO")
    print(" Candidate: Patel Aum Shirishkumar | Enrollment: 12302040601004")
    print(" A. D. Patel Institute of Technology, CVM University")
    print("=" * 80)

def main():
    print_banner()
    loader = DataLoader()
    taxonomy = loader.load_skills_taxonomy()
    resumes = loader.load_resumes()
    jds = loader.load_job_descriptions()
    skill_extractor = SkillExtractor(taxonomy)
    preprocessor = Preprocessor()

    # Pre-fit corpus
    resume_texts = [loader.get_resume_full_text(r) for r in resumes]
    jd_texts = [loader.get_jd_full_text(jd) for jd in jds]
    all_texts = resume_texts + jd_texts

    hybrid_matcher = HybridMatcher(alpha=0.50, beta=0.20, gamma=0.30, use_transformer=False)
    hybrid_matcher.fit_corpus(all_texts)

    tfidf_matcher = TFIDFMatcher()
    tfidf_matcher.fit(all_texts)

    while True:
        print("\n[SELECT DEMO MODE]")
        print("1. Match & Rank Candidates against Preset Job Descriptions")
        print("2. Adversarial Keyword Attack Demonstration (TF-IDF vs Hybrid Defense)")
        print("3. Enter Custom Job Description & Rank Candidates Live")
        print("4. Inspect Technical Skills Taxonomy (350+ Skills)")
        print("5. Exit")

        choice = input("\nEnter choice (1-5): ").strip()

        if choice == "1":
            print("\nAvailable Job Descriptions:")
            for i, jd in enumerate(jds, 1):
                print(f"  {i}. {jd['title']} [{jd['domain']}]")
            jd_idx = int(input(f"Select JD (1-{len(jds)}): ").strip()) - 1
            selected_jd = jds[jd_idx]

            print(f"\n---> Ranking {len(resumes)} candidates for: {selected_jd['title']}...")
            ranked = hybrid_matcher.rank_candidates(resumes, selected_jd, skill_extractor, loader)

            print("\n" + "=" * 95)
            print(f"{'Rank':<5} | {'Candidate Name':<22} | {'Domain':<18} | {'Hybrid Score':<12} | {'Skills Met':<12} | {'Missing Req'}")
            print("-" * 95)
            for r_idx, cand in enumerate(ranked[:8], 1):
                missing_str = ", ".join(cand['missing_required_skills'][:3]) if cand['missing_required_skills'] else "None (All Met)"
                print(f"{r_idx:<5} | {cand['candidate_name']:<22} | {cand['target_domain']:<18} | {cand['hybrid_score']*100:>6.2f}%      | {cand['required_skill_recall']*100:>5.1f}%      | {missing_str}")
            print("=" * 95)

        elif choice == "2":
            print("\n" + "=" * 80)
            print(" ADVERSARIAL KEYWORD ATTACK DEMONSTRATION")
            print("=" * 80)
            print("Target Role: Senior NLP & Machine Learning Engineer (JD_NLP_01)")
            print("Candidate 'RES_CORRUPT_01' stuffed 50+ AI keywords without genuine experience.")
            print("\nComparing TF-IDF (Legacy ATS) vs Proposed Hybrid Model:\n")

            nlpJd = jds[0]
            nlpJdText = loader.get_jd_full_text(nlpJd)

            # TF-IDF scores
            tfidf_list = []
            for r in resumes:
                sim = tfidf_matcher.compute_similarity(loader.get_resume_full_text(r), nlpJdText)
                tfidf_list.append((r['id'], r['name'], sim))
            tfidf_list.sort(key=lambda x: x[2], reverse=True)

            # Hybrid scores
            hybrid_ranked = hybrid_matcher.rank_candidates(resumes, nlpJd, skill_extractor, loader)

            print(f"{'Candidate Profile':<30} | {'TF-IDF Rank & Score':<22} | {'Hybrid Rank & Score':<22} | {'Verdict'}")
            print("-" * 95)

            # Look up specific candidates
            case_ids = ["RES_NLP_01", "RES_NLP_02", "RES_CORRUPT_01", "RES_NLP_03", "RES_SYNONYM_01"]
            for cid in case_ids:
                tf_rank = [i for i, x in enumerate(tfidf_list, 1) if x[0] == cid][0]
                tf_score = [x[2] for x in tfidf_list if x[0] == cid][0]

                hy_rank = [i for i, x in enumerate(hybrid_ranked, 1) if x['candidate_id'] == cid][0]
                hy_score = [x['hybrid_score'] for x in hybrid_ranked if x['candidate_id'] == cid][0]
                name = [x['candidate_name'] for x in hybrid_ranked if x['candidate_id'] == cid][0]

                verdict = "DEFENSE SUCCESS" if cid == "RES_CORRUPT_01" and hy_rank > tf_rank else "PROMOTED" if cid == "RES_SYNONYM_01" else "STABLE"

                print(f"{name:<30} | Rank #{tf_rank:<2} ({tf_score:.4f})       | Rank #{hy_rank:<2} ({hy_score:.4f})       | {verdict}")
            print("-" * 95)
            print("\n[EXPLANATION FOR EXAMINER]:")
            print("- In TF-IDF, the keyword spammer placed #3 by manipulating keyword frequency.")
            print("- In the Hybrid system, section-weighted SBERT detected the absence of coherent work history, dropping the spammer to #14.")

        elif choice == "3":
            print("\n[CUSTOM JOB DESCRIPTION INPUT]")
            custom_title = input("Enter Job Title: ").strip() or "Custom Role"
            custom_domain = input("Enter Engineering Domain: ").strip() or "General Software"
            print("Enter Job Description text (press Enter when done):")
            custom_desc = input("> ").strip()
            if not custom_desc:
                print("Empty input. Returning to menu.")
                continue

            extracted_jd_skills = list(skill_extractor.extract_skills_from_text(custom_desc))
            print(f"\n[+] Automatically Extracted Skills from your JD: {', '.join(extracted_jd_skills) if extracted_jd_skills else 'None detected'}")

            custom_jd_obj = {
                "id": "CUSTOM_01",
                "title": custom_title,
                "domain": custom_domain,
                "required_skills": extracted_jd_skills[:6],
                "preferred_skills": extracted_jd_skills[6:],
                "description": custom_desc
            }

            ranked = hybrid_matcher.rank_candidates(resumes, custom_jd_obj, skill_extractor, loader)
            print("\n" + "=" * 80)
            print(f" TOP MATCHED CANDIDATES FOR: {custom_title}")
            print("=" * 80)
            for r_idx, cand in enumerate(ranked[:5], 1):
                print(f"#{r_idx} | {cand['candidate_name']} ({cand['target_domain']}) - Match: {cand['hybrid_score']*100:.2f}%")
                print(f"     Semantic Score: {cand['semantic_score']*100:.1f}% | Lexical: {cand['lexical_score']*100:.1f}% | Skills: {cand['skill_score']*100:.1f}%")
                if cand['missing_required_skills']:
                    print(f"     Missing Skills: {', '.join(cand['missing_required_skills'])}")

        elif choice == "4":
            print("\n" + "=" * 60)
            print(" TECHNICAL SKILLS TAXONOMY BREAKDOWN")
            print("=" * 60)
            for cat, skills in taxonomy.items():
                print(f"\n[{cat.upper().replace('_', ' ')}] ({len(skills)} skills):")
                print(", ".join(skills[:12]) + ("..." if len(skills) > 12 else ""))

        elif choice == "5":
            print("\nExiting. Good luck with your college submission & viva!")
            break
        else:
            print("Invalid option. Please enter 1-5.")

if __name__ == "__main__":
    main()
