// src/components/BlogCard.jsx
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition">
      
      {/* Image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}

      <div className="p-5">
        {/* Category */}
        {blog.category && (
          <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            {blog.category}
          </span>
        )}

        {/* Title */}
        <h3 className="mt-3 text-xl font-semibold">
          {blog.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {blog.summary}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            📅 {new Date(blog.publishedAt).toLocaleDateString()}
          </span>
          <span>✍️ {blog.author}</span>
        </div>

        {/* Read more */}
        <Link
          to={`/blogs/${blog._id}`}
          className="mt-4 inline-block text-purple-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
