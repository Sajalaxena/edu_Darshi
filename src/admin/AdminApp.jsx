// src/admin/AdminApp.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import ClientQueries from "./pages/ClientQueries";
import Transactions from "./pages/Transactions";
import AddMentors from "./pages/AddMentors";
import AddReviews from "./pages/AddReviews";
import AdminLogin from "./AdminLogin";
import { isAuthenticated, logout } from "./auth";
import AddPreviousPaper from "./pages/AddPreviousPaper";  
import AdminResearchNews from "./pages/AdminResearchNews";
import AdminWebinars from "./pages/AdminUpcomingWebinars";
import AdminBlogs from "./pages/AdminBlogs";
import QOTDAdmin from "./pages/QOTDAdmin";
import "./admin.css";
function Protected({ children }) {
  // if not logged in, redirect to the nested "login" route
  if (!isAuthenticated()) return <Navigate to="login" replace />;
  return children;
}

export default function AdminApp() {
  return (
    <Routes>
      {/* login route inside admin subtree -> matches /admin/login */}
      <Route path="login" element={<AdminLogin />} />

      {/* all other admin routes protected; these are relative so /admin/queries works */}
      <Route
        path="*"
        element={
          <Protected>
            <div className="min-h-screen flex bg-gray-50">
              <AdminSidebar />
              <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semibold">Admin Panel</h1>
                  <div>
                    <button
                      className="btn-secondary mr-2"
                      onClick={() => {
                        logout();
                        // using absolute redirect is fine here
                        window.location.href = "/admin/login";
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* nested admin pages */}
                <Routes>
                  <Route path="queries" element={<ClientQueries />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="mentors" element={<AddMentors />} />
                  <Route path="reviews" element={<AddReviews />} />
                  <Route path="previous-paper/add" element={<AddPreviousPaper />} />
                <Route path="research-news" element={<AdminResearchNews />} />
                      <Route path="webinars" element={<AdminWebinars />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="qotd" element={<QOTDAdmin />} />
                  {/* default when /admin is visited -> go to queries */}
                  <Route path="" element={<ClientQueries />} />
                </Routes>
              </main>
            </div>
          </Protected>
        }
      />
    </Routes>
  );
}
