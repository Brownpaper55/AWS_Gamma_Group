import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import { QUESTIONS, ANSWER_OPTIONS } from "../lib/stressCheck.js";
import { saveAssessment } from "../lib/assessmentStorage.js";

export const meta = { title: "Assessment", path: "/assessment", order: 2 };

// Full class names written out so Tailwind can find them
const SLIDE = {
  forward: "animate-slide-from-right",
  back: "animate-slide-from-left",
};

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("forward"); // which way the slide animates
  const [answers, setAnswers] = useState({});
  const [saveError, setSaveError] = useState(false);

  const total = QUESTIONS.length;
  const question = QUESTIONS[step];
  const isLast = step === total - 1;
  const hasAnswer = answers[question.id] !== undefined;

  function goBack() {
    setDirection("back");
    setStep((s) => s - 1);
  }

  function goNext() {
    if (!hasAnswer) return;
    if (isLast) {
      // Saves answers + score in one place. The Results page loads it from there.
      if (saveAssessment(answers)) {
        navigate("/results");
      } else {
        setSaveError(true);
      }
      return;
    }
    setDirection("forward");
    setStep((s) => s + 1);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Stress Assessment"
        subtitle="Think about your feelings and thoughts during the last month."
      />

      <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        {/* Progress */}
        <p className="text-sm font-medium text-navy/70" aria-live="polite">
          Question {step + 1} of {total}
        </p>
        <div className="mt-2 flex gap-2" aria-hidden="true">
          {QUESTIONS.map((q, i) => (
            <div
              key={q.id}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-brand-600" : "bg-brand-100"
              }`}
            />
          ))}
        </div>

        {/* The question "slide". Changing the key replays the animation. */}
        <fieldset key={question.id} className={`mt-8 min-w-0 ${SLIDE[direction]}`}>
          <legend className="mb-6 p-0 text-xl font-bold leading-snug text-navy">
            {question.text}
          </legend>
          <div className="grid gap-3 sm:grid-cols-5">
            {ANSWER_OPTIONS.map((opt) => (
              <label key={opt.value} className="block cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={opt.value}
                  checked={answers[question.id] === opt.value}
                  onChange={() => setAnswers((a) => ({ ...a, [question.id]: opt.value }))}
                  className="peer sr-only"
                />
                <span className="flex h-14 items-center justify-center rounded-lg border border-brand-200 bg-white px-2 text-center text-xs font-medium leading-tight transition-colors hover:bg-brand-50 peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {saveError && (
          <p role="alert" className="mt-6 text-sm font-medium text-red-700">
            We couldn't save your answers. Check that your browser allows site storage, then try again.
          </p>
        )}

        {/* Back / Next */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="soft" onClick={goBack} disabled={step === 0}>
            Back
          </Button>
          <Button onClick={goNext} disabled={!hasAnswer}>
            {isLast ? "See my results" : "Next"}
          </Button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-navy/60">
        Based on the Perceived Stress Scale (Cohen, Kamarck &amp; Mermelstein, 1983).
        Not a medical diagnosis.
      </p>
    </div>
  );
}
