// src/components/MainLayout.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EduDarshiIntroModal from "./EduDarshiIntroModal";

/**
 * Robust image loader:
 * - If import.meta.globEager exists, use it (fast, sync).
 * - Otherwise use import.meta.glob and dynamic import (async).
 *
 * Place images in src/assets/ and refer by filename (case-sensitive).
 */

export default function MainLayout() {
  const [imageMap, setImageMap] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const loadImages = useCallback(async () => {
    try {
      // prefer eager if available
      if (typeof import.meta.globEager === "function") {
        const modules = import.meta.globEager("../assets/*.{jpg,jpeg,png,svg}");
        const map = {};
        for (const fullPath in modules) {
          const parts = fullPath.split("/");
          const filename = parts[parts.length - 1];
          map[filename] = modules[fullPath].default || modules[fullPath];
        }
        setImageMap(map);
        setImagesLoaded(true);
        return;
      }

      // fallback: import.meta.glob + dynamic imports
      if (typeof import.meta.glob === "function") {
        const modules = import.meta.glob("../assets/*.{jpg,jpeg,png,svg}");
        const entries = Object.entries(modules);
        const map = {};
        // import all modules
        await Promise.all(
          entries.map(async ([fullPath, importer]) => {
            try {
              const mod = await importer();
              const parts = fullPath.split("/");
              const filename = parts[parts.length - 1];
              map[filename] = mod.default || mod;
            } catch (e) {
              // skip failing import
            }
          })
        );
        setImageMap(map);
        setImagesLoaded(true);
        return;
      }

      // if neither available, set empty map
      setImageMap({});
      setImagesLoaded(true);
    } catch (err) {
      console.error("Failed loading images:", err);
      setImageMap({});
      setImagesLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);



  // modal + don't-show-again
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hide = localStorage.getItem("hideIntroModal");
    if (!hide) setOpen(true);
  }, []);

  function onDontShowAgainToggle(val) {
    setDontShowAgain(val);
    if (val) localStorage.setItem("hideRisingStars", "1");
    else localStorage.removeItem("hideRisingStars");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f6]">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-6">
        {/* Provide imageMap to nested routes if they call useOutletContext */}
        <Outlet />
      </main>
      <Footer />

      {/* Rising Stars modal (global) */}
      <EduDarshiIntroModal
       open={open} onClose={() => setOpen(false)}
      />
    </div>
  );
}
