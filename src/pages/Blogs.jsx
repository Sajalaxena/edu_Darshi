// src/pages/Blogs.jsx
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import MathematicalBackground from "../components/MathematicalBackground";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-10">
                          <MathematicalBackground />    

     <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8" style={{ color: "var(--brand, #2563EB)" }}>
          Our Blogs
        </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-slate-500">No blogs available</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
}
