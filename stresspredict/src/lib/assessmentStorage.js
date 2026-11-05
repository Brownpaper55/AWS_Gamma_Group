// Scores, saves and loads the finished assessment. This is the ONE place results are stored.
// Answers are sent to the assessment API, which scores them and stores nothing. The result is kept
// in sessionStorage: it survives a page refresh and is cleared when the tab closes.
// If the API is unreachable we score locally with stressCheck.js so the site keeps working.
import {
  STRESS_CHECK_VERSION,
  MAX_SCORE,
  isComplete,
  scoreStressCheck,
  getStressLevel,
} from "./stressCheck.js";

const KEY = "stresspredict:stress-check";

const API_URL = "/api/assess";
const API_TIMEOUT_MS = 8000;
const LEVELS = ["Low", "Moderate", "High"];

// Asks the API for the score. Returns { score, maxScore, level } or null on any failure.
async function scoreOnServer(answers) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version: STRESS_CHECK_VERSION, answers }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const valid =
      Number.isInteger(data?.score) &&
      Number.isInteger(data?.maxScore) &&
      data.score >= 0 &&
      data.score <= data.maxScore &&
      LEVELS.includes(data?.level);
    return valid ? { score: data.score, maxScore: data.maxScore, level: data.level } : null;
  } catch {
    return null; // offline, timeout, HTML error page, bad JSON...
  } finally {
    clearTimeout(timer);
  }
}

function scoreLocally(answers) {
  const score = scoreStressCheck(answers);
  return { score, maxScore: MAX_SCORE, level: getStressLevel(score) };
}

// Called by the Assessment page. Resolves true if saved, false if the answers are incomplete
// or the browser blocked storage.
export async function submitAssessment(answers) {
  if (!isComplete(answers)) return false;
  const result = (await scoreOnServer(answers)) ?? scoreLocally(answers);
  const data = {
    version: STRESS_CHECK_VERSION,
    answers,
    ...result,
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
