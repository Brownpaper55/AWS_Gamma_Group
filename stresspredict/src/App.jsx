import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { pages } from "./pages/registry.js";
import NotFound from "./pages/NotFound.jsx";

/*
  You almost never need to edit this file.
  Every file in src/pages that has a `meta` export becomes a page automatically.
  See docs/ADDING_A_PAGE.md
*/
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-10">
        <Routes>
          {pages.map((p) => (
            <Route key={p.path} path={p.path} element={<p.Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
