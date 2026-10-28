import { Brain } from "lucide-react";

export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Brain className="size-8 text-teal" strokeWidth={1.75} aria-hidden="true" />
      <span className="text-xl font-bold text-navy">StressPredict</span>
    </span>
  );
}
