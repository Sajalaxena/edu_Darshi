// src/components/Footer.jsx
import React from "react";

export default function Footer(){
  return (
    <footer className="bg-gradient-to-t from-slate-900 to-blue-900 text-white mt-12">
      <div className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-bold text-lg">EduDarshi</div>
            <p className="text-sm text-white/80 mt-2">Mentorship • Webinars • Exam prep</p>
          </div>

          <div>
            <div className="font-medium mb-2">Quick Links</div>
            <ul className="text-sm text-white/80 space-y-2">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Programs</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          <div className="text-right">
            <div className="font-medium mb-2">Subscribe</div>
            <div className="flex items-center gap-2 justify-end">
              <input placeholder="Email address" className="rounded-md px-3 py-2 text-slate-900" />
              <button className="btn-primary">Sign Up</button>
            </div>
          </div>
        </div>

        <div className="text-center text-white/70 text-sm mt-8">
          © {new Date().getFullYear()} EduDarshi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
