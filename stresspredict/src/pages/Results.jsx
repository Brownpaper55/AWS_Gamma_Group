import PageHeader from "../components/PageHeader.jsx";
import Placeholder from "../components/Placeholder.jsx";

export const meta = { title: "Results", path: "/results", order: 3 };

export default function Results() {
  return (
    <div>
      <PageHeader title="Your Stress Level" subtitle="Based on your answers." />
      <Placeholder>
        <p className="font-semibold text-navy">Results page: to be built</p>
        <p className="mt-1">
          See "3. Results Page" in docs/prototype.png. It has the stress level gauge, a short
          message, a results summary (sleep, workload, mood, activity), and a "Take Assessment Again" button.
        </p>
      </Placeholder>
    </div>
  );
}
