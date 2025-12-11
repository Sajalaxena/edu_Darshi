// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminApp from "./admin/AdminApp";

// Public pages
import Home from "./components/Home";
import QuizSetup from "./pages/QuizSetup";
import QuizPage from "./pages/Quiz";
import AllNews from "./pages/AllNews";
import AllWebinars from "./pages/AllWebinars";
import QOTDPage from "./pages/QOTDPage";
// Layout
import MainLayout from "./components/MainLayout";
import WhyChooseDetails from "./pages/WhyChooseDetails";
import PlanDetails from "./pages/PlanDetails";
import RisingStars from "./pages/RisingStars";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import WebinarGallery from "./components/WebinarGallery";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin is separate and won't include the public site sections */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public/marketing routes live under MainLayout */}
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* matches "/" */}
          <Route path="home" element={<Home />} /> {/* optional */}
          <Route path="quiz-setup" element={<QuizSetup />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="news" element={<AllNews />} />
          <Route path="webinars" element={<AllWebinars />} />
          <Route path="qotd" element={<QOTDPage />} />
          <Route path="why-choose-us" element={<WhyChooseDetails />} />
          <Route path="plans/:id?" element={<PlanDetails />} />
          <Route path="rising-stars" element={<RisingStars />} />

          {/* <-- HERE: use relative child paths (no leading slash) */}
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="gallery" element={<WebinarGallery />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
