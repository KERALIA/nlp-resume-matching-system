"""
Skill & Entity Extractor Module
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Performs n-gram taxonomic matching and computes skill overlap metrics and skill gap diagnostics.
"""

import re
from typing import Set, List, Dict, Tuple, Any

class SkillExtractor:
    def __init__(self, taxonomy: Dict[str, List[str]]):
        self.taxonomy = taxonomy
        # Flatten and sort by length descending to match longest phrases first (e.g., 'natural language processing' before 'processing')
        all_skills = set()
        for cat, skills in taxonomy.items():
            for s in skills:
                all_skills.add(s.lower().strip())
        self.skills_list = sorted(list(all_skills), key=lambda x: len(x), reverse=True)

    def extract_skills_from_text(self, text: str) -> Set[str]:
        """Extracts recognized technical skills from free-form text using phrase boundary matching."""
        if not text:
            return set()
        
        found_skills = set()
        lower_text = " " + text.lower() + " "
        # Replace punctuation that is not part of code symbols with spaces
        normalized_text = re.sub(r'[,;:!\?\(\)\[\]\{\}]', ' ', lower_text)

        for skill in self.skills_list:
            # Word boundary regex ensuring we don't match substring of larger words
            # Special handling for c++, c#, .js, etc.
            escaped_skill = re.escape(skill)
            pattern = rf'(?:^|[\s\/\(\)]){escaped_skill}(?:$|[\s\/\,\.\;\:\)])'
            if re.search(pattern, normalized_text):
                found_skills.add(skill)

        return found_skills

    def compute_skill_metrics(self, resume_skills: Set[str], jd_required_skills: Set[str], jd_preferred_skills: Set[str] = None) -> Dict[str, Any]:
        """Computes Jaccard similarity, recall on required skills, and identifies skill gaps."""
        if jd_preferred_skills is None:
            jd_preferred_skills = set()

        all_jd_skills = jd_required_skills.union(jd_preferred_skills)
        matched_required = resume_skills.intersection(jd_required_skills)
        matched_preferred = resume_skills.intersection(jd_preferred_skills)
        all_matched = resume_skills.intersection(all_jd_skills)
        
        missing_required = jd_required_skills - resume_skills
        missing_preferred = jd_preferred_skills - resume_skills

        # Jaccard index
        union_all = resume_skills.union(all_jd_skills)
        jaccard = len(all_matched) / len(union_all) if len(union_all) > 0 else 0.0

        # Required skill recall (Containment)
        req_recall = len(matched_required) / len(jd_required_skills) if len(jd_required_skills) > 0 else 0.0

        # Weighted skill score (required skills weighted 75%, preferred 25%)
        pref_recall = len(matched_preferred) / len(jd_preferred_skills) if len(jd_preferred_skills) > 0 else 1.0
        weighted_skill_score = (0.75 * req_recall) + (0.25 * pref_recall)

        return {
            "jaccard_similarity": round(jaccard, 4),
            "required_recall": round(req_recall, 4),
            "weighted_skill_score": round(weighted_skill_score, 4),
            "matched_required": sorted(list(matched_required)),
            "missing_required": sorted(list(missing_required)),
            "matched_preferred": sorted(list(matched_preferred)),
            "missing_preferred": sorted(list(missing_preferred))
        }
