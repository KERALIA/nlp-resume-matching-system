"""
Tri-Partite Hybrid Matcher & Ranking Engine
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Combines dense contextual embeddings, lexical matching (TF-IDF/BM25), and explicit skill verification.
"""

from typing import Dict, List, Any, Optional
from .preprocessor import Preprocessor
from .baseline_matcher import TFIDFMatcher, BM25Matcher
from .semantic_matcher import SemanticMatcher
from .skill_extractor import SkillExtractor

class HybridMatcher:
    def __init__(
        self,
        alpha: float = 0.50,   # Semantic weight
        beta: float = 0.20,    # Lexical weight
        gamma: float = 0.30,   # Skill overlap weight
        use_transformer: bool = False
    ):
        assert abs((alpha + beta + gamma) - 1.0) < 1e-4, "Weights alpha, beta, gamma must sum to 1.0"
        self.alpha = alpha
        self.beta = beta
        self.gamma = gamma

        self.preprocessor = Preprocessor()
        self.tfidf_matcher = TFIDFMatcher()
        self.bm25_matcher = BM25Matcher()
        self.semantic_matcher = SemanticMatcher(use_transformer=use_transformer)

    def fit_corpus(self, corpus_texts: List[str]):
        """Fits vocabulary and IDF statistics for TF-IDF and BM25 baseline components."""
        self.tfidf_matcher.fit(corpus_texts)
        self.bm25_matcher.fit(corpus_texts)

    def evaluate_pair(
        self,
        resume_text: str,
        resume_sections: Dict[str, str],
        resume_skills: set,
        jd_text: str,
        jd_required_skills: set,
        jd_preferred_skills: set,
        skill_extractor: SkillExtractor
    ) -> Dict[str, Any]:
        """Calculates granular match scores and composite hybrid ranking score."""
        # 1. Semantic Contextual Score (Section-Weighted)
        s_semantic = self.semantic_matcher.compute_section_weighted_similarity(resume_sections, jd_text)

        # 2. Lexical Score (Average of TF-IDF Cosine and Normalized BM25)
        s_tfidf = self.tfidf_matcher.compute_similarity(resume_text, jd_text)
        s_bm25 = self.bm25_matcher.compute_similarity(jd_text, resume_text)
        s_lexical = round(0.5 * s_tfidf + 0.5 * s_bm25, 4)

        # 3. Explicit Hard-Skill Overlap Score
        skill_metrics = skill_extractor.compute_skill_metrics(
            resume_skills=resume_skills,
            jd_required_skills=jd_required_skills,
            jd_preferred_skills=jd_preferred_skills
        )
        s_skill = skill_metrics["weighted_skill_score"]

        # Composite Tri-Partite Hybrid Score
        s_hybrid = round(
            (self.alpha * s_semantic) +
            (self.beta * s_lexical) +
            (self.gamma * s_skill),
            4
        )

        return {
            "hybrid_score": s_hybrid,
            "semantic_score": s_semantic,
            "lexical_score": s_lexical,
            "tfidf_score": round(s_tfidf, 4),
            "bm25_score": round(s_bm25, 4),
            "skill_score": s_skill,
            "skill_jaccard": skill_metrics["jaccard_similarity"],
            "required_skill_recall": skill_metrics["required_recall"],
            "matched_required_skills": skill_metrics["matched_required"],
            "missing_required_skills": skill_metrics["missing_required"],
            "matched_preferred_skills": skill_metrics["matched_preferred"],
            "missing_preferred_skills": skill_metrics["missing_preferred"]
        }

    def rank_candidates(
        self,
        resumes: List[Dict[str, Any]],
        jd: Dict[str, Any],
        skill_extractor: SkillExtractor,
        data_loader
    ) -> List[Dict[str, Any]]:
        """Ranks a list of candidate resumes against a target job description."""
        jd_text = data_loader.get_jd_full_text(jd)
        jd_required = set(s.lower() for s in jd.get("required_skills", []))
        jd_preferred = set(s.lower() for s in jd.get("preferred_skills", []))

        ranked_results = []
        for res in resumes:
            res_text = data_loader.get_resume_full_text(res)
            res_sections = self.preprocessor.extract_sections(res_text)
            
            # Extract skills from both structured field and full text
            declared_skills = set(s.lower() for s in res.get("skills", []))
            extracted_skills = skill_extractor.extract_skills_from_text(res_text)
            total_skills = declared_skills.union(extracted_skills)

            match_data = self.evaluate_pair(
                resume_text=res_text,
                resume_sections=res_sections,
                resume_skills=total_skills,
                jd_text=jd_text,
                jd_required_skills=jd_required,
                jd_preferred_skills=jd_preferred,
                skill_extractor=skill_extractor
            )

            ranked_results.append({
                "candidate_id": res["id"],
                "candidate_name": res["name"],
                "target_domain": res["target_domain"],
                "years_experience": res["years_experience"],
                **match_data
            })

        # Sort descending by hybrid_score
        ranked_results.sort(key=lambda x: x["hybrid_score"], reverse=True)
        return ranked_results
