// src/pages/PreviousPapersPage.jsx
import React, { useEffect, useMemo, useState } from "react";

/* ------------------ EXAMS ------------------ */

const EXAMS = [
  "All",
  "IIT-JAM",
  "GATE",
  "CSIR-NET/JRF",
  "CUET",
  "PhD Entrance",
  "UP-GDS",
  "UPHESC",
  "MPPSC",
  "Assistant Professor",
  "JOB EXAMS"
];

const API_BASE = import.meta.env.VITE_API_BASE_URL;
import MathematicalBackground from "../components/MathematicalBackground";
/* ------------------ HELPERS ------------------ */
function normalizeDriveLink(url = "") {
  if (!url) return "#";

  // Extract fileId from Google Drive URL
  const match = url.match(/\/d\/([^/]+)/);
  if (!match) return url;

  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/* ------------------ COMPONENT ------------------ */
export default function PreviousPapersPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeExam, setActiveExam] = useState("All");

  /* -------- FETCH PAPERS -------- */
  useEffect(() => {
    async function fetchPapers() {
      try {
        const res = await fetch(`${API_BASE}/previous-papers`);
        const json = await res.json();
        setPapers(json.data || []);
      } catch (err) {
        console.error("Failed to fetch papers", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, []);

  /* -------- FILTER LOGIC -------- */
  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      const examMatch =
        activeExam === "All" ||
        p.exam.toLowerCase().includes(activeExam.toLowerCase()) ||
        activeExam.toLowerCase().includes(p.exam.toLowerCase());

      const searchMatch =
        p.exam.toLowerCase().includes(query.toLowerCase()) ||
        (p.subject || "").toLowerCase().includes(query.toLowerCase()) ||
        String(p.year).includes(query);

      return examMatch && searchMatch;
    });
  }, [papers, query, activeExam]);

  return (
    <section className="min-h-screen bg-slate-50">
      <MathematicalBackground />

      <div className="container mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-600">
            Previous Year Papers
          </h1>
          <p className="mt-2 text-slate-600">
            Download question papers & watch solution walkthroughs
          </p>
        </div>

        {/* SEARCH */}
        <div className="mt-10 max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Search by exam, subject or year…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200
                       shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-600">
            🔍
          </span>
        </div>

        {/* EXAM FILTER */}
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          {EXAMS.map((exam) => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  activeExam === exam
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white border border-slate-200 hover:bg-slate-100"
                }`}
            >
              {exam}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <div className="col-span-full text-center text-slate-500">
              Loading papers...
            </div>
          )}

          {!loading && filteredPapers.length === 0 && (
            <div className="col-span-full text-center text-slate-500">
              No papers found.
            </div>
          )}

          {filteredPapers.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl border border-slate-200
                         shadow-sm hover:shadow-md transition p-6"
            >
              <h3 className="  text-lg font-bold">
                {p.exam} · {p.subject || "General"}
              </h3>

              <div className="mt-1 text-sm text-slate-500">
                {p.year} Question Paper
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex gap-3">
                {/* PDF BUTTON – GRADIENT RED */}
                <a
                  href={normalizeDriveLink(p.paperPdfLink)}
                  target="_blank"
                  rel="noreferrer"
                  className="
      flex-1 h-11 flex items-center justify-center gap-2
      rounded-xl
      bg-gradient-to-r from-rose-500 via-red-600 to-rose-600
      text-white
      text-sm font-semibold tracking-wide
      shadow-lg shadow-red-500/30
      hover:from-rose-600 hover:via-red-700 hover:to-rose-700
      hover:shadow-red-600/40
      active:scale-[0.97]
      transition-all duration-200
    "
                >
                  📄 Paper PDF
                </a>

                {/* SOLUTION BUTTON – GRADIENT GREEN */}
                {p.solutionYoutubeLink && (
                  <a
                    href={p.solutionYoutubeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="
        w-[130px] h-11 flex items-center justify-center gap-2
        rounded-xl
        bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600
        text-white
        text-sm font-semibold tracking-wide
        shadow-lg shadow-emerald-500/30
        hover:from-emerald-600 hover:via-green-700 hover:to-emerald-700
        hover:shadow-emerald-600/40
        active:scale-[0.97]
        transition-all duration-200
      "
                  >
                    ▶ Solution
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
