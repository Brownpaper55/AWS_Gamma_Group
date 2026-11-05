// Talks to the Python backend. The path is RELATIVE on purpose: CloudFront routes
// /api/* to the backend, so the browser only ever sees your own domain (no CORS,
// no mixed-content problems). Do not put the ALB or EC2 address here.
import { STRESS_CHECK_VERSION } from "./stressCheck.js";

const LEVELS = ["Low", "Moderate", "High"];
const TIMEOUT_MS = 8000;

// Sends the answers to the backend. Resolves with { score, maxScore, level }.
// Throws on any problem (network, timeout, non-200, HTML instead of JSON, bad shape),
// so the caller can fall back to the local scoring in stressCheck.js.
export async function predictStress(answers) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("/api/assess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version: STRESS_CHECK_VERSION, answers }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json(); // throws if CloudFront sent back index.html
    if (typeof data?.score !== "number" || !LEVELS.includes(data?.level)) {
      throw new Error("Unexpected API response");
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}
