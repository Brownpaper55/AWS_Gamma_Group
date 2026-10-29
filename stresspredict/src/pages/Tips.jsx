import PageHeader from "../components/PageHeader.jsx";
import Placeholder from "../components/Placeholder.jsx";
import {
  LuLightbulb,
  LuMoonStar,
  LuFootprints,
  LuFlower2,
  LuHeartHandshake,
  LuClipboardList,
  LuInfo,
  LuChevronDown,
  LuCheck,
} from "react-icons/lu";

export const meta = { title: "Tips", path: "/tips", order: 4 };

export default function Tips() {
  return (
    <div>
         <PageHeader title="Tips to Manage Your Stress" subtitle="Small habits that make a difference." />
      <Placeholder>
       
        <section className="w-full max-w-2xl rounded-2xl border border-[#e3e9f6] bg-[#f7f9fe] p-4 text-[#1b2a5c] shadow-[0_4px_18px_rgba(40,70,140,0.08)] sm:p-8">
          {/* Header */}
          <header className="mb-6 flex items-center gap-3.5">
            <LuLightbulb className="h-7 w-7 shrink-0 text-[#1d3fbf]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#1b2f6b]">Tips to Manage Your Stress</h2>
          </header>

          {/* Tips: click a tip to expand it, tick the circle once you've tried it */}
          <ul className="flex flex-col gap-2.5">
            {[
              {
                title: "Get Better Sleep",
                text: "Aim for 7–9 hours of quality sleep each night.",
                Icon: LuMoonStar,
                iconBg: "bg-[#dce5fb]",
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
                iconBg: "bg-[#d6f0e2]",
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
                iconBg: "bg-[#fde9cc]",
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
                iconBg: "bg-[#e6e3fa]",
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
                iconBg: "bg-[#eadcf7]",
                iconColor: "text-[#8a2fd0]",
                details: [
                  "Write down everything you need to do, then pick the top three for today.",
                  "Work in short focused blocks, for example 25 minutes of work and a 5-minute break.",
                  "It is okay to say no or ask for more time when you are overloaded.",
                ],
              },
            ].map(({ title, text, Icon, iconBg, iconColor, details }) => (
              <li key={title} className="relative">
                <details className="group rounded-xl border border-[#e6ecf8] bg-white transition duration-200 hover:-translate-y-px hover:shadow-md open:border-[#c3d2f7]">
                  <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl p-3.5 pr-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:gap-4 [&::-webkit-details-marker]:hidden">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-110 ${iconBg} ${iconColor}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="mb-0.5 block text-[0.95rem] font-bold text-[#1b2f6b]">{title}</span>
                      <span className="block text-sm leading-snug text-[#5b6a93]">{text}</span>
                    </span>
                    <LuChevronDown
                      className="h-5 w-5 shrink-0 text-[#5b6a93] transition-transform duration-300 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>

                  <ul className="list-disc space-y-1 pb-4 pl-12 pr-5 text-sm leading-relaxed text-[#3d4d7a] sm:pl-[88px]">
                    {details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </details>

                {/* "Tried it" tick, kept outside the summary so it doesn't open the tip */}
                <label className="absolute right-3.5 top-[22px] cursor-pointer" title="Mark as tried">
                  <input type="checkbox" className="peer sr-only" aria-label={`Mark "${title}" as tried`} />
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#c9d4ee] bg-white text-transparent transition hover:border-[#19a463] active:scale-90 peer-checked:border-[#19a463] peer-checked:bg-[#19a463] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400">
                    <LuCheck className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                </label>
              </li>
            ))}
          </ul>

          {/* Disclaimer */}
          <aside className="mt-6 flex items-start gap-4 rounded-xl bg-[#e6edfb] px-5 py-4">
            <LuInfo className="mt-0.5 h-5 w-5 shrink-0 text-[#3b6cf0]" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-[#4a63c9]">
              This prediction is based on a machine learning model and is not a medical diagnosis. If you feel
              overwhelmed or need professional help, please consult a healthcare provider.
            </p>
          </aside>
        </section>
      </Placeholder>
    </div>
  );
}
