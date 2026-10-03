"""
Text Preprocessor and Normalization Pipeline
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Cleans, anonymizes PII, normalizes domain tokens, and extracts key sections.
"""

import re
import string
from typing import List, Dict, Any, Set

# Domain-specific stopwords that shouldn't clobber technical tokens (e.g. 'c', 'r', 'go')
STANDARD_STOPWORDS: Set[str] = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
    "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
    "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't",
    "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
    "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
    "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
    "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i",
    "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it",
    "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
    "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
    "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same",
    "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
    "some", "such", "than", "that", "that's", "the", "their", "theirs", "them",
    "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll",
    "they're", "they've", "this", "those", "through", "to", "too", "under",
    "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're",
    "we've", "were", "weren't", "what", "what's", "when", "when's", "where",
    "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with",
    "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've",
    "your", "yours", "yourself", "yourselves"
}

class Preprocessor:
    def __init__(self, preserve_tech_symbols: bool = True):
        self.preserve_tech_symbols = preserve_tech_symbols

    def anonymize_pii(self, text: str) -> str:
        """Masks emails, phone numbers, and URL hyperlinks for GDPR and fairness compliance."""
        text = re.sub(r'[\w\.-]+@[\w\.-]+\.\w+', '[EMAIL]', text)
        text = re.sub(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', '[PHONE]', text)
        text = re.sub(r'https?://\S+|www\.\S+', '[URL]', text)
        return text

    def clean_text(self, text: str) -> str:
        """Lowers text, scrubs whitespace, and anonymizes PII."""
        if not text:
            return ""
        text = self.anonymize_pii(text)
        text = text.lower()
        # Normalize non-breaking spaces and hyphens
        text = re.sub(r'[\u2010-\u2015\u2212]', '-', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def tokenize(self, text: str, remove_stopwords: bool = True) -> List[str]:
        """Domain-aware tokenization preserving compound technical terms like 'c++', 'c#', 'node.js'."""
        cleaned = self.clean_text(text)
        # Match tokens including technical tokens with symbols (+, #, ., /)
        tokens = re.findall(r'[a-zA-Z0-9]+(?:[\.\+\#\/\-][a-zA-Z0-9]+)*', cleaned)
        if remove_stopwords:
            tokens = [t for t in tokens if t not in STANDARD_STOPWORDS and len(t) > 1 or t in {'c', 'r'}]
        return tokens

    def extract_sections(self, text: str) -> Dict[str, str]:
        """Segments resume into semantic zones using header cues."""
        sections = {
            "summary": "",
            "skills": "",
            "experience": "",
            "projects": "",
            "education": "",
            "other": ""
        }
        current_section = "other"
        lines = text.split('\n')
        
        for line in lines:
            stripped = line.strip().lower()
            if any(k in stripped for k in ["summary", "profile", "about me", "objective"]):
                current_section = "summary"
            elif any(k in stripped for k in ["skill", "competenc", "tech stack", "technologies"]):
                current_section = "skills"
            elif any(k in stripped for k in ["experience", "employment", "work history", "career"]):
                current_section = "experience"
            elif any(k in stripped for k in ["project", "portfolio"]):
                current_section = "projects"
            elif any(k in stripped for k in ["education", "academic", "degree", "qualification"]):
                current_section = "education"
            
            sections[current_section] += " " + line

        for k in sections:
            sections[k] = sections[k].strip()
        return sections
