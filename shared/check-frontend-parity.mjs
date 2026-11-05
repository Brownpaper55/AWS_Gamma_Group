// Run: node shared/check-frontend-parity.mjs
// Checks src/lib/stressCheck.js against the same vectors the backend tests use.
import { readFileSync } from "node:fs";
import { STRESS_CHECK_VERSION, MAX_SCORE, scoreStressCheck, getStressLevel } from "../src/lib/stressCheck.js";

const spec = JSON.parse(readFileSync(new URL("./scoring-cases.json", import.meta.url)));
let failed = 0;
const check = (name, got, want) => {
  if (got !== want) { failed++; console.error(`FAIL ${name}: got ${got}, want ${want}`); }
};
check("version", STRESS_CHECK_VERSION, spec.version);
check("maxScore", MAX_SCORE, spec.maxScore);
for (const c of spec.cases) {
  const s = scoreStressCheck(c.answers);
  check(`score ${JSON.stringify(c.answers)}`, s, c.score);
  check(`level ${JSON.stringify(c.answers)}`, getStressLevel(s), c.level);
}
if (failed) process.exit(1);
console.log(`frontend parity OK (${spec.cases.length} cases)`);
