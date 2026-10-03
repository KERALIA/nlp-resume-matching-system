"""
Data Loader Module
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Handles ingestion, parsing, and structured formatting of resumes, job descriptions, and skills taxonomies.
"""

import os
import json
from typing import Dict, List, Any, Optional

class DataLoader:
    def __init__(self, data_dir: Optional[str] = None):
        if data_dir is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            self.data_dir = os.path.join(base_dir, "dataset")
        else:
            self.data_dir = data_dir

        self.resumes_path = os.path.join(self.data_dir, "resumes_corpus.json")
        self.jds_path = os.path.join(self.data_dir, "job_descriptions.json")
        self.skills_path = os.path.join(self.data_dir, "skills_taxonomy.json")

    def load_skills_taxonomy(self) -> Dict[str, List[str]]:
        """Loads technical skills grouped by category."""
        with open(self.skills_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_all_skills_flat(self) -> List[str]:
        """Returns a flat, deduplicated list of all recognized skills."""
        tax = self.load_skills_taxonomy()
        flat_skills = set()
        for cat, skills in tax.items():
            for s in skills:
                flat_skills.add(s.lower().strip())
        return sorted(list(flat_skills))

    def load_resumes(self) -> List[Dict[str, Any]]:
        """Loads the candidate resumes corpus."""
        with open(self.resumes_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def load_job_descriptions(self) -> List[Dict[str, Any]]:
        """Loads curated job descriptions with ground truth relevance annotations."""
        with open(self.jds_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_resume_full_text(self, resume: Dict[str, Any]) -> str:
        """Flattens a structured resume into a coherent contextual text representation."""
        parts = []
        if resume.get("summary"):
            parts.append(f"Professional Summary: {resume['summary']}")
        if resume.get("skills"):
            parts.append(f"Technical Competencies: {', '.join(resume['skills'])}")
        if resume.get("experience"):
            parts.append("Professional Experience: " + " ".join(resume["experience"]))
        if resume.get("projects"):
            parts.append("Key Projects: " + " ".join(resume["projects"]))
        if resume.get("education"):
            parts.append(f"Academic Background: {resume['education']}")
        return " \n".join(parts)

    def get_jd_full_text(self, jd: Dict[str, Any]) -> str:
        """Flattens a job description into a coherent contextual text representation."""
        parts = [
            f"Job Title: {jd.get('title', '')}",
            f"Domain: {jd.get('domain', '')}",
            f"Minimum Experience: {jd.get('min_experience_years', 0)} years",
            f"Mandatory Technical Skills: {', '.join(jd.get('required_skills', []))}",
            f"Preferred Skills: {', '.join(jd.get('preferred_skills', []))}",
            f"Job Overview & Responsibilities: {jd.get('description', '')}"
        ]
        return " \n".join(parts)
