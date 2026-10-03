"""
Baseline Lexical Matcher Module (TF-IDF & Okapi BM25)
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Provides standard information retrieval baselines using classical lexical vector space models.
"""

import math
from typing import List, Dict, Tuple, Set
from collections import Counter
from .preprocessor import Preprocessor

class TFIDFMatcher:
    def __init__(self):
        self.preprocessor = Preprocessor()
        self.vocabulary: Dict[str, int] = {}
        self.idf: Dict[str, float] = {}
        self.doc_count: int = 0

    def fit(self, corpus: List[str]):
        """Fits vocabulary and computes document frequency / IDF values."""
        self.doc_count = len(corpus)
        df = Counter()
        for doc in corpus:
            tokens = set(self.preprocessor.tokenize(doc))
            for t in tokens:
                df[t] += 1
        
        self.vocabulary = {term: idx for idx, term in enumerate(sorted(df.keys()))}
        # Smoothed inverse document frequency: ln((N + 1) / (DF + 1)) + 1
        for term, count in df.items():
            self.idf[term] = math.log((self.doc_count + 1) / (count + 1)) + 1.0

    def transform(self, doc: str) -> Dict[str, float]:
        """Transforms document into normalized TF-IDF vector dict."""
        tokens = self.preprocessor.tokenize(doc)
        tf = Counter(tokens)
        vec = {}
        total_tokens = len(tokens) if len(tokens) > 0 else 1
        for term, count in tf.items():
            if term in self.idf:
                # Sub-linear term frequency scaling: 1 + log(tf)
                sublinear_tf = 1.0 + math.log(count) if count > 0 else 0
                vec[term] = sublinear_tf * self.idf[term]
        
        # L2 normalization
        norm = math.sqrt(sum(v ** 2 for v in vec.values()))
        if norm > 0:
            for k in vec:
                vec[k] /= norm
        return vec

    def compute_similarity(self, doc1: str, doc2: str) -> float:
        """Computes cosine similarity between two documents."""
        v1 = self.transform(doc1)
        v2 = self.transform(doc2)
        dot_product = sum(v1.get(t, 0.0) * v2.get(t, 0.0) for t in v1)
        return max(0.0, min(1.0, dot_product))


class BM25Matcher:
    def __init__(self, k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.preprocessor = Preprocessor()
        self.corpus_docs: List[List[str]] = []
        self.doc_lengths: List[int] = []
        self.avg_doc_len: float = 0.0
        self.df: Counter = Counter()
        self.idf: Dict[str, float] = {}
        self.N: int = 0

    def fit(self, corpus: List[str]):
        """Fits BM25 index on a document collection."""
        self.N = len(corpus)
        self.corpus_docs = [self.preprocessor.tokenize(doc) for doc in corpus]
        self.doc_lengths = [len(doc) for doc in self.corpus_docs]
        self.avg_doc_len = sum(self.doc_lengths) / self.N if self.N > 0 else 1.0

        for doc in self.corpus_docs:
            for term in set(doc):
                self.df[term] += 1

        # Robertson-Spärck Jones IDF formula with floor clipping at 0.01
        for term, freq in self.df.items():
            val = math.log((self.N - freq + 0.5) / (freq + 0.5) + 1.0)
            self.idf[term] = max(0.01, val)

    def score_document(self, query: str, doc_tokens: List[str], doc_len: int) -> float:
        """Computes BM25 score of a single document against a query."""
        query_tokens = self.preprocessor.tokenize(query)
        doc_tf = Counter(doc_tokens)
        score = 0.0

        for qt in query_tokens:
            if qt in self.idf:
                f = doc_tf.get(qt, 0)
                numerator = f * (self.k1 + 1.0)
                denominator = f + self.k1 * (1.0 - self.b + self.b * (doc_len / self.avg_doc_len))
                score += self.idf[qt] * (numerator / denominator)

        return score

    def compute_similarity(self, query: str, doc: str) -> float:
        """Computes normalized BM25 score between a query and a document."""
        tokens = self.preprocessor.tokenize(doc)
        raw_score = self.score_document(query, tokens, len(tokens))
        # Self-score normalization to bound within [0, 1]
        query_self_score = self.score_document(query, self.preprocessor.tokenize(query), len(self.preprocessor.tokenize(query)))
        if query_self_score > 0:
            return round(min(1.0, raw_score / query_self_score), 4)
        return 0.0
