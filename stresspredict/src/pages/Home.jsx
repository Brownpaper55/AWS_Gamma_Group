import PageHeader from "../components/PageHeader.jsx";
import Placeholder from "../components/Placeholder.jsx";

export const meta = { title: "Home", path: "/", order: 1 };

export default function Home() {
  return (
    <div>
      <PageHeader title="Discover Your Stress Level" subtitle="Better Insights. Healthier You." />
      <Placeholder>
        <p className="font-semibold text-navy">Home page: to be built</p>
        <p className="mt-1">
          See "1. Home Page" in docs/prototype.png. It has a headline, a short intro,
          a "Start Assessment" button, an illustration, and four feature cards.
        </p>
      </Placeholder>
    </div>
  );
}
