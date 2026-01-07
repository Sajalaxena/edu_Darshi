// src/pages/BlogDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MathematicalBackground from "../components/MathematicalBackground";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-6 py-10 max-w-4xl">
                          <MathematicalBackground />    

      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="rounded-xl w-full h-64 object-cover shadow-md"
        />
      )}

      <h1 className="mt-6 text-4xl font-bold">{blog.title}</h1>

      <div className="mt-3 flex flex-wrap gap-4 text-gray-600 text-sm">
        <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
        <span>✍️ {blog.author}</span>
        {blog.category && (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
            {blog.category}
          </span>
        )}
      </div>

      <div
        className="mt-8 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
