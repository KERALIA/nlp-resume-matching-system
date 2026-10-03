"""
Evaluation Suite Module (Precision@K, Recall@K, MRR, NDCG@K, Latency)
Author: Patel Aum Shirishkumar (En. No: 12302040601004)
Calculates information retrieval metrics and generates ablation comparison tables.
"""

import math
import time
from typing import List, Dict, Any

class Evaluator:
    @staticmethod
    def precision_at_k(ranked_ids: List[str], ground_truth: Dict[str, int], k: int, threshold: int = 2) -> float:
        """Precision@K: Proportion of top-K recommendations that are relevant (rel >= threshold)."""
        top_k = ranked_ids[:k]
        if not top_k:
            return 0.0
        relevant_count = sum(1 for cid in top_k if ground_truth.get(cid, 0) >= threshold)
        return round(relevant_count / len(top_k), 4)

    @staticmethod
    def recall_at_k(ranked_ids: List[str], ground_truth: Dict[str, int], k: int, threshold: int = 2) -> float:
        """Recall@K: Proportion of all relevant candidates retrieved in the top-K list."""
        top_k = ranked_ids[:k]
        total_relevant = sum(1 for cid, rel in ground_truth.items() if rel >= threshold)
        if total_relevant == 0:
            return 1.0
        relevant_in_top_k = sum(1 for cid in top_k if ground_truth.get(cid, 0) >= threshold)
        return round(relevant_in_top_k / total_relevant, 4)

    @staticmethod
    def mean_reciprocal_rank(ranked_ids: List[str], ground_truth: Dict[str, int], threshold: int = 2) -> float:
        """MRR: 1 / rank of the first relevant candidate."""
        for rank, cid in enumerate(ranked_ids, start=1):
            if ground_truth.get(cid, 0) >= threshold:
                return round(1.0 / rank, 4)
        return 0.0

    @staticmethod
    def dcg_at_k(ranked_ids: List[str], ground_truth: Dict[str, int], k: int) -> float:
        """Discounted Cumulative Gain at rank K using standard logarithmic discounting."""
        dcg = 0.0
        for i, cid in enumerate(ranked_ids[:k], start=1):
            rel = ground_truth.get(cid, 0)
            dcg += (2**rel - 1) / math.log2(i + 1)
        return dcg

    @classmethod
    def ndcg_at_k(cls, ranked_ids: List[str], ground_truth: Dict[str, int], k: int) -> float:
        """Normalized Discounted Cumulative Gain (NDCG@K) with ideal DCG baseline."""
        actual_dcg = cls.dcg_at_k(ranked_ids, ground_truth, k)
        # Compute Ideal DCG (sort ground truth candidates by true relevance descending)
        ideal_ids = sorted(ground_truth.keys(), key=lambda cid: ground_truth[cid], reverse=True)
        ideal_dcg = cls.dcg_at_k(ideal_ids, ground_truth, k)
        if ideal_dcg == 0.0:
            return 1.0
        return round(actual_dcg / ideal_dcg, 4)

    @classmethod
    def evaluate_ranking_run(cls, ranked_ids: List[str], ground_truth: Dict[str, int]) -> Dict[str, float]:
        """Computes comprehensive suite of IR metrics for a single query."""
        return {
            "P@1": cls.precision_at_k(ranked_ids, ground_truth, k=1),
            "P@3": cls.precision_at_k(ranked_ids, ground_truth, k=3),
            "P@5": cls.precision_at_k(ranked_ids, ground_truth, k=5),
            "R@3": cls.recall_at_k(ranked_ids, ground_truth, k=3),
            "R@5": cls.recall_at_k(ranked_ids, ground_truth, k=5),
            "MRR": cls.mean_reciprocal_rank(ranked_ids, ground_truth),
            "NDCG@3": cls.ndcg_at_k(ranked_ids, ground_truth, k=3),
            "NDCG@5": cls.ndcg_at_k(ranked_ids, ground_truth, k=5)
        }
