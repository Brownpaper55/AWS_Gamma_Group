# StressPredict API

Stateless FastAPI service. No database; nothing is stored or logged from request bodies.

```
POST /api/assess  { "version": 1, "answers": {"q1":0-4,"q2":0-4,"q3":0-4,"q4":0-4} }
                  -> { "score": 0-16, "maxScore": 16, "level": "Low|Moderate|High" }
GET  /api/health
```
Bad input -> 422, wrong `version` -> 400 (never 403/404, see CloudFront note below).

## Run locally
```
cd backend
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements-dev.txt
pytest -q
uvicorn app.main:app --reload --port 8000
```
Add to `vite.config.js` so `npm run dev` behaves like production:
```js
server: { proxy: { "/api": "http://localhost:8000" } },
```

## Tuning thresholds (no frontend redeploy)
`STRESS_LOW_MAX` (default 5) and `STRESS_MODERATE_MAX` (default 10) in `/etc/stresspredict.env`,
then `sudo systemctl restart stresspredict-api`. Invalid values fall back to the defaults.

## Deploy to EC2
`sudo bash deploy/setup-ec2.sh` from `backend/` (systemd service on port 8000, runs on reboot).

## CloudFront
1. Attach an **Elastic IP** and use the instance's public DNS name as a second origin (HTTP, port 8000).
2. Security group: allow port 8000 only from the managed prefix list `com.amazonaws.global.cloudfront.origin-facing`.
3. Behavior for path `/api/*`: caching disabled (CachingDisabled policy), all HTTP methods, origin request policy
   `AllViewerExceptHostHeader`.
4. Your SPA custom error responses (403/404 -> index.html) apply to every behavior. The API avoids those codes
   for client errors, but a missing route or a down origin (502/504) will still behave per your settings.
5. The CloudFront -> EC2 hop is plain HTTP unless you put an ALB with an ACM cert in front.

## Keeping scoring in sync
`shared/scoring-cases.json` is tested by `backend/tests` and `node shared/check-frontend-parity.mjs`.
Changing the questions or scoring means bumping `STRESS_CHECK_VERSION` in both `stressCheck.js` and `app/scoring.py`.
