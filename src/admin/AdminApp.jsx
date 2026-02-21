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
            <div className="admin-layout flex">
              <AdminSidebar />
              <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
                <div className="admin-header mb-8">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-blue-100 text-sm mt-1">Manage platform content and queries</p>
                  </div>
                  <div>
                    <button
                      className="btn-secondary flex items-center gap-2 px-4 py-2 hover:bg-white/20 transition-colors"
                      onClick={() => {
                        logout();
                        window.location.href = "/admin/login";
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
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
