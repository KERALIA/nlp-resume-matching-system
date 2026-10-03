"""
End-to-End Experimental Benchmark Runner
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Department of Computer Engineering, A. D. Patel Institute of Technology
Evaluates Baseline (TF-IDF, BM25) vs. Proposed Hybrid Architecture on the Resume-JD Corpus.
"""

import os
import sys
import json
import time
from typing import Dict, List, Any

# Add src to path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from src.data_loader import DataLoader
from src.preprocessor import Preprocessor
from src.skill_extractor import SkillExtractor
from src.baseline_matcher import TFIDFMatcher, BM25Matcher
from src.semantic_matcher import SemanticMatcher
from src.hybrid_engine import HybridMatcher
from src.evaluate import Evaluator

def main():
    print("=" * 80)
    print("NLP-Based Resume and Job Description Matching System - Benchmark Suite")
    print("Candidate: Patel Aum Shirishkumar (12302040601004)")
    print("Subject: Natural Language Processing (202047809)")
    print("=" * 80)

    loader = DataLoader()
    taxonomy = loader.load_skills_taxonomy()
    resumes = loader.load_resumes()
    jds = loader.load_job_descriptions()

    print(f"\n[+] Ingested Dataset:")
    print(f"    - Resumes Corpus: {len(resumes)} diverse candidate profiles")
    print(f"    - Target Job Descriptions: {len(jds)} specialized domain roles")
    print(f"    - Skill Taxonomy: {len(loader.get_all_skills_flat())} unique standardized competencies")

    skill_extractor = SkillExtractor(taxonomy)
    preprocessor = Preprocessor()

    # Prepare corpus texts for fitting baseline models
    resume_texts = [loader.get_resume_full_text(r) for r in resumes]
    jd_texts = [loader.get_jd_full_text(jd) for jd in jds]
    all_corpus_texts = resume_texts + jd_texts

    # Initialize matchers
    tfidf_matcher = TFIDFMatcher()
    tfidf_matcher.fit(all_corpus_texts)

    bm25_matcher = BM25Matcher()
    bm25_matcher.fit(all_corpus_texts)

    semantic_matcher = SemanticMatcher(use_transformer=False)
    hybrid_matcher = HybridMatcher(alpha=0.50, beta=0.20, gamma=0.30, use_transformer=False)
    hybrid_matcher.fit_corpus(all_corpus_texts)

    # Models to benchmark
    models = ["TF-IDF Baseline", "Okapi BM25", "Dense SBERT", "SBERT + Skill Overlap", "Proposed Hybrid System"]
    model_metrics = {m: {"P@1": 0.0, "P@3": 0.0, "P@5": 0.0, "R@3": 0.0, "R@5": 0.0, "MRR": 0.0, "NDCG@3": 0.0, "NDCG@5": 0.0, "latency_ms": 0.0} for m in models}

    total_queries = len(jds)

    print("\n[+] Running Comparative Benchmarks across all Job Descriptions...")

    for jd in jds:
        jd_id = jd["id"]
        jd_title = jd["title"]
        ground_truth = jd["ground_truth_relevance"]
        jd_text = loader.get_jd_full_text(jd)
        jd_req_skills = set(s.lower() for s in jd.get("required_skills", []))
        jd_pref_skills = set(s.lower() for s in jd.get("preferred_skills", []))

        # 1. TF-IDF
        t0 = time.perf_counter()
        tfidf_scores = []
        for r in resumes:
            r_text = loader.get_resume_full_text(r)
            sim = tfidf_matcher.compute_similarity(r_text, jd_text)
            tfidf_scores.append((r["id"], sim))
        tfidf_scores.sort(key=lambda x: x[1], reverse=True)
        t_tfidf = (time.perf_counter() - t0) * 1000 / len(resumes)
        ranked_tfidf = [x[0] for x in tfidf_scores]
        res_tfidf = Evaluator.evaluate_ranking_run(ranked_tfidf, ground_truth)
        res_tfidf["latency_ms"] = t_tfidf

        # 2. BM25
        t0 = time.perf_counter()
        bm25_scores = []
        for r in resumes:
            r_text = loader.get_resume_full_text(r)
            sim = bm25_matcher.compute_similarity(jd_text, r_text)
            bm25_scores.append((r["id"], sim))
        bm25_scores.sort(key=lambda x: x[1], reverse=True)
        t_bm25 = (time.perf_counter() - t0) * 1000 / len(resumes)
        ranked_bm25 = [x[0] for x in bm25_scores]
        res_bm25 = Evaluator.evaluate_ranking_run(ranked_bm25, ground_truth)
        res_bm25["latency_ms"] = t_bm25

        # 3. Dense Semantic (SBERT alone)
        t0 = time.perf_counter()
        sbert_scores = []
        for r in resumes:
            r_text = loader.get_resume_full_text(r)
            r_sec = preprocessor.extract_sections(r_text)
            sim = semantic_matcher.compute_section_weighted_similarity(r_sec, jd_text)
            sbert_scores.append((r["id"], sim))
        sbert_scores.sort(key=lambda x: x[1], reverse=True)
        t_sbert = (time.perf_counter() - t0) * 1000 / len(resumes)
        ranked_sbert = [x[0] for x in sbert_scores]
        res_sbert = Evaluator.evaluate_ranking_run(ranked_sbert, ground_truth)
        res_sbert["latency_ms"] = t_sbert

        # 4. SBERT + Skill Overlap (Ablation without lexical)
        t0 = time.perf_counter()
        sbert_skill_scores = []
        for r in resumes:
            r_text = loader.get_resume_full_text(r)
            r_sec = preprocessor.extract_sections(r_text)
            sim_sem = semantic_matcher.compute_section_weighted_similarity(r_sec, jd_text)
            r_skills = set(s.lower() for s in r.get("skills", [])).union(skill_extractor.extract_skills_from_text(r_text))
            sm = skill_extractor.compute_skill_metrics(r_skills, jd_req_skills, jd_pref_skills)
            sim_skill = sm["weighted_skill_score"]
            sim_comb = 0.65 * sim_sem + 0.35 * sim_skill
            sbert_skill_scores.append((r["id"], sim_comb))
        sbert_skill_scores.sort(key=lambda x: x[1], reverse=True)
        t_sbert_skill = (time.perf_counter() - t0) * 1000 / len(resumes)
        ranked_sbert_skill = [x[0] for x in sbert_skill_scores]
        res_sbert_skill = Evaluator.evaluate_ranking_run(ranked_sbert_skill, ground_truth)
        res_sbert_skill["latency_ms"] = t_sbert_skill

        # 5. Proposed Hybrid System
        t0 = time.perf_counter()
        hybrid_ranked = hybrid_matcher.rank_candidates(resumes, jd, skill_extractor, loader)
        t_hybrid = (time.perf_counter() - t0) * 1000 / len(resumes)
        ranked_hybrid = [x["candidate_id"] for x in hybrid_ranked]
        res_hybrid = Evaluator.evaluate_ranking_run(ranked_hybrid, ground_truth)
        res_hybrid["latency_ms"] = t_hybrid

        # Accumulate metrics
        runs = {
            "TF-IDF Baseline": res_tfidf,
            "Okapi BM25": res_bm25,
            "Dense SBERT": res_sbert,
            "SBERT + Skill Overlap": res_sbert_skill,
            "Proposed Hybrid System": res_hybrid
        }

        for m_name, m_res in runs.items():
            for metric_k, metric_v in m_res.items():
                model_metrics[m_name][metric_k] += metric_v / total_queries

    # Print summary table
    print("\n" + "=" * 100)
    print(f"{'Algorithm / Architecture':<28} | {'P@1':<6} | {'P@3':<6} | {'P@5':<6} | {'R@5':<6} | {'MRR':<6} | {'NDCG@3':<7} | {'NDCG@5':<7} | {'Latency (ms)':<12}")
    print("-" * 100)

    for m_name in models:
        metrics = model_metrics[m_name]
        print(f"{m_name:<28} | {metrics['P@1']:<6.4f} | {metrics['P@3']:<6.4f} | {metrics['P@5']:<6.4f} | {metrics['R@5']:<6.4f} | {metrics['MRR']:<6.4f} | {metrics['NDCG@3']:<7.4f} | {metrics['NDCG@5']:<7.4f} | {metrics['latency_ms']:<12.2f}")
    print("=" * 100)

    # Save results to file
    out_dir = os.path.join(os.path.dirname(__file__), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "benchmark_metrics.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(model_metrics, f, indent=2)

    print(f"\n[✓] Results successfully exported to: {out_file}")

if __name__ == "__main__":
    main()
