import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogCard({ blog }) {
  return (
    <article className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full">
      
      {/* Image with overlay */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center">
            <span className="text-purple-300 uppercase font-black tracking-widest text-2xl opacity-50">Edudarshi</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Category Badge over Image */}
        {blog.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-purple-700 rounded-full shadow-sm">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-600 mt-2 line-clamp-3 mb-6 leading-relaxed">
          {blog.summary}
        </p>

        {/* Meta Header */}
        <div className="mt-auto flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
            <Calendar size={14} className="text-slate-400" />
            <span>{new Date(blog.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
            <User size={14} className="text-slate-400" />
            <span className="capitalize">{blog.author || "Admin"}</span>
          </div>
        </div>

      </div>

      {/* Read More Footer */}
      <Link
        to={`/blogs/${blog._id}`}
        className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300"
      >
        <span>Read Full Article</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </article>
  );
}
