import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)
CASES = json.loads((Path(__file__).resolve().parents[2] / "shared" / "scoring-cases.json").read_text())
GOOD = {"version": 1, "answers": {"q1": 1, "q2": 2, "q3": 3, "q4": 1}}


def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200 and r.json()["status"] == "ok"


@pytest.mark.parametrize("case", CASES["cases"])
def test_shared_cases(case):
    r = client.post("/api/assess", json={"version": CASES["version"], "answers": case["answers"]})
    assert r.status_code == 200
    assert r.json() == {"score": case["score"], "maxScore": CASES["maxScore"], "level": case["level"]}


def test_no_store_header():
    assert client.post("/api/assess", json=GOOD).headers["cache-control"] == "no-store"


@pytest.mark.parametrize(
    "body",
    [
        {"version": 1, "answers": {"q1": 1, "q2": 2, "q3": 3}},                      # missing
        {"version": 1, "answers": {"q1": 5, "q2": 2, "q3": 3, "q4": 1}},             # too high
        {"version": 1, "answers": {"q1": -1, "q2": 2, "q3": 3, "q4": 1}},            # too low
        {"version": 1, "answers": {"q1": 1.5, "q2": 2, "q3": 3, "q4": 1}},           # float
        {"version": 1, "answers": {"q1": "1", "q2": 2, "q3": 3, "q4": 1}},           # string
        {"version": 1, "answers": {"q1": True, "q2": 2, "q3": 3, "q4": 1}},          # bool
        {"version": 1, "answers": {"q1": 1, "q2": 2, "q3": 3, "q4": 1, "q5": 0}},    # extra
        {"answers": {"q1": 1, "q2": 2, "q3": 3, "q4": 1}},                           # no version
        {},
    ],
)
def test_invalid_is_422(body):
    r = client.post("/api/assess", json=body)
    assert r.status_code == 422
    assert r.json()["error"] == "invalid_request"


def test_invalid_does_not_echo_values():
    r = client.post("/api/assess", json={"version": 1, "answers": {"q1": "secret", "q2": 2, "q3": 3, "q4": 1}})
    assert "secret" not in r.text


def test_wrong_version_is_400():
    r = client.post("/api/assess", json={**GOOD, "version": 2})
    assert r.status_code == 400
    assert r.json()["detail"]["error"] == "unsupported_version"


def test_thresholds_tunable_via_env(monkeypatch):
    monkeypatch.setenv("STRESS_LOW_MAX", "3")
    monkeypatch.setenv("STRESS_MODERATE_MAX", "7")
    r = client.post("/api/assess", json=GOOD)  # score 5
    assert r.json()["level"] == "Moderate"


def test_bad_threshold_env_falls_back(monkeypatch):
    monkeypatch.setenv("STRESS_LOW_MAX", "12")
    monkeypatch.setenv("STRESS_MODERATE_MAX", "3")
    assert client.post("/api/assess", json=GOOD).json()["level"] == "Low"  # defaults: 5 -> Low
