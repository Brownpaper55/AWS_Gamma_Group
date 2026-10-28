import { NavLink, Link } from "react-router-dom";
import { pages } from "../pages/registry.js";
import Logo from "./Logo.jsx";

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-brand-100">
      <nav
        className="mx-auto max-w-5xl px-5 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3"
        aria-label="Main"
      >
        <Link to="/" aria-label="StressPredict home">
          <Logo />
        </Link>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
          {pages
            .filter((p) => !p.hideFromNav)
            .map((p) => (
              <li key={p.path}>
                <NavLink
                  to={p.path}
                  className={({ isActive }) =>
                    `block py-1 text-sm font-medium border-b-2 transition-colors ${
                      isActive
                        ? "border-brand-600 text-brand-600"
                        : "border-transparent text-navy/70 hover:text-navy"
                    }`
                  }
                >
                  {p.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}
