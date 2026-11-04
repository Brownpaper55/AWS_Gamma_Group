// Saves and loads the finished assessment. This is the ONE place results are stored.
// Uses sessionStorage: it survives a page refresh, is cleared when the tab closes,
// and the data never leaves the user's device.
import { STRESS_CHECK_VERSION, MAX_SCORE, isComplete, scoreStressCheck } from "./stressCheck.js";

const KEY = "stresspredict:stress-check";

// Called by the Assessment page. Returns true if saved, false if the browser blocked storage.
export function saveAssessment(answers) {
  if (!isComplete(answers)) return false;
  const data = {
    version: STRESS_CHECK_VERSION,
    answers,
    score: scoreStressCheck(answers),
    maxScore: MAX_SCORE,
    completedAt: new Date().toISOString(),
  };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

// Called by the Results page. Returns the saved object, or null if there is nothing valid to show.
export function loadAssessment() {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data?.version !== STRESS_CHECK_VERSION || !isComplete(data.answers)) return null;
    return data;
  } catch {
    return null;
  }
}

// Optional: call this if "Take Assessment Again" should wipe the old result.
export function clearAssessment() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
