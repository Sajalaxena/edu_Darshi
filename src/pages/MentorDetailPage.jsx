// src/pages/MentorDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import mentorsData from "../components/data/mentorsData";
import MathematicalBackground from "../components/MathematicalBackground";
export default function MentorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentorsData.find((m) => m.id === id);

  if (!mentor) {
    return (
      <section className="container mx-auto px-6 py-12">
        <div className="text-center">Mentor not found.</div>
        <div className="mt-4 text-center">
          <button onClick={() => navigate(-1)} className="btn-secondary">Go back</button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col items-center">
          <img src={mentor.img} alt={mentor.name} className="w-40 h-40 rounded-full object-cover shadow-lg" />
          <h2 className="mt-4 text-2xl font-semibold">{mentor.name}</h2>
          <div className="text-sm text-slate-600 mt-1">{mentor.title}</div>
          <div className="text-xs text-slate-500 mt-2">{mentor.short}</div>

          <div className="mt-6 flex gap-3">
            <a href={mentor.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-indigo-600 text-white">LinkedIn</a>
            <a href={`mailto:${mentor.email}`} className="px-3 py-2 rounded-md border">Email</a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="mt-2 text-slate-700">{mentor.bio}</p>

          <div className="mt-4">
            <h4 className="font-medium">Qualifications</h4>
            <ul className="list-disc pl-5 mt-2 text-slate-700">
              {mentor.qualifications.map((q, i) => (<li key={i}>{q}</li>))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="font-medium">Areas</h4>
            <div className="mt-2 flex gap-2 flex-wrap">
              {mentor.tags.map((t) => <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{t}</span>)}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button 
            // onClick={() => alert("Schedule request flow")} 
            className="btn-primary">Request Session</button>
            <button onClick={() => navigate(-1)} className="btn-secondary">Back</button>
          </div>
        </div>
      </div>
    </section>
  );
}
