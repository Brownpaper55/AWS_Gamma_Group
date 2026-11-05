"""StressPredict assessment API. Stateless: nothing is stored, no database."""
from typing import Annotated

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field, StrictInt

from . import scoring

Answer = Annotated[StrictInt, Field(ge=scoring.ANSWER_MIN, le=scoring.ANSWER_MAX)]


class Answers(BaseModel):
    model_config = ConfigDict(extra="forbid")
    q1: Answer
    q2: Answer
    q3: Answer
    q4: Answer


class AssessRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    version: StrictInt
    answers: Answers


class AssessResponse(BaseModel):
    score: int
    maxScore: int
    level: str


# Docs live under /api so a CloudFront "/api/*" behavior can reach them.
app = FastAPI(
    title="StressPredict API",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url=None,
)


@app.middleware("http")
async def no_store(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store"
    return response


# Bad input is always 400/422, never 403/404: CloudFront's SPA error pages
# rewrite 403/404 into index.html, which would hide the API's JSON error.
@app.exception_handler(RequestValidationError)
async def validation_error(_: Request, exc: RequestValidationError):
    # Report only where the problem is, never echo the submitted values.
    problems = [{"field": ".".join(str(p) for p in e["loc"][1:]), "problem": e["type"]} for e in exc.errors()]
    return JSONResponse(status_code=422, content={"error": "invalid_request", "details": problems})


@app.get("/api/health")
def health():
    return {"status": "ok", "version": scoring.STRESS_CHECK_VERSION}


@app.post("/api/assess", response_model=AssessResponse)
def assess(req: AssessRequest):
    if req.version != scoring.STRESS_CHECK_VERSION:
        raise HTTPException(
            status_code=400,
            detail={"error": "unsupported_version", "supported": scoring.STRESS_CHECK_VERSION},
        )
    total = scoring.score(req.answers.model_dump())
    return AssessResponse(score=total, maxScore=scoring.MAX_SCORE, level=scoring.level(total))
