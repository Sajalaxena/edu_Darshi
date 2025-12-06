// src/components/MainLayout.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RisingStarsModal from "./RisingStarsModal";

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

  // rising-star data using filenames; we'll replace image refs with resolved URLs
  const BASE_STUDENTS = [
    {
      id: "s1",
      name: "Anita Sharma",
      exam: "NEET - 2025 (AIR 102)",
      brief: "Scored 680/720. Focused on concept clarity & timed practice.",
      imageFile: "student1.jpg",
    },
    {
      id: "s2",
      name: "Rohit Verma",
      exam: "JEE Advanced - 2025 (Rank 1200)",
      brief: "Strong problem-solving routine, weekly mock evaluation.",
      imageFile: "student2.jpg",
    },
    {
      id: "s3",
      name: "Priya N",
      exam: "GATE - 2025 (Top 500)",
      brief: "Focused project work + mentor-led doubt sessions.",
      imageFile: "student3.jpg",
    },
  ];

  // derive final students list that includes resolved image URL (or null)
  const STUDENTS = BASE_STUDENTS.map((s) => ({
    ...s,
    image: imagesLoaded ? imageMap[s.imageFile] || null : null,
  }));

  // modal + don't-show-again
  const [openStars, setOpenStars] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hide = localStorage.getItem("hideRisingStars");
    if (hide === "1") return;
    // show modal after small delay; only once images are loaded (so avatars visible)
    const wait = setTimeout(() => {
      // ensure we show only when images have been attempted to load (imagesLoaded true)
      if (imagesLoaded) setOpenStars(true);
      else {
        // fallback: if images are not loaded in 1.2s, still open modal without images
        const fallback = setTimeout(() => setOpenStars(true), 1200);
        return () => clearTimeout(fallback);
      }
    }, 600);

    return () => clearTimeout(wait);
  }, [imagesLoaded]);

  function onDontShowAgainToggle(val) {
    setDontShowAgain(val);
    if (val) localStorage.setItem("hideRisingStars", "1");
    else localStorage.removeItem("hideRisingStars");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-6">
        {/* Provide imageMap to nested routes if they call useOutletContext */}
        <Outlet />
      </main>
      <Footer />

      {/* Rising Stars modal (global) */}
      <RisingStarsModal
        open={openStars}
        onClose={() => setOpenStars(false)}
        students={STUDENTS}
        onDontShowAgainToggle={onDontShowAgainToggle}
      />
    </div>
  );
}
