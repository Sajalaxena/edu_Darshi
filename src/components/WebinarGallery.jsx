// src/components/AttractiveWebinarGallery.jsx
import React, { useState } from "react";
import MathematicalBackground from "./MathematicalBackground";
/**
 * Attractive Webinar Gallery
 * - Uses Tailwind classes (v2+). If you use custom CSS replace accordingly.
 * - Includes lightweight Lightbox for images and YouTube (iframe injected only when opened).
 * - Replace the placeholder images / youtube ids with your real data.
 */

/* ---------- placeholder images (Unsplash) ---------- */
const PLACEHOLDERS = [
  "https://iitacb.org/wp-content/uploads/2025/09/tata3.png", // auditorium
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80", // audience
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1400&q=80", // speaker
  "https://wellness.iitr.ac.in/wp-content/uploads/2024/08/image-21.png", // group
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80", // stage
  "https://images.unsplash.com/photo-1515165562835-c2a6b89b1b11?auto=format&fit=crop&w=1400&q=80", // students
];

/* ---------- gallery data: mix of videos, slideshows, images ---------- */
const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Crack JRF 2026 — Strategy & Timetable",
    venue: "Zoom • 12 Feb 2026 • 7:00 PM",
    variant: "slideshow",
    images: [PLACEHOLDERS[0], PLACEHOLDERS[1], PLACEHOLDERS[2]],
    tags: ["Exam Prep", "Strategy"],
    duration: "75m",
    featured: true,
  },
  {
    id: "g2",
    title: "JAM Problem Solving Marathon — Recording",
    venue: "YouTube • 26 Feb 2026",
    variant: "video",
    youtube: "KpnyhOJNyAI", // YouTube ID (works with https://img.youtube.com/vi/{ID}/maxresdefault.jpg)
    tags: ["Math", "Problem Solving"],
    duration: "90m",
  },
  {
    id: "g3",
    title: "Research Methods — Highlights",
    venue: "Auditorium • 20 Mar 2026",
    variant: "image",
    image: PLACEHOLDERS[3],
    tags: ["Research", "Methods"],
    duration: "45m",
  },
  {
    id: "g4",
    title: "Career Roadmap for Phd in Mathematics — Workshop",
    venue: "Zoom • 10 Mar 2026",
    variant: "video",
    youtube: "KpnyhOJNyAI", // demo id (replace with your own)
    image: PLACEHOLDERS[4],
    tags: ["Career", "PhD"],
    duration: "60m",
  },
];

