// HOW TO USE THIS FILE
// 1. Copy it into src/pages/ and rename it, e.g. Contact.jsx
// 2. Change the three things marked CHANGE ME
// 3. Save. Your page appears in the menu automatically.
import PageHeader from "../components/PageHeader.jsx";

// CHANGE ME (1): the menu name, the web address, and the position in the menu
export const meta = { title: "My Page", path: "/my-page", order: 10 };

// CHANGE ME (2): rename to match your file name
export default function MyPage() {
  return (
    <div>
      {/* CHANGE ME (3): your title and subtitle */}
      <PageHeader title="My page title" subtitle="One short sentence about this page." />

      {/* Build your page below. */}
      <p className="text-lg">Start writing here.</p>
    </div>
  );
}
