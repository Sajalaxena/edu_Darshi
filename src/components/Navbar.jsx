import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    { to: "/plans", label: "Our Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blogs", label: "Blog" },
    { to: "/mentors", label: "Mentors" },
    { to: "/test-series", label: "Test Series" },
    { to: "/previous-papers", label: "Previous Papers" },
  ];

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 inset-x-0 z-50">
        {/* Gradient glow line */}
        <div className="h-[4px] bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500" />

        {/* Glass Navbar */}
        <div className="bg-gradient-to-r from-indigo-50/80 via-white/80 to-blue-50/80 backdrop-blur-xl border-b border-indigo-100 shadow-sm">
          <div className="container mx-auto px-4 md:px-8 h-[100px] flex items-center justify-between">

            {/* ===== LOGO ===== */}
            <Link to="/" className="flex items-center gap-4">
              <img
                src="/logo2.png"
                alt="EduDarshi"
                className="h-24 w-24 md:h-24 md:w-24 drop-shadow-lg"
              />
              <div>
                <div className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EduDarshi
                </div>
                <div className="text-xs md:text-sm text-slate-500 -mt-1">
                  Educate | Elevate | Empower
                </div>
              </div>
            </Link>

            {/* ===== DESKTOP NAV ===== */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((n) => (
                <NavLink key={n.to} to={n.to}>
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`relative px-4 py-2 rounded-full text-sm font-semibold transition
                        ${
                          isActive
                            ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
                            : "text-slate-700 hover:bg-indigo-100"
                        }`}
                    >
                      {n.label}
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ===== CTA ===== */}
            <div className="hidden lg:block">
              <Link
                to="/plans"
                className="px-7 py-3 rounded-full text-sm font-bold text-white
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           shadow-xl shadow-indigo-500/30
                           hover:scale-[1.05] transition-transform"
              >
                Register Now
              </Link>
            </div>

            {/* ===== MOBILE TOGGLE ===== */}
            <button
              className="lg:hidden p-2 rounded-xl bg-indigo-100 text-indigo-700"
              onClick={() => setOpen(true)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[80px]" />

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-full w-[85vw] max-w-sm
                         bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/20">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" className="h-10 w-10" alt="EduDarshi" />
                  <span className="font-bold text-lg">EduDarshi</span>
                </div>
                <button onClick={() => setOpen(false)}>
                  ✕
                </button>
              </div>

              {/* Links */}
              <nav className="p-5 space-y-2">
                {navItems.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-5 py-3 rounded-xl font-semibold transition
                       ${
                         isActive
                           ? "bg-white text-indigo-700"
                           : "hover:bg-white/10"
                       }`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
              </nav>

              {/* CTA */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <Link
                  to="/plans"
                  onClick={() => setOpen(false)}
                  className="block text-center w-full px-6 py-4 rounded-xl
                             bg-white text-indigo-700 font-bold shadow-lg"
                >
                  Register Now
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
