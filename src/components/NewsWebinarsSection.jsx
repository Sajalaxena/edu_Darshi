import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, GraduationCap, Briefcase } from "lucide-react";
import WebinarModal from "./WebinarModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function formatDate(s) {
  if (!s) return "—";
  return s;
}

// ─────────────────────────────────────────
// Single compact row card
// ─────────────────────────────────────────
function CompactRow({ badge, badgeClass, title, meta1, meta1Label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group p-4 rounded-xl bg-white border border-slate-100 hover:border-blue-300 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br shadow-sm ${badgeClass}`}>
          {badge}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition line-clamp-2">{title}</h4>
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            {meta1Label && <span className="text-emerald-600 font-medium">{meta1Label}:</span>}
            <span className="text-slate-600">{meta1}</span>
          </div>
        </div>
        <span className="text-slate-400 group-hover:text-blue-500 transition translate-x-0 group-hover:translate-x-1 duration-300">›</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Section Box wrapper
// ─────────────────────────────────────────
function SectionBox({ title, subtitle, gradientFrom, gradientTo, borderColor, shadowColor, children, viewAllTo }) {
  return (
    <div className={`rounded-2xl overflow-hidden border ${borderColor} shadow-lg ${shadowColor} flex flex-col h-full`}
      style={{ background: "linear-gradient(135deg, #f8faff 0%, #fff 60%, #f0f4ff 100%)" }}>
      <div className={`px-6 py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white flex justify-between items-start min-h-[88px]`}>
        <div>
          <h3 className="text-base md:text-lg font-semibold tracking-wide leading-snug">{title}</h3>
          {subtitle && <p className="text-[11px] md:text-xs text-blue-100 mt-1 font-medium tracking-wide uppercase">{subtitle}</p>}
        </div>
        <Link to={viewAllTo}
          className="shrink-0 inline-flex items-center justify-center px-4 py-1.5 text-sm font-semibold bg-white text-blue-700 rounded-full hover:bg-blue-50 transition shadow-sm whitespace-nowrap mt-0.5">
          View All →
        </Link>
      </div>
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Main component
// ─────────────────────────────────────────
export default function NewsWebinarsSection() {
  const [events, setEvents] = useState([]);
  const [positions, setPositions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      setLoading(true);

      const p1 = fetch(`${API_BASE}/events`).then(r => r.json()).catch(() => null);
      const p2 = fetch(`${API_BASE}/academic-positions`).then(r => r.json()).catch(() => null);
      const p3 = fetch(`${API_BASE}/jobs`).then(r => r.json()).catch(() => null);

      const [evJson, posJson, jobJson] = await Promise.all([p1, p2, p3]);

      if (active) {
        setEvents(evJson?.data || []);
        setPositions(posJson?.data || []);
        setJobs(jobJson?.data || []);
        setLoading(false);
      }
    }
    fetchAll();
    return () => { active = false; };
  }, []);

  const EVENT_BADGE = {
    conference: "from-blue-100 to-indigo-100 text-blue-700",
    seminar: "from-purple-100 to-fuchsia-100 text-purple-700",
    workshop: "from-emerald-100 to-teal-100 text-emerald-700",
  };
  const POS_BADGE = {
    masters: "from-sky-100 to-blue-100 text-sky-700",
    phd: "from-violet-100 to-purple-100 text-violet-700",
    postdoc: "from-emerald-100 to-green-100 text-emerald-700",
    project: "from-amber-100 to-orange-100 text-amber-700",
  };
  const POS_LABEL = { masters: "MSc", phd: "PhD", postdoc: "PDoc", project: "Proj" };

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── EVENTS ──────────────────────────────────── */}
          <SectionBox
            title="Events"
            subtitle="Workshops · Seminars · Conferences"
            gradientFrom="from-blue-600"
            gradientTo="to-indigo-600"
            borderColor="border-blue-200"
            shadowColor="shadow-blue-100/60"
            viewAllTo="/events"
          >
            {loading ? (
              <p className="text-center text-slate-400 text-sm py-4 m-auto">Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-4 m-auto">No events yet.</p>
            ) : events.slice(0, 4).map(e => (
              <CompactRow
                key={e._id}
                badge={<CalendarDays size={20} />}
                badgeClass={EVENT_BADGE[e.eventType] || "from-blue-100 to-indigo-100 text-blue-700"}
                title={e.title}
                meta1Label="Starts"
                meta1={formatDate(e.startDate)}
                onClick={() => setOpen({ ...e, _modalType: "event" })}
              />
            ))}
          </SectionBox>

          {/* ── ACADEMIC POSITIONS ──────────────────────── */}
          <SectionBox
            title="Academic Positions"
            subtitle="Masters · PhD · PostDoc "
            gradientFrom="from-violet-600"
            gradientTo="to-purple-600"
            borderColor="border-violet-200"
            shadowColor="shadow-violet-100/60"
            viewAllTo="/academic-positions"
          >
            {loading ? (
              <p className="text-center text-slate-400 text-sm py-4 m-auto">Loading positions...</p>
            ) : positions.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-4 m-auto">No positions yet.</p>
            ) : positions.slice(0, 4).map(p => (
              <CompactRow
                key={p._id}
                badge={<GraduationCap size={20} />}
                badgeClass={POS_BADGE[p.positionType] || "from-violet-100 to-purple-100 text-violet-700"}
                title={p.courseName || p.institution || "Position"}
                meta1Label="Start Date"
                meta1={p.startDate || "Not Specified"}
                onClick={() => setOpen({ ...p, _modalType: "position" })}
              />
            ))}
          </SectionBox>

          {/* ── JOBS ────────────────────────────────────── */}
          <SectionBox
            title="Jobs"
            subtitle="Faculty & Academic Jobs"
            gradientFrom="from-rose-600"
            gradientTo="to-red-500"
            borderColor="border-rose-200"
            shadowColor="shadow-rose-100/60"
            viewAllTo="/jobs"
          >
            {loading ? (
              <p className="text-center text-slate-400 text-sm py-4 m-auto">Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-4 m-auto">No jobs yet.</p>
            ) : jobs.slice(0, 4).map(j => (
              <CompactRow
                key={j._id}
                badge={<Briefcase size={20} />}
                badgeClass="from-rose-100 to-red-100 text-rose-700"
                title={j.title}
                meta1Label="Posted"
                meta1={j.postedDate || "—"}
                onClick={() => setOpen({ ...j, _modalType: "job" })}
              />
            ))}
          </SectionBox>

        </div>
      </section>

      {open && <WebinarModal data={open} onClose={() => setOpen(null)} />}
    </>
  );
}
