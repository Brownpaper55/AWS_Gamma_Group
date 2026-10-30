import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Info, RotateCcw, Smile, Compass, ShieldCheck, Sparkles, Layers, ClipboardList,
} from "lucide-react";
import Button from "../components/Button.jsx";
import { QUESTIONS, MAX_SCORE, getStressLevel } from "../lib/stressCheck.js";
import { loadAssessment, clearAssessment } from "../lib/assessmentStorage.js";

export const meta = { title: "Results", path: "/results", order: 3 };

// Full class names written out so Tailwind can find them
const THEME = {
  Low: { stroke: "#0d9488", box: "border-teal-200 bg-teal-50", text: "text-teal-700" },
  Moderate: { stroke: "#059669", box: "border-green-200 bg-green-50", text: "text-green-700" },
  High: { stroke: "#e11d48", box: "border-rose-200 bg-rose-50", text: "text-rose-700" },
};

const MESSAGE = {
  Low: "Your stress looks well under control. Keep up the habits that are protecting your well-being.",
  Moderate:
    "It's not too high, but it's important to take care of yourself and manage your stress before it increases.",
  High: "Your stress is running high. Consider lowering your load, resting more and reaching out for support.",
};

// One tile per question, in the same order as QUESTIONS (q1..q4).
const TILES = [
  { title: "Sense of control", icon: Compass, tone: "bg-indigo-100 text-indigo-600" },
  { title: "Coping confidence", icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-600" },
  { title: "Things going your way", icon: Sparkles, tone: "bg-amber-100 text-amber-600" },
  { title: "Feeling overwhelmed", icon: Layers, tone: "bg-rose-100 text-rose-500" },
];

// How much one answer adds to the total (0 = least stress, 4 = most), reverse items flipped.
const contribution = (q, answers) => (q.reverse ? 4 - answers[q.id] : answers[q.id]);
const impactLabel = (c) => (c <= 1 ? "Low" : c === 2 ? "Moderate" : "High");

function Gauge({ score, level }) {
  const r = 64;
  const C = 2 * Math.PI * r;
  const arc = C * 0.75;
  return (
    <div className="relative h-44 w-44 shrink-0">
      <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
        <g transform="rotate(135 80 80)" fill="none" strokeWidth="14" strokeLinecap="round">
          <circle cx="80" cy="80" r={r} stroke="#e8edf8" strokeDasharray={`${arc} ${C}`} />
          <circle
            cx="80" cy="80" r={r}
            stroke={THEME[level].stroke}
            strokeDasharray={`${(arc * score) / MAX_SCORE} ${C}`}
            style={{ transition: "stroke-dasharray .8s ease" }}
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <Smile className={`h-6 w-6 ${THEME[level].text}`} aria-hidden="true" />
        <span className="text-xl font-bold text-navy">{level}</span>
        <span className="text-xs text-navy/60">{score} / {MAX_SCORE}</span>
      </div>
    </div>
  );
}

function Tile({ icon: Icon, tone, title, value, note }) {
  return (
    <div className="rounded-lg border border-brand-100 bg-brand-50/60 px-3 py-3 text-center">
      <span className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full ${tone}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-xs font-medium text-navy">{title}</p>
      <p className="text-xs font-semibold text-navy">{value} / 4</p>
      <p className="text-[11px] text-navy/60">({note})</p>
    </div>
  );
}

export default function Results() {
  const navigate = useNavigate();
  // null means: nothing saved, tab was closed, version changed, or answers incomplete.
  const [result] = useState(() => loadAssessment());

  function retake() {
    clearAssessment();
    navigate("/assessment");
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm">
        <ClipboardList className="mx-auto h-10 w-10 text-brand-600" aria-hidden="true" />
        <h1 className="mt-4 text-xl font-bold text-navy">No results yet</h1>
        <p className="mt-2 text-sm text-navy/70">
          Complete the short assessment to see your stress level. Results are kept only for this
          browser tab.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate("/assessment")}>Start assessment</Button>
        </div>
      </div>
    );
  }

  const { score, answers } = result;
  const level = getStressLevel(score);

  return (
    <div className="mx-auto max-w-3xl">
      <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-lg font-semibold text-navy">Your Stress Level</h1>

        <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
          <Gauge score={score} level={level} />
          <div className={`flex-1 rounded-lg border p-5 ${THEME[level].box}`}>
            <p className={`text-lg font-semibold leading-snug ${THEME[level].text}`}>
              You are experiencing a {level} level of stress.
            </p>
            <p className={`mt-2 text-sm leading-relaxed ${THEME[level].text}`}>{MESSAGE[level]}</p>
          </div>
        </div>

        <h2 className="mt-8 text-base font-semibold text-navy">Your Results Summary</h2>
        <p className="mt-1 text-xs text-navy/60">
          How much each answer adds to your score (0 = least stress, 4 = most).
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUESTIONS.map((q, i) => {
            const c = contribution(q, answers);
            return (
              <Tile key={q.id} {...TILES[i]} value={c} note={impactLabel(c)} />
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={retake}>
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Take Assessment Again
            </span>
          </Button>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-brand-100 bg-brand-50/60 p-4 text-xs text-navy/80">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            This result comes from a short screening questionnaire (the 4-item Perceived Stress
            Scale) and is not a medical diagnosis. If you feel overwhelmed or need professional
            help, please consult a healthcare provider.
          </p>
        </div>
      </section>

    </div>
  );
}
