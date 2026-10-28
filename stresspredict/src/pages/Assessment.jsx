import PageHeader from "../components/PageHeader.jsx";
import Placeholder from "../components/Placeholder.jsx";

export const meta = { title: "Assessment", path: "/assessment", order: 2 };

export default function Assessment() {
  return (
    <div>
      <PageHeader
        title="Stress Assessment"
        subtitle="Please answer the following questions about your current lifestyle and well-being."
      />
      <Placeholder>
        <p className="font-semibold text-navy">Assessment page: to be built</p>
        <p className="mt-1">
          See "2. Questionnaire Page" in docs/prototype.png. It has a 4-step progress bar
          (Personal Info, Lifestyle, Mental Health, Review), the questions, and Back / Next buttons.
        </p>
      </Placeholder>
    </div>
  );
}
