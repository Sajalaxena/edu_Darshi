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
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <div className="font-bold text-2xl tracking-wide">EduDarshi</div>
            <p className="text-sm text-white/80 mt-2 leading-relaxed">
              Empowering students through mentorship, webinars, guidance and
              personalized learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold mb-2 text-lg">Quick Links</div>
            <ul className="text-sm text-white/80 space-y-2">
              <li><a href="/about" className="hover:text-blue-300 transition">About</a></li>
              <li><a href="/programs" className="hover:text-blue-300 transition">Programs</a></li>
              <li><a href="/contact" className="hover:text-blue-300 transition">Contact</a></li>
              <li><a href="/webinars" className="hover:text-blue-300 transition">Webinars</a></li>
              <li><a href="/blogs" className="hover:text-blue-300 transition">Blogs</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <div className="font-semibold mb-3 text-lg">Follow Us</div>

            <div className="flex items-center gap-4 mt-2">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/edudarshi_official"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-full"
              >
                <FaInstagram size={22} />
              </a>

              {/* Linkedin */}
              <a
                href="https://www.linkedin.com/company/edudarshi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-full"
              >
                <FaLinkedin size={22} />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@EduDarshi_official"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-full"
              >
                <FaYoutube size={22} />
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-full"
              >
                <FaFacebook size={22} />
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com/channel/0029VbBPoK93rZZXswuddo2R"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-full"
              >
                <FaWhatsapp size={22} />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-white/70 text-sm mt-10 pt-5 border-t border-white/10">
          © {new Date().getFullYear()} EduDarshi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
