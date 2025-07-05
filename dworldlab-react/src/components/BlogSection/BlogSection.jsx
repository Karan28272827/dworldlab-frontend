import React from "react";
import "./BlogSection.css";

const blogPosts = [
  {
    title: "Maximize Your Tool Usage",
    description: "Learn how to get the most from our tools.",
    tag: "Updates",
    time: "5 min read",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=1200&h=800&fit=crop",
    alt: "Maximize Your Tool Usage",
    link: "/",
  },
  {
    title: "Understanding File Conversions",
    description: "A simple guide to converting files effortlessly.",
    tag: "Guides",
    time: "5 min read",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&w=1200&h=800&fit=crop",
    alt: "Understanding File Conversions",
    link: "/",
  },
];

const BlogSection = () => (
  <section className="blog-section">
    <div className="blog-header">
      <span className="blog-label">Blog</span>
      <h2 className="blog-title">Latest Insights and Tips</h2>
      <p className="blog-subtitle">Explore our latest articles and updates.</p>
    </div>
    <div className="blog-grid">
      {blogPosts.map((post, index) => (
        <div className="blog-article" key={index}>
          <img className="blog-article-image" src={post.image} alt={post.alt} />
          <div className="blog-article-meta">
            <span className="blog-article-tag">{post.tag}</span>
            <span className="blog-article-dot">•</span>
            <span className="blog-article-time">{post.time}</span>
          </div>
          <h3 className="blog-article-title">{post.title}</h3>
          <p className="blog-article-desc">{post.description}</p>
          <a className="blog-article-link" href={post.link}>
            Read more <span className="arrow">›</span>
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default BlogSection;
