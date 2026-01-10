import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./auth";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    const token = login(form.username.trim(), form.password);
    if (!token) {
      setErr("Invalid credentials");
      return;
    }
    nav("/admin"); // go to admin root
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 card">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-between items-center">
            <button className="btn-primary">Sign in</button>
            {/* <button
              type="button"
              className="text-sm text-slate-500"
              onClick={() => {
                setForm({ username: "admin", password: "Admin@123" });
              }}
            >
              Fill demo
            </button> */}
          </div>
        </form>
        {/* <p className="text-xs text-slate-400 mt-4">
          Demo credentials are in auth.js — replace when you add real auth.
        </p> */}
      </div>
    </div>
  );
}
