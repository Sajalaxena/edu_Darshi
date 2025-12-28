// src/pages/PreviousPapersPage.jsx
import React, { useMemo, useState } from "react";

/* ------------------ DATA ------------------ */

const EXAMS = [
  "All",
  "IIT-JAM",
  "GATE",
  "CSIR-NET/JRF",
  "CUET",
  "PhD Entrance",
];

const PAPERS = [
  {
    id: "jam-2023-math",
    exam: "IIT-JAM",
    subject: "Mathematics",
    year: 2023,
    paperPdf: "/papers/jam-2023-math.pdf",
    solutionVideo: "https://www.youtube.com/watch?v=XXXX",
  },
  {
    id: "jam-2022-math",
    exam: "IIT-JAM",
    subject: "Mathematics",
    year: 2022,
    paperPdf: "/papers/jam-2022-math.pdf",
    solutionVideo: "https://www.youtube.com/watch?v=XXXX",
  },
  {
    id: "gate-2023-math",
    exam: "GATE",
    subject: "Mathematics",
    year: 2023,
    paperPdf: "/papers/gate-2023-math.pdf",
    solutionVideo: "https://www.youtube.com/watch?v=XXXX",
  },
  {
    id: "net-2023-math",
    exam: "CSIR-NET/JRF",
    subject: "Mathematics",
    year: 2023,
    paperPdf: "/papers/net-2023-math.pdf",
    solutionVideo: "https://www.youtube.com/watch?v=XXXX",
  },
];

/* ------------------ COMPONENT ------------------ */

export default function PreviousPapersPage() {
  const [query, setQuery] = useState("");
  const [activeExam, setActiveExam] = useState("All");

  const filteredPapers = useMemo(() => {
    return PAPERS.filter((p) => {
      const matchesExam = activeExam === "All" || p.exam === activeExam;

      const matchesSearch =
        p.exam.toLowerCase().includes(query.toLowerCase()) ||
        p.subject.toLowerCase().includes(query.toLowerCase()) ||
        String(p.year).includes(query);

      return matchesExam && matchesSearch;
    });
  }, [query, activeExam]);

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold" style={{ color: "var(--brand)" }}>
            Previous Year Papers
          </h1>
          <p className="mt-2 text-slate-600">
            Download official papers and watch detailed solution walkthroughs
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-10 max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Search by exam, subject or year…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200
                       shadow-sm text-base focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-600 text-xl">
            🔍
          </span>
        </div>

        {/* EXAM FILTER PILLS */}
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          {EXAMS.map((exam) => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition
                ${
                  activeExam === exam
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
            >
              {exam}
            </button>
          ))}
        </div>

        {/* PAPERS GRID */}
        <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.length === 0 && (
            <div className="col-span-full text-center text-slate-500">
              No papers found.
            </div>
          )}

          {filteredPapers.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200
                         shadow-sm hover:shadow-md transition p-6"
            >
              <div className="text-sm text-slate-500">
                {p.exam} · {p.subject}
              </div>

              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {p.year} Question Paper
              </h3>

              <div className="mt-6 flex gap-3">
                <a
                  href={p.paperPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center px-4 py-2 rounded-lg
                             border border-slate-200 text-sm font-medium
                             hover:bg-slate-50"
                >
                  📄 Question Paper
                </a>

                <a
                  href={p.solutionVideo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center px-4 py-2 rounded-lg
                             bg-indigo-600 text-white text-sm font-medium
                             hover:bg-indigo-700"
                >
                  ▶ Solution
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