/* ---------- Utility to build youtube thumbnail URL ---------- */
function youtubeThumbUrl(youtubeId) {
  if (!youtubeId) return null;
  // try maxres then fallback to hqdefault
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

/* ---------- Small Lightbox (image array OR youtube embed) ---------- */
function Lightbox({ open, onClose, type, payload }) {
  // payload: { images, startIndex } for images; { youtubeId } for video
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 z-30 bg-white/90 p-2 rounded-full shadow hover:bg-white"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        {type === "images" && payload?.images?.length ? (
          <div className="w-full bg-black">
            {/* simple slideshow UI */}
            <ImageSlideshow
              images={payload.images}
              start={payload.startIndex || 0}
            />
          </div>
        ) : type === "video" && payload?.youtubeId ? (
          <div
            className="w-full"
            style={{ aspectRatio: "16/9", minHeight: 240 }}
          >
            <iframe
              title="webinar-recording"
              src={`https://www.youtube.com/embed/${payload.youtubeId}?rel=0&autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="p-8">No content available</div>
        )}
      </div>
    </div>
  );
}

/* ---------- very small slideshow used in lightbox ---------- */
function ImageSlideshow({ images = [], start = 0 }) {
  const [index, setIndex] = useState(start || 0);
  if (!images.length) return null;
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full bg-black">
      <img
        src={images[index]}
        alt={`slide ${index + 1}`}
        className="w-full h-[60vh] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-between px-3">
        <button
          onClick={prev}
          aria-label="Previous"
          className="bg-white/80 p-2 rounded-full shadow hover:bg-white"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="bg-white/80 p-2 rounded-full shadow hover:bg-white"
        >
          ›
        </button>
      </div>
      <div className="absolute left-4 bottom-4 bg-black/60 text-white text-sm rounded-full px-3 py-1">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

/* ---------- The gallery main component ---------- */
export default function AttractiveWebinarGallery() {
  const [lightboxState, setLightboxState] = useState({
    open: false,
    type: null,
    payload: null,
  });

  const openImages = (images, start = 0) => {
    setLightboxState({
      open: true,
      type: "images",
      payload: { images, startIndex: start },
    });
  };
  const openVideo = (youtubeId) => {
    setLightboxState({ open: true, type: "video", payload: { youtubeId } });
  };
  const closeLightbox = () =>
    setLightboxState({ open: false, type: null, payload: null });

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 ">
      <MathematicalBackground />

      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-8"
          style={{ color: "var(--brand, #2563EB)" }}
        >
          Webinar Gallery
        </h2>

        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
          Highlights, recordings and snapshots from our recent webinars and
          workshops.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {GALLERY_ITEMS.map((item, idx) => {
            const reverse = idx % 2 === 1;
            const isVideo = item.variant === "video";
            const hasSlideshow = item.variant === "slideshow";
            const cardGradient = item.featured
              ? "bg-gradient-to-tr from-indigo-50 to-amber-50"
              : "bg-white";

            // Media preview:
            let preview;
            if (isVideo) {
              const thumb = youtubeThumbUrl(item.youtube);
              preview = thumb ? (
                <div className="relative rounded-lg overflow-hidden group">
                  <img
                    src={thumb}
                    alt={item.title}
                    className="w-full h-64 md:h-72 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openVideo(item.youtube)}
                      aria-label="Play video"
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
                      </svg>
                      Watch
                    </button>
                  </div>
                  <div className="absolute left-3 top-3 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow">
                    {item.duration || "—"}
                  </div>
                </div>
              ) : (
                <div className="h-64 md:h-72 rounded-lg bg-slate-100 grid place-items-center">
                  Video
                </div>
              );
            } else if (hasSlideshow) {
              preview = (
                <div
                  className="relative rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => openImages(item.images || [], 0)}
                >
                  <img
                    src={item.images?.[0] || PLACEHOLDERS[0]}
                    alt={item.title}
                    className="w-full h-64 md:h-72 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-60 transition" />
                  <div className="absolute left-3 top-3 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow">
                    {item.images?.length || 0} slides
                  </div>
                </div>
              );
            } else {
              preview = (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={item.image || PLACEHOLDERS[5]}
                    alt={item.title}
                    className="w-full h-64 md:h-72 object-cover rounded-lg transition-transform hover:scale-105"
                  />
                </div>
              );
            }

            return (
              <article
                key={item.id}
                className={`flex flex-col md:flex-row items-stretch gap-6 p-4 md:p-6 rounded-2xl ${cardGradient} shadow-sm`}
              >
                {/* Media left / right - alternate */}
                <div
                  className={`md:w-1/2 ${
                    reverse ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {preview}
                </div>

                <div
                  className={`md:w-1/2 flex flex-col justify-between ${
                    reverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                          {item.title}
                        </h3>
                        <div className="text-sm text-slate-500 mt-1">
                          {item.venue}
                        </div>
                      </div>

                      <div className="hidden md:flex items-center gap-2">
                        {item.tags?.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-slate-600 max-w-prose">
                      {item.description ||
                        "High-quality talks, curated slides, and recorded sessions from mentors and industry guest speakers."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white shadow text-sm">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 4v16M4 12h16"
                            stroke="#4F46E5"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-slate-700 text-sm font-medium">
                          {item.duration || "—"}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 ml-2 md:hidden">
                        {item.tags?.slice(0, 2).join(" • ")}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* preview buttons for mobile */}
                      {item.variant === "video" ? (
                        <button
                          onClick={() => openVideo(item.youtube)}
                          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
                          </svg>
                          Watch
                        </button>
                      ) : item.variant === "slideshow" ? (
                        <button
                          onClick={() => openImages(item.images || [], 0)}
                          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-700"
                        >
                          View slides
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            openImages([item.image || PLACEHOLDERS[0]])
                          }
                          className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md shadow hover:bg-slate-900"
                        >
                          View image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxState.open}
        onClose={closeLightbox}
        type={lightboxState.type}
        payload={lightboxState.payload}
      />
    </section>
  );
}
