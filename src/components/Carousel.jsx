// Carousel.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Simple responsive carousel
 * props:
 * - images: array of URLs
 * - interval: ms
 * - onOpen(src): called when user clicks an image to open lightbox
 */
export default function Carousel({ images = [], interval = 3500, onOpen = () => {} }) {
  const [index, setIndex] = useState(0);
  const timer = useRef();

  useEffect(() => {
    if (!images.length) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(timer.current);
  }, [images, interval]);

  if (!images.length) {
    return <div className="w-full h-64 bg-slate-100 rounded-2xl" />;
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white">
      <div className="relative w-full h-64 md:h-72 lg:h-80">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            onClick={() => onOpen(src)}
            style={{ cursor: "pointer" }}
          />
        ))}

        <div className="absolute left-3 top-3 flex gap-2">
          <div className="bg-white/80 text-xs px-2 py-1 rounded-full font-medium text-slate-700 shadow-sm">
            {index + 1}/{images.length}
          </div>
        </div>

        <button
          onClick={() => setIndex((idx) => (idx - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white transition"
          aria-label="previous slide"
        >
          ‹
        </button>

        <button
          onClick={() => setIndex((idx) => (idx + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white transition"
          aria-label="next slide"
        >
          ›
        </button>
      </div>

      <div className="p-3 flex items-center gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-20 h-12 rounded-md overflow-hidden border ${i === index ? "ring-2 ring-indigo-300" : "border-transparent"}`}
            aria-label={`thumbnail ${i + 1}`}
          >
            <img src={src} alt={`thumb ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
