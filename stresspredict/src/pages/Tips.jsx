import PageHeader from "../components/PageHeader.jsx";
import Placeholder from "../components/Placeholder.jsx";

export const meta = { title: "Tips", path: "/tips", order: 4 };

export default function Tips() {
  return (
    <div>
      <PageHeader title="Tips to Manage Your Stress" subtitle="Small habits that make a difference." />
      <Placeholder>
        <p className="font-semibold text-navy">Tips page: to be built</p>
        <p className="mt-1">
          See "Tips to Manage Your Stress" on the right of the results page in docs/prototype.png.
          It has five tips: Get Better Sleep, Stay Active, Practice Mindfulness, Stay Connected,
          Manage Your Workload. Plus the "not a medical diagnosis" note at the bottom.
        </p>
      </Placeholder>
    </div>
  );
}
