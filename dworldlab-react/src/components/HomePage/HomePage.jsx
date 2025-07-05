import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainer } from "../../hooks/useScrollAnimation";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { ref: toolsRef, isInView: toolsInView } = useScrollAnimation(0.2);
  const { ref: articlesRef, isInView: articlesInView } = useScrollAnimation(0.2);
  const { ref: blogRef, isInView: blogInView } = useScrollAnimation(0.2);

  return (
    <div className="container">
      <motion.nav 
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
      </motion.nav>

      <div className="main-content">
        <motion.div 
          className="tools-section"
          ref={toolsRef}
          initial="hidden"
          animate={toolsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Explore Our Tools
          </motion.h2>
          <motion.ul 
            className="tools-list"
            variants={staggerContainer}
          >
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
              <motion.li 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
              >
                <span className="icon">📦</span>
                <div>
                  <Link to={path} className="tool-link">
                    <strong>{title}</strong>
                  </Link>
                  <p>{desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div 
          className="articles-section"
          ref={articlesRef}
          initial="hidden"
          animate={articlesInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Recent Articles
          </motion.h2>
          <motion.ul 
            className="articles-list"
            variants={staggerContainer}
          >
            {[
              ["Latest Tips", "Stay updated with our latest blog posts."],
              ["Tool Guides", "Learn how to use our tools effectively."],
              ["User Feedback", "Share your thoughts and suggestions with us."],
              ["Contact Us", "Reach out for support or inquiries."],
            ].map(([title, desc], idx) => (
              <motion.li 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
              >
                <span className="icon">📦</span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div 
          className="blog-sidebar"
          ref={blogRef}
          initial="hidden"
          animate={blogInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            From Our Blog
          </motion.h3>
          <motion.div 
            className="blog-card"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
          >
            <div className="image-placeholder" />
            <div>
              <h4>Tool Spotlight</h4>
              <p>Discover our featured tool of the week.</p>
              <a href="#">Read more</a>
            </div>
          </motion.div>
          <motion.div 
            className="blog-card"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
            }}
          >
            <div className="image-placeholder" />
            <div>
              <h4>Tips & Tricks</h4>
              <p>Explore helpful tips for using our tools.</p>
              <a href="#">Read more</a>
            </div>
          </motion.div>
          <motion.button 
            className="more-button"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
            }}
          >
            Button <span>➤</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
