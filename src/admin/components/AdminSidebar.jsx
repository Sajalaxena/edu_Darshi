import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const loc = useLocation().pathname;
  const items = [
    { to: "/admin/queries", label: "Client Queries" },
    { to: "/admin/transactions", label: "Transaction Details" },
    { to: "/admin/mentors", label: "Add Mentors" },
    { to: "/admin/reviews", label: "Add Reviews" },
  ];

  return (
    <aside className="w-64 border-r hidden lg:block bg-white">
      <div className="p-4 border-b font-semibold">Admin</div>
      <nav className="p-4 space-y-2">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className={`block px-3 py-2 rounded ${
              loc.startsWith(it.to)
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
