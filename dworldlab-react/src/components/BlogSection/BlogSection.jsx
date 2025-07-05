import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainer } from "../../hooks/useScrollAnimation";
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

const BlogSection = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section className="blog-section">
      <motion.div 
        className="blog-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="blog-label">Blog</span>
        <h2 className="blog-title">Latest Insights and Tips</h2>
        <p className="blog-subtitle">Explore our latest articles and updates.</p>
      </motion.div>
      <motion.div 
        className="blog-grid"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {blogPosts.map((post, index) => (
          <motion.div 
            className="blog-article" 
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
            }}
          >
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BlogSection;
