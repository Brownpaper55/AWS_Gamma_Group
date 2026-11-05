import {
  Users, Brain, Sparkles, HeartPulse, Lightbulb,
  ClipboardCheck, Gauge, Lock, Info,
} from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";

export const meta = { title: "About", path: "/about", order: 5 };

// Small icons that float around the team icon
const ORBIT = [
  { Icon: Brain, pos: "-left-6 top-4", tone: "bg-teal/15 text-teal", delay: "0s" },
  { Icon: Sparkles, pos: "-right-6 top-10", tone: "bg-amber-100 text-amber-500", delay: "0.8s" },
  { Icon: HeartPulse, pos: "-left-2 bottom-2", tone: "bg-rose-100 text-rose-500", delay: "1.6s" },
  { Icon: Lightbulb, pos: "-right-3 bottom-0", tone: "bg-brand-100 text-brand-600", delay: "2.4s" },
];

// "What the app does" notes
const NOTES = [
  {
    Icon: ClipboardCheck,
    tone: "bg-brand-100 text-brand-600",
    title: "A short stress check",
    text: "You answer 4 quick questions about how you have felt over the last month, from Never to Very often.",
  },
  {
    Icon: Gauge,
    tone: "bg-teal/15 text-teal",
    title: "A clear result",
    text: "Your answers are scored from 0 to 16 and shown as a Low, Moderate or High stress level, with a breakdown of what contributed.",
  },
  {
    Icon: Lightbulb,
    tone: "bg-amber-100 text-amber-500",
    title: "Practical tips",
    text: "Get simple habits for sleep, movement, mindfulness, connection and workload to help you manage stress.",
  },
  {
    Icon: Lock,
    tone: "bg-rose-100 text-rose-500",
    title: "Private by design",
    text: "Your answers are sent over an encrypted connection to be scored, and are not stored or logged. Your result stays in your browser tab only and is cleared when you close it.",
  },
];

export default function About() {
  return (
    <div>
      <PageHeader title="About StressPredict" subtitle="What this tool is and how it works." />

      <section className="relative overflow-hidden rounded-3xl border border-brand-100 bg-white px-6 py-14 text-center shadow-sm">
        {/* soft background glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-100/70 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto h-56 w-56">
          {/* pulsing rings */}
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-200/50 [animation-duration:3s]" aria-hidden="true" />
          <span className="absolute inset-4 rounded-full border-2 border-dashed border-brand-200" aria-hidden="true" />

          {/* the big team icon */}
          <div className="absolute inset-8 grid place-items-center rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-teal shadow-xl shadow-brand-600/30">
            <Users className="h-24 w-24 text-white" strokeWidth={1.5} aria-label="Team icon" />
          </div>

          {ORBIT.map(({ Icon, pos, tone, delay }) => (
            <span
              key={pos}
              className={`absolute ${pos} grid h-11 w-11 animate-float place-items-center rounded-full shadow-md ${tone}`}
              style={{ animationDelay: delay }}
              aria-hidden="true"
            >
              <Icon className="h-5 w-5" />
            </span>
          ))}
        </div>

        <h2 className="relative mt-8 bg-gradient-to-r from-brand-600 via-brand-500 to-teal bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          AWS gamma group
        </h2>
        <div className="relative mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-brand-500 to-teal" aria-hidden="true" />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-navy">What StressPredict does</h2>
        <p className="mt-2 text-navy/70">
          StressPredict is a quick, friendly way to check in on how stressed you feel and what to do
          about it.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {NOTES.map(({ Icon, tone, title, text }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${tone}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy/70">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-navy/70">
          The questions come from the 4-item Perceived Stress Scale (Cohen, Kamarck &amp; Mermelstein,
          1983), a widely used screening questionnaire.
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-4 text-xs text-navy/80">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            StressPredict is NOT a medical diagnosis and is for informational purposes only. If you
            feel overwhelmed or need professional help, please consult a healthcare provider.
          </p>
        </div>
      </section>
    </div>
  );
}
