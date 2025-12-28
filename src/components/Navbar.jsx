import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/plans", label: "Programs" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blogs", label: "Blog" },
    { to: "/mentors", label: "Mentors" },
    { to: "/test-series", label: "Test Series" },
    { to: "/previous-papers", label: "Previous Papers" },
  ];

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="fixed top-0 inset-x-0 z-50">
        {/* Top gradient accent */}
        <div className="h-[3px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />

        {/* Main bar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 h-[72px] md:h-[104px] flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="EduDarshi"
                className="h-9 md:h-12 drop-shadow-sm"
              />
              <div className="hidden sm:block">
                <div className="font-bold text-slate-900 text-base md:text-lg tracking-tight">
                  EduDarshi
                </div>
                <div className="text-xs text-slate-500 -mt-0.5">
                  Mentorship & Exams
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex flex-col items-end gap-4">
              <nav className="flex gap-8">
                {navItems.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className={({ isActive }) =>
                      `relative text-sm font-medium transition ${
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-600 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {n.label}
                        {/* Active underline */}
                        <span
                          className={`absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-indigo-500 scale-x-100"
                              : "scale-x-0"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* CTA */}
              <Link
                to="/plans"
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white
                           bg-gradient-to-r from-blue-600 to-indigo-600
                           shadow-lg shadow-blue-500/30
                           hover:from-blue-700 hover:to-indigo-700
                           transition"
              >
                Register
              </Link>
            </div>

            {/* MOBILE MENU */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-blue-50"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[72px] md:h-[104px]" />

      {/* ===== MOBILE DRAWER ===== */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[88vw] max-w-[360px]
                      bg-gradient-to-b from-blue-50 to-white
                      shadow-2xl transform transition-transform ${
                        open ? "translate-x-0" : "translate-x-full"
                      }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 h-[64px] border-b">
            <img src="/logo.png" className="h-9" alt="EduDarshi" />
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-blue-100"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-700 hover:bg-blue-50"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="absolute bottom-0 inset-x-0 p-4 border-t bg-white">
            <Link
              to="/plans"
              onClick={() => setOpen(false)}
              className="block text-center w-full px-4 py-3 rounded-xl
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white font-semibold shadow-lg"
            >
              Register
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
