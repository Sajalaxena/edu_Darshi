// src/components/Footer.jsx
import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-900 to-blue-900 text-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
             <div className="flex items-center ">
            <img src="/logo.png" alt="EduDarshi" className="h-12 w-auto mb-4" />
            <h1 className="text-2xl font-bold mb-6">EduDarshi</h1>
            <span className="absolute text-sm text-white/70 ml-12 mt-6">Mentorship & Exams</span>
            </div>
             <p className="text-sm text-white/80 leading-relaxed max-w-xs">
              Empowering students through mentorship, webinars, guidance and personalized learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><a href="/about-us" className="text-sm text-white/70 hover:text-blue-300 transition-colors">About</a></li>
              <li><a href="/plans" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Programs</a></li>
              <li><a href="/contact" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Contact</a></li>
              <li><a href="/webinars" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Webinars</a></li>
              <li><a href="/blogs" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Blogs</a></li>
              <li><a href="/careers" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Resources</h3>
            <ul className="space-y-2.5">
              <li><a href="/mentors" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Mentors</a></li>
              <li><a href="/previous-papers" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Previous Papers</a></li>
              <li><a href="/rising-stars" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Rising Stars</a></li>
              <li><a href="/qotd" className="text-sm text-white/70 hover:text-blue-300 transition-colors">Question of the Day</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Connect With Us</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/edudarshi_official" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 p-3 rounded-lg group">
                <FaInstagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/company/edudarshi" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-blue-600 transition-all duration-300 p-3 rounded-lg group">
                <FaLinkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.youtube.com/@EduDarshi_official" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-red-600 transition-all duration-300 p-3 rounded-lg group">
                <FaYoutube size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-blue-500 transition-all duration-300 p-3 rounded-lg group">
                <FaFacebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://whatsapp.com/channel/0029VbBPoK93rZZXswuddo2R" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-green-500 transition-all duration-300 p-3 rounded-lg group">
                <FaWhatsapp size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} <span className="text-white/80 font-medium">EduDarshi</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
