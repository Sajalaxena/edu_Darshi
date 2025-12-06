import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-[var(--brand-deep)] text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4 flex justify-center gap-6">
          <a
            href="https://whatsapp.com/channel/0029VbBPoK93rZZXswuddo2R"
            className="underline"
          >
            WhatsApp
          </a>
          <a
            href="https://www.youtube.com/@EduDarshi_official"
            className="underline"
          >
            YouTube
          </a>
          <a
            href="https://www.linkedin.com/company/edudarshi#"
            className="underline"
          >
            LinkedIn
          </a>
        </div>
        <div className="text-sm opacity-90">
          © {new Date().getFullYear()} EduDarshi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
