#!/usr/bin/env bash
# One-time setup on a fresh Amazon Linux 2023 / Ubuntu EC2 instance. Run as root from the repo's backend/ dir.
set -euo pipefail
id stresspredict >/dev/null 2>&1 || useradd --system --home /opt/stresspredict --shell /usr/sbin/nologin stresspredict
mkdir -p /opt/stresspredict
rm -rf /opt/stresspredict/backend
cp -r "$(pwd)" /opt/stresspredict/backend
python3 -m venv /opt/stresspredict/venv
/opt/stresspredict/venv/bin/pip install -r /opt/stresspredict/backend/requirements.txt
chown -R stresspredict: /opt/stresspredict
cp deploy/stresspredict-api.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now stresspredict-api
systemctl restart stresspredict-api
curl -fsS http://127.0.0.1:8000/api/health && echo
