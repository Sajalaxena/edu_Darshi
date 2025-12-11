// src/pages/BlogDetails.jsx
import { useParams } from "react-router-dom";

export default function BlogDetails() {

const BLOGS = [
  {
    id: "b1",
    title: "Understanding Artificial Intelligence",
    date: "2025-12-06",
    category: "AI",
    author: "Dr. Gyan",
    image: "/assets/blog1.jpg",
    shortDescription: "Explore how AI is transforming healthcare, finance, and everyday life.",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence (AI) is reshaping the world...</p>

      <h3>Impact of AI</h3>
      <p>From automation to deep learning...</p>

      <h3>Conclusion</h3>
      <p>The future of AI is incredibly promising...</p>
    `,
  },
  {
    id: "b2",
    title: "Machine Learning Basics",
    date: "2025-12-06",
    category: "ML",
    author: "Sajal Saxena",
    image: "/assets/blog2.jpg",
    shortDescription: "A beginner-friendly guide to machine learning concepts.",
    content: `
      <h2>What is ML?</h2>
      <p>Machine learning (ML) is a subset of AI that allows systems to learn...</p>

      <h3>Why ML Matters</h3>
      <p>ML powers recommendations, predictions...</p>
    `,
  }
];

  const { id } = useParams();
  const blog = BLOGS.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-6 py-10 max-w-4xl">
      <img
        src={blog.image}
        alt={blog.title}
        className="rounded-xl w-full h-64 object-cover shadow-md"
      />

      <h1 className="mt-6 text-4xl font-bold">{blog.title}</h1>

      <div className="mt-3 flex items-center gap-4 text-gray-600 text-sm">
        <span>📅 {blog.date}</span>
        <span>✍️ {blog.author}</span>
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
          {blog.category}
        </span>
      </div>

      <div
        className="mt-8 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </article>
  );
}
