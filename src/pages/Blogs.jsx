// src/pages/Blogs.jsx
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

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
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Latest Blogs
      </h1>

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
