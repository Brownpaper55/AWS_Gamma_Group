"""Stress check scoring. Mirrors src/lib/stressCheck.js (version 1).

Questions, reverse flags and the version number must match the frontend.
shared/scoring-cases.json is the contract both sides are tested against.

Level thresholds are the one thing meant to change without a frontend
redeploy: set STRESS_LOW_MAX / STRESS_MODERATE_MAX in the environment.
"""
import os

STRESS_CHECK_VERSION = 1
MAX_SCORE = 16
ANSWER_MIN, ANSWER_MAX = 0, 4

# reverse=True means a HIGHER answer = LOWER stress, so it is flipped (4 - value).
QUESTIONS = (
    ("q1", False),
    ("q2", True),
    ("q3", True),
    ("q4", False),
)
QUESTION_IDS = tuple(q for q, _ in QUESTIONS)

LEVELS = ("Low", "Moderate", "High")


def _int_env(name: str, default: int) -> int:
    try:
        return int(os.environ.get(name, default))
    except ValueError:
        return default


def thresholds() -> tuple[int, int]:
    """(low_max, moderate_max): score <= low_max is Low, <= moderate_max is Moderate."""
    low = _int_env("STRESS_LOW_MAX", 5)
    moderate = _int_env("STRESS_MODERATE_MAX", 10)
    if not (0 <= low < moderate < MAX_SCORE):
        return 5, 10  # misconfigured: fall back to the defaults rather than serve nonsense
    return low, moderate


def score(answers: dict[str, int]) -> int:
    return sum((ANSWER_MAX - answers[q] if rev else answers[q]) for q, rev in QUESTIONS)


def level(total: int) -> str:
    low, moderate = thresholds()
    if total <= low:
        return "Low"
    if total <= moderate:
        return "Moderate"
    return "High"
