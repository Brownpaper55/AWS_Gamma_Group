import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function NotFound() {
  return (
    <div>
      <PageHeader title="Page not found" subtitle="That page doesn't exist." />
      <Link to="/" className="text-brand-600 font-semibold underline">Go to Home</Link>
    </div>
  );
}
