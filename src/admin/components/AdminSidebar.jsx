import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  Lightbulb,
  Video,
  Newspaper,
  MessageSquare,
  LayoutDashboard
} from "lucide-react";

export default function AdminSidebar() {
  const loc = useLocation().pathname;
  const items = [
    { to: "/admin/previous-paper/add", label: "Add Previous Paper", icon: FileText },
    { to: "/admin/research-news", label: "Research & News", icon: Newspaper },
    { to: "/admin/webinars", label: "Upcoming Webinars", icon: Video },
    { to: "/admin/blogs", label: "Blogs", icon: LayoutDashboard },
    { to: "/admin/qotd", label: "Question of the Day", icon: Lightbulb },
  ];

  return (
    <aside className="w-64 hidden lg:flex flex-col fixed inset-y-0 left-0 admin-glass z-50 border-r border-[#e2e8f0]">
      <div className="p-6 border-b border-[#e2e8f0] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
          E
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">EduDarshi</span>
      </div>

      <div className="px-4 py-3 text-xs font-semibold text-slate-400 tracking-wider uppercase">
        Management
      </div>

      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
        {items.map((it) => {
          const isActive = loc.startsWith(it.to);
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium ${isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <Icon size={18} className={isActive ? "text-indigo-600" : "text-slate-400"} />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#e2e8f0]">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-center text-xs text-slate-500">
          Admin Area v2.0
        </div>
      </div>
    </aside>
  );
}
