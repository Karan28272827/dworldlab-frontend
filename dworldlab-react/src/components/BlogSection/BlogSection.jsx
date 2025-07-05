import React from "react";
import "./BlogSection.css";

const BlogSection = () => (
  <section className="blog-section">
    <div className="blog-header">
      <span className="blog-label">Blog</span>
      <h2 className="blog-title">Latest Insights and Tips</h2>
      <p className="blog-subtitle">Explore our latest articles and updates.</p>
    </div>
    <div className="blog-cards">
      <div className="blog-card">
        <img
          className="blog-card-image"
          src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=420&h=220&fit=crop"
          alt="Maximize Your Tool Usage"
        />
        <div className="blog-card-meta">
          <span className="blog-card-tag">Updates</span>
          <span className="blog-card-dot">•</span>
          <span className="blog-card-time">5 min read</span>
        </div>
        <h3 className="blog-card-title">Maximize Your Tool Usage</h3>
        <p className="blog-card-desc">
          Learn how to get the most from our tools.
        </p>
        <a className="blog-card-link" href="/">
          Read more <span className="arrow">&rarr;</span>
        </a>
      </div>
      <div className="blog-card">
        <img
          className="blog-card-image"
          src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&w=420&h=220&fit=crop"
          alt="Understanding File Conversions"
        />
        <div className="blog-card-meta">
          <span className="blog-card-tag">Guides</span>
          <span className="blog-card-dot">•</span>
          <span className="blog-card-time">5 min read</span>
        </div>
        <h3 className="blog-card-title">Understanding File Conversions</h3>
        <p className="blog-card-desc">
          A simple guide to converting files effortlessly.
        </p>
        <a className="blog-card-link" href="/">
          Read more <span className="arrow">&rarr;</span>
        </a>
      </div>
    </div>
  </section>
);

export default BlogSection;
