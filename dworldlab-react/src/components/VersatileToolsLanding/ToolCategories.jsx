import React from "react";
import "./ToolCategories.css";

const categories = [
  {
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    title: "File Converters for Every Need",
    description: "Easily convert files between formats with just a few clicks.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    title: "Essential Calculators at Your Fingertips",
    description: "Calculate age, BMI, and more effortlessly.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    title: "Everyday Utilities for Quick Solutions",
    description: "Utilize tools like speech-to-text for convenience.",
  },
];

export default function ToolCategories() {
  return (
    <div className="tool-container">
      <div className="tool-header">
        <p className="tool-subtitle">Tools</p>
        <h2 className="tool-title">Explore Our Versatile Tool Categories</h2>
        <p className="tool-desc">
          Discover a wide range of free tools designed to simplify your digital
          tasks. From file conversions to calculators, we have everything you
          need in one place.
        </p>
      </div>

      <div className="tool-grid">
        {categories.map((item, i) => (
          <div className="tool-card_1" key={i}>
            <img src={item.image} alt={item.title} className="tool-image" />
            <h3 className="tool-card_1-title">{item.title}</h3>
            <p className="tool-card_1-desc">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="tool-buttons">
        <button className="launch-btn">Launch</button>
        <button className="try-btn">
          Try
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
}
