import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MathematicalBackground from "../components/MathematicalBackground";
import rehypeRaw from "rehype-raw";

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

  if (loading) return <div className="text-center py-10">Loading blog...</div>;
  if (!blog) return <div className="text-center py-10">Blog Not Found</div>;

  return (
    <article className="container mx-auto px-6 py-10 max-w-4xl">
      <MathematicalBackground />

            <h1 className="mt-6 text-4xl font-bold">{blog.title}</h1>


 {blog.imageUrl && (
  <div
    className="
      mt-6
      w-full
      flex
      justify-center
      bg-slate-100
      rounded-xl
      shadow-md
      overflow-hidden
    "
  >
    <img
      src={blog.imageUrl}
      alt={blog.title}
      className="
        w-auto
        max-w-full
        max-h-[220px]
        sm:max-h-[280px]
        md:max-h-[340px]
        lg:max-h-[380px]
        object-contain
      "
    />
  </div>
)}



      <div className="mt-3 flex flex-wrap gap-4 text-gray-600 text-sm">
        <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
        <span>✍️ {blog.author}</span>
        {blog.category && (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
            {blog.category}
          </span>
        )}
      </div>

      {/* ✅ MARKDOWN RENDER */}
      <div className="mt-8 prose prose-lg max-w-none">
        <ReactMarkdown  remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
