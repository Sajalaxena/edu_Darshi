// src/components/BlogCard.jsx
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {  
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
          {blog.category}
        </span>

        <h3 className="mt-3 text-xl font-semibold">{blog.title}</h3>

        <p className="text-sm text-gray-600 mt-2">{blog.shortDescription}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>📅 {blog.date}</span>
          <span>✍️ {blog.author}</span>
        </div>

        <Link
          to={`/blogs/${blog.id}`}
          className="mt-4 inline-block text-purple-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
