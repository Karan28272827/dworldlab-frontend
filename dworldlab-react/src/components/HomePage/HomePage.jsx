import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <ul className="nav-links">
          <li>Home Tools</li>
          <li>About Us</li>
          <li>Blog Updates</li>
          <li>Support Center ▾</li>
        </ul>
        <div className="nav-buttons">
          <button className="join-btn">Join</button>
          <button className="submit-btn">Submit</button>
        </div>
      </nav>

      <div className="main-content">
        <div className="tools-section">
          <h2>Explore Our Tools</h2>
          <ul className="tools-list">
            {[
              [
                "File Converters",
                "Convert files easily with our free tools.",
                "/file-converters",
              ],
              [
                "Calculators",
                "Calculate anything quickly and accurately.",
                "/calculators",
              ],
              [
                "Utilities",
                "Access everyday tools for your convenience.",
                "/utilities",
              ],
              [
                "More Tools",
                "Discover additional features and functionalities.",
                "/more-tools",
              ],
            ].map(([title, desc, path], idx) => (
              <li key={idx}>
                <span className="icon">📦</span>
                <div>
                  <Link to={path} className="tool-link">
                    <strong>{title}</strong>
                  </Link>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>{" "}
        </div>

        <div className="articles-section">
          <h2>Recent Articles</h2>
          <ul className="articles-list">
            {[
              ["Latest Tips", "Stay updated with our latest blog posts."],
              ["Tool Guides", "Learn how to use our tools effectively."],
              ["User Feedback", "Share your thoughts and suggestions with us."],
              ["Contact Us", "Reach out for support or inquiries."],
            ].map(([title, desc], idx) => (
              <li key={idx}>
                <span className="icon">📦</span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="blog-sidebar">
          <h3>From Our Blog</h3>
          <div className="blog-card">
            <div className="image-placeholder" />
            <div>
              <h4>Tool Spotlight</h4>
              <p>Discover our featured tool of the week.</p>
              <a href="#">Read more</a>
            </div>
          </div>
          <div className="blog-card">
            <div className="image-placeholder" />
            <div>
              <h4>Tips & Tricks</h4>
              <p>Explore helpful tips for using our tools.</p>
              <a href="#">Read more</a>
            </div>
          </div>
          <button className="more-button">
            Button <span>➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
