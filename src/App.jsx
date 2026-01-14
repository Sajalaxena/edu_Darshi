// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminApp from "./admin/AdminApp";

import Home from "./components/Home";
import QuizSetup from "./pages/QuizSetup";
import QuizPage from "./pages/Quiz";
import AllNews from "./pages/AllNews";
import AllWebinars from "./pages/AllWebinars";
import QOTDPage from "./pages/QOTDPage";
import MainLayout from "./components/MainLayout";
import WhyChooseDetails from "./pages/WhyChooseDetails";
import PlanDetails from "./pages/PlanDetails";
import RisingStars from "./pages/RisingStars";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import WebinarGallery from "./components/WebinarGallery";
import MentorsPage from "./pages/MentorsPage";
import MentorDetailPage from "./pages/MentorDetailPage";
import TestSeriesComingSoon from "./components/TestSeriesComingSoon";
import GlobalBackground from "./components/GlobalBackground";
import PreviousPapersPage from "./pages/PreviousPaperPage";
import ScrollToTop from "./components/ScrollToTop"; 
import AboutUs from "./pages/AboutUs";
export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* 🔥 Global background (ONE TIME ONLY) */}
      <GlobalBackground />

      {/* Main App Content */}
      <div className="relative z-10">
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            {/* Admin Panel */}
            <Route path="/admin/*" element={<AdminApp />} />

            {/* Public Website */}
            <Route path="/*" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />

              <Route path="quiz-setup" element={<QuizSetup />} />
              <Route path="quiz" element={<QuizPage />} />
              <Route path="news" element={<AllNews />} />
              <Route path="webinars" element={<AllWebinars />} />
              <Route path="qotd" element={<QOTDPage />} />
               
              <Route path="why-choose-us" element={<WhyChooseDetails />} />
              <Route path="plans/:id?" element={<PlanDetails />} />

              <Route path="rising-stars" element={<RisingStars />} />

              <Route path="mentors" element={<MentorsPage />} />
              <Route path="mentors/:id" element={<MentorDetailPage />} />

              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<BlogDetails />} />

              <Route path="gallery" element={<WebinarGallery />} />
              <Route path="test-series" element={<TestSeriesComingSoon />} />
              <Route path="previous-papers" element={<PreviousPapersPage />} />
              <Route path="about-us" element={<AboutUs />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
