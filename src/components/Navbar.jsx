import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50">
      <nav className="navbar-blur">
        <div className="container mx-auto px-6 flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <div
              className="text-2xl font-extrabold"
              style={{ color: "var(--brand)" }}
            >
              EduDarshi
            </div>
          </div>

          {/* desktop */}
          <div className="hidden md:flex items-center gap-6">
            <a
              className="nav-link text-sm font-medium text-slate-800 dark:text-slate-100"
              href="/home"
            >
              Home
            </a>
            <a
              className="nav-link text-sm font-medium text-slate-800 dark:text-slate-100"
              href="#programs"
            >
              Programs
            </a>
            <a
              className="nav-link text-sm font-medium text-slate-800 dark:text-slate-100"
              href="#mentors"
            >
              Mentorship
            </a>
            {/* <a
              className="nav-link text-sm font-medium text-slate-800 dark:text-slate-100"
              href="/quiz-setup"
            >
              Quiz
            </a> */}
            <a
              className="nav-link text-sm font-medium text-slate-800 dark:text-slate-100"
              href="#contact"
            >
              Contact
            </a>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-md border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setDark(!dark)} className="p-2 rounded-md">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 text-xl">
              ☰
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="md:hidden"
            >
              <div className="px-6 pb-6 flex flex-col gap-2">
                <a href="#" className="py-2">
                  Home
                </a>
                <a href="#programs" className="py-2">
                  Programs
                </a>
                <a href="#mentors" className="py-2">
                  Mentorship
                </a>
                <a href="#contact" className="py-2">
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
