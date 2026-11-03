import PageHeader from "../components/PageHeader.jsx";
import {
  LuLightbulb,
  LuMoonStar,
  LuFootprints,
  LuFlower2,
  LuHeartHandshake,
  LuClipboardList,
  LuInfo,
  LuChevronDown,
} from "react-icons/lu";

export const meta = { title: "Tips", path: "/tips", order: 4 };

const TIPS = [
  {
    title: "Get Better Sleep",
    text: "Aim for 7–9 hours of quality sleep each night.",
    Icon: LuMoonStar,
    iconColor: "text-[#2f55e0]",
    details: [
      "Go to bed and wake up at the same time every day, even on weekends.",
      "Put your phone away 30 minutes before bed.",
      "Keep your room cool, dark and quiet.",
    ],
  },
  {
    title: "Stay Active",
    text: "Even short walks can help reduce stress.",
    Icon: LuFootprints,
    iconColor: "text-[#19a463]",
    details: [
      "A 10-minute walk between study or work sessions is enough to clear your head.",
      "Try stretching when you wake up or before you sleep.",
      "Pick something you enjoy, like dancing, football or cycling.",
    ],
  },
  {
    title: "Practice Mindfulness",
    text: "Try deep breathing or meditation for a few minutes daily.",
    Icon: LuFlower2,
    iconColor: "text-[#f08a00]",
    details: [
      "Sit comfortably and focus only on your breathing for 3 to 5 minutes.",
      "Breathe in for 4 seconds, hold for 4, then breathe out for 6.",
      "When your mind wanders, gently bring it back without judging yourself.",
    ],
  },
  {
    title: "Stay Connected",
    text: "Talk to friends, family, or a support network.",
    Icon: LuHeartHandshake,
    iconColor: "text-[#6b3fd4]",
    details: [
      "Message or call someone you trust, even for a short chat.",
      "Sharing what you feel often makes it feel lighter.",
      "Join a group, club or study circle so you are not carrying things alone.",
    ],
  },
  {
    title: "Manage Your Workload",
    text: "Break tasks into smaller steps and take regular breaks.",
    Icon: LuClipboardList,
    iconColor: "text-[#8a2fd0]",
    details: [
      "Write down everything you need to do, then pick the top three for today.",
      "Work in short focused blocks, for example 25 minutes of work and a 5-minute break.",
      "It is okay to say no or ask for more time when you are overloaded.",
    ],
  },
];

export default function Tips() {
  return (
    // Fills the space between navbar and footer (13rem = navbar + footer + page padding)
    <div className="flex h-[calc(100dvh-13rem)] min-h-[26rem] flex-col">
      <div className="shrink-0 [&>div]:mb-3 [&_h1]:text-2xl [&_p]:mt-1 [&_p]:text-base">
        <PageHeader title="Tips to Manage Your Stress" subtitle="Small habits that make a difference." />
      </div>

      <section className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col rounded-2xl border border-[#e3e9f6] bg-[#f7f9fe] p-3 text-[#1b2a5c] shadow-[0_4px_18px_rgba(40,70,140,0.08)] sm:p-4">
        {/* Header */}
        <header className="mb-2 flex shrink-0 items-center gap-2.5">
          <LuLightbulb className="h-5 w-5 shrink-0 text-[#1d3fbf]" aria-hidden="true" />
          <h2 className="text-base font-bold text-[#1b2f6b]">Tips to Manage Your Stress</h2>
        </header>

        {/* All tips fit in view; click one to expand it (list scrolls only if you open several) */}
        <ul className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
          {TIPS.map(({ title, text, Icon, iconColor, details }) => (
            <li key={title}>
              <details className="group rounded-lg border border-[#e6ecf8] bg-white transition duration-200 hover:shadow-md open:border-[#c3d2f7]">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 [&::-webkit-details-marker]:hidden">
                  <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-[#1b2f6b]">{title}</span>
                    <span className="block text-xs leading-snug text-[#5b6a93]">{text}</span>
                  </span>
                  <LuChevronDown
                    className="h-4 w-4 shrink-0 text-[#5b6a93] transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <ul className="list-disc space-y-0.5 pb-3 pl-10 pr-4 text-xs leading-relaxed text-[#3d4d7a]">
                  {details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>

        {/* Disclaimer */}
        <aside className="mt-2 flex shrink-0 items-start gap-2.5 rounded-lg bg-[#e6edfb] px-3 py-2">
          <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-[#3b6cf0]" aria-hidden="true" />
          <p className="text-[11px] leading-snug text-[#4a63c9]">
            This prediction is based on a machine learning model and is not a medical diagnosis. If you feel
            overwhelmed or need professional help, please consult a healthcare provider.
          </p>
        </aside>
      </section>
    </div>
  );
}
