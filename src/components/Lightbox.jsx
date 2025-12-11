// Lightbox.jsx
import React, { useEffect } from "react";

export default function Lightbox({ open, type, src, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    else document.removeEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 z-20 bg-white/90 p-2 rounded-full shadow">✕</button>
        <div className="w-full aspect-w-16 aspect-h-9 bg-black">
          {type === "image" && <img src={src} alt="full" className="w-full h-full object-contain bg-black" />}
          {type === "video" && (
            <iframe
              title="video"
              src={src + (src.includes("?") ? "&autoplay=1" : "?autoplay=1")}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {type === "external" && (
            <div className="w-full h-full flex items-center justify-center text-white">
              <a href={src} target="_blank" rel="noreferrer" className="bg-indigo-600 px-4 py-2 rounded-md">Open recording</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
