// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { X, List } from "phosphor-react"; // optional icons, fallback SVGs included below

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // lock body scroll while menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/plans", label: "Programs" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blogs", label: "Blog" },
    { to: "/mentors", label: "Mentors" },
  ];

  return (
    <>
      {/* Fixed header */}
      <header
        className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200"
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-md grid place-items-center text-white font-bold"
                style={{
                  background:
                    "linear-gradient(90deg,#3b82f6,#7c3aed)", // blue -> purple
                }}
              >
                ED
              </div>

              <div className="hidden sm:block">
                <div className="font-semibold text-slate-900">EduDarshi</div>
                <div className="text-xs text-slate-500 -mt-0.5">Mentorship & Exams</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>

            {/* Right side (CTA + mobile toggle) */}
            <div className="flex items-center gap-3">
              <Link
                to="/plans"
                className="hidden md:inline-block px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700"
              >
                Get Started
              </Link>

              {/* Mobile: hamburger */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-expanded={open}
                aria-label="Open menu"
                onClick={() => setOpen(true)}
              >
                {/* hamburger icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so content doesn't go under fixed header */}
      <div className="h-16" />

      {/* Mobile Drawer */}
      {/* Use portal for production if you want; inline is fine */}
      <div
        className={`fixed inset-0 z-40 md:hidden pointer-events-none ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* sliding panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-[92vw] sm:max-w-[420px] bg-white shadow-2xl transform transition-transform
                      ${open ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-md grid place-items-center text-white font-bold"
                  style={{
                    background:
                      "linear-gradient(90deg,#3b82f6,#7c3aed)",
                  }}
                >
                  ED
                </div>
                <div>
                  <div className="font-semibold text-slate-900">EduDarshi</div>
                  <div className="text-xs text-slate-500 -mt-0.5">Mentorship & Exams</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base ${isActive ? "font-semibold text-slate-900" : "text-slate-700 hover:bg-slate-50"}`
                }
              >
                {n.label}
              </NavLink>
            ))}

            <div className="mt-4 px-3">
              <Link
                to="/plans"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>

            <div className="mt-6 px-3 text-sm text-slate-500">
              <div>Follow us</div>
              <div className="flex gap-3 mt-3">
                <a href="https://www.youtube.com/@EduDarshi_official" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">YouTube</a>
                <a href="https://www.linkedin.com/company/edudarshi" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">LinkedIn</a>
                <a href="https://whatsapp.com/channel/0029VbBPoK93rZZXswuddo2R" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">WhatsApp</a>
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
