// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // lock scroll when menu open and allow ESC to close
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // optional: focus first link when menu opens
  useEffect(() => {
    if (open) {
      const firstLink = mobileMenuRef.current?.querySelector("a, button");
      firstLink?.focus();
    } else {
      btnRef.current?.focus();
    }
  }, [open]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "px-3 py-2 rounded-md text-sm font-medium text-slate-900 bg-white/0"
      : "px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900";

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div
            style={{ width: 44, height: 44 }}
            className="rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white font-bold shadow"
            aria-hidden
          >
            ED
          </div>

          <div className="hidden sm:block">
            <div className="font-semibold text-lg" style={{ color: "var(--brand-900)" }}>
              EduDarshi
            </div>
            <div className="text-xs text-slate-500 -mt-1">Mentorship & Exams</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/plans" className={navLinkClass}>
            Programs
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass}>
            Gallery
          </NavLink>
          <NavLink to="/blogs" className={navLinkClass}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow hover:opacity-95"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-md inline-flex items-center justify-center text-slate-700 hover:bg-slate-100"
          >
            {/* animated burger / X */}
            <svg className={`w-6 h-6 transition-transform ${open ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: open ? 0 : 1, transition: "opacity .18s" }} />
              <path d="M6 6 L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: open ? 1 : 0, transition: "opacity .18s" }} />
              <path d="M6 18 L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: open ? 1 : 0, transition: "opacity .18s" }} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* semi-transparent backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* sliding panel */}
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-[84%] max-w-sm bg-white shadow-xl transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white font-bold" style={{ width: 36, height: 36 }}>
                ED
              </div>
              <div>
                <div className="font-semibold">EduDarshi</div>
                <div className="text-xs text-slate-500">Mentorship & Exams</div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
              aria-label="Close mobile menu"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-4">
            <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "block px-3 py-2 rounded-md font-medium text-slate-900 bg-slate-50" : "block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50")} end>
              Home
            </NavLink>

            <NavLink to="/plans" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "block px-3 py-2 rounded-md font-medium text-slate-900 bg-slate-50" : "block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50")}>
              Programs
            </NavLink>

            <NavLink to="/gallery" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "block px-3 py-2 rounded-md font-medium text-slate-900 bg-slate-50" : "block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50")}>
              Gallery
            </NavLink>

            <NavLink to="/blogs" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "block px-3 py-2 rounded-md font-medium text-slate-900 bg-slate-50" : "block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50")}>
              Blog
            </NavLink>

            <NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "block px-3 py-2 rounded-md font-medium text-slate-900 bg-slate-50" : "block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50")}>
              Contact
            </NavLink>

            <div className="pt-4 border-t">
              <a href="/signup" className="block w-full text-center px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow">
                Get Started
              </a>
            </div>

            <div className="pt-4 text-sm text-slate-500">
              <div className="mb-2">Follow us</div>
              <div className="flex gap-3">
                <a href="https://www.youtube.com/@EduDarshi_official" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">YouTube</a>
                <a href="https://www.linkedin.com/company/edudarshi" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">LinkedIn</a>
                <a href="https://whatsapp.com/channel/0029VbBPoK93rZZXswuddo2R" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
