// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b" >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div style={{ width:44, height:44 }} className="rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white font-bold">
            ED
          </div>
          <div>
            <div className="font-semibold text-lg" style={{color:"var(--brand-900)"}}>EduDarshi</div>
            <div className="text-xs text-muted -mt-1">Mentorship & Exams</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => isActive ? "font-medium text-slate-900" : "text-slate-600"}>Home</NavLink>
          <NavLink to="/plans" className={({isActive}) => isActive ? "font-medium text-slate-900" : "text-slate-600"}>Programs</NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? "font-medium text-slate-900" : "text-slate-600"}>Gallery</NavLink>
          <NavLink to="/blogs" className={({isActive}) => isActive ? "font-medium text-slate-900" : "text-slate-600"}>Blog</NavLink>
          {/* <NavLink to="/quiz-home" className={({isActive}) => isActive ? "font-medium text-slate-900" : "text-slate-600"}>Quiz</NavLink> */}
          <NavLink to="/contact" className={({isActive}) => isActive ? "font-medium text-slate-900" : "text-slate-600"}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {/* <button className="btn-secondary hidden md:inline">Sign in</button> */}
          {/* <button className="btn-primary">Get Started</button> */}
        </div>
      </div>
    </header>
  );
}
