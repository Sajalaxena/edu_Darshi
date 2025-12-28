// src/pages/Blogs.jsx
import BlogCard from "../components/BlogCard";
import blog1 from "../assets/Blog1.png";

export default function Blogs() {
  const BLOGS = [
    {
      id: "b1",
      title: "Understanding Artificial Intelligence",
      date: "2025-12-06",
      category: "AI",
      author: "Dr. Gyan",
      image: blog1,
      shortDescription:
        "Explore how AI is transforming healthcare, finance, and everyday life.",
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
      image: blog1,
      shortDescription:
        "A beginner-friendly guide to machine learning concepts.",
      content: `
      <h2>What is ML?</h2>
      <p>Machine learning (ML) is a subset of AI that allows systems to learn...</p>

      <h3>Why ML Matters</h3>
      <p>ML powers recommendations, predictions...</p>
    `,
    },
  ];

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Latest Blogs
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BLOGS.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
