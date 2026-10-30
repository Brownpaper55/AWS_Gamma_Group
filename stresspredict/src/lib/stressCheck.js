// THE SINGLE SOURCE OF TRUTH for the stress check questions and scoring.
// Based on the Perceived Stress Scale (4-item version):
// Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress.
// Journal of Health and Social Behavior, 24, 385-396.
//
// Nobody should re-implement the scoring anywhere else. Import it from here.

export const STRESS_CHECK_VERSION = 1;
export const MAX_SCORE = 16;

// The saved value is the position of the answer, left to right: Never = 0 ... Very often = 4.
export const ANSWER_OPTIONS = [
  { value: 0, label: "Never" },
  { value: 1, label: "Almost never" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Fairly often" },
  { value: 4, label: "Very often" },
];

// reverse: true means a HIGHER answer = LOWER stress, so the score is flipped (4 - value).
export const QUESTIONS = [
  {
    id: "q1",
    text: "In the last month, how often have you felt that you were unable to control the important things in your life?",
    reverse: false,
  },
  {
    id: "q2",
    text: "In the last month, how often have you felt confident about your ability to handle your personal problems?",
    reverse: true,
  },
  {
    id: "q3",
    text: "In the last month, how often have you felt that things were going your way?",
    reverse: true,
  },
  {
    id: "q4",
    text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
    reverse: false,
  },
];

// answers looks like { q1: 0-4, q2: 0-4, q3: 0-4, q4: 0-4 }
export function isComplete(answers) {
  return (
    !!answers &&
    QUESTIONS.every((q) => Number.isInteger(answers[q.id]) && answers[q.id] >= 0 && answers[q.id] <= 4)
  );
}

// Returns a number from 0 to 16. Higher = more perceived stress.
export function scoreStressCheck(answers) {
  return QUESTIONS.reduce((sum, q) => sum + (q.reverse ? 4 - answers[q.id] : answers[q.id]), 0);
}

// [Guessing] Placeholder bands (roughly equal thirds of 0-16). Agree these with the team.
export function getStressLevel(score) {
  if (score <= 5) return "Low";
  if (score <= 10) return "Moderate";
  return "High";
}
