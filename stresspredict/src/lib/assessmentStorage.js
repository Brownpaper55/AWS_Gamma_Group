// Saves and loads the finished assessment. This is the ONE place results are stored.
// Uses sessionStorage: it survives a page refresh and is cleared when the tab closes.
// The answers are sent once to /api/predict to be scored (see lib/api.js); the backend
// keeps no database, and the saved result lives only in this browser tab.
import { STRESS_CHECK_VERSION, MAX_SCORE, isComplete, scoreStressCheck } from "./stressCheck.js";

const KEY = "stresspredict:stress-check";

// Called by the Assessment page. Returns true if saved, false if the browser blocked storage.
// serverResult is the { score, level } from the backend, or null to use the local scoring.
export function saveAssessment(answers, serverResult = null) {
  if (!isComplete(answers)) return false;
  const data = {
    version: STRESS_CHECK_VERSION,
    answers,
    score: serverResult?.score ?? scoreStressCheck(answers),
    level: serverResult?.level,
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
