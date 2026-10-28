import PageHeader from "../components/PageHeader.jsx";
import Placeholder from "../components/Placeholder.jsx";

export const meta = { title: "About", path: "/about", order: 5 };

export default function About() {
  return (
    <div>
      <PageHeader title="About StressPredict" subtitle="What this tool is and how it works." />
      <Placeholder>
        <p className="font-semibold text-navy">About page: to be built</p>
        <p className="mt-1">Not in the prototype yet. Agree the content with the team lead.</p>
      </Placeholder>
    </div>
  );
}
