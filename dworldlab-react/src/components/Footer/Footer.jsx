import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainer } from "../../hooks/useScrollAnimation";
import "./Footer.css";

const Footer = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <footer className="footer">
      <motion.div 
        className="footer-contact"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
              <motion.div 
          className="footer-contact-item"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >
          <div className="footer-contact-icon email" />
          <div>
            <div className="footer-contact-title">Email</div>
            <div className="footer-contact-desc">
              We value your feedback and suggestions to improve our tools.
            </div>
            <a
              className="footer-contact-link"
              href="mailto:support@utilityplatform.com"
            >
              support@utilityplatform.com
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="footer-contact-item"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } }
          }}
        >
          <div className="footer-contact-icon phone" />
          <div>
            <div className="footer-contact-title">Phone</div>
            <div className="footer-contact-desc">
              Reach out to us for any inquiries or assistance.
            </div>
            <a className="footer-contact-link" href="tel:+15551234567">
              +1 (555) 123-4567
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="footer-contact-item"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
          }}
        >
          <div className="footer-contact-icon office" />
          <div>
            <div className="footer-contact-title">Office</div>
            <div className="footer-contact-desc">
              Visit us at our headquarters for any direct inquiries.
            </div>
            <a
              className="footer-contact-link"
              href="https://maps.google.com/?q=456+Example+Ave,+New+York+NY+10001+US"
              target="_blank"
              rel="noopener noreferrer"
            >
              456 Example Ave, New York NY 10001 US
            </a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div 
        className="footer-main"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
      <div className="footer-newsletter">
        <div className="footer-logo">Logo</div>
        <div className="footer-newsletter-text">
          Subscribe to our newsletter for the latest features and updates.
        </div>
        <form className="footer-newsletter-form">
          <input
            className="footer-newsletter-input"
            type="email"
            placeholder="Your email here"
          />
          <button className="footer-newsletter-btn" type="submit">
            Join
          </button>
        </form>
        <div className="footer-newsletter-privacy">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-links-group">
          <div className="footer-links-title">Useful Links</div>
          <a href="#" className="footer-link">
            Tool Overview
          </a>
          <a href="#" className="footer-link">
            Blog Updates
          </a>
          <a href="#" className="footer-link">
            FAQs
          </a>
          <a href="#" className="footer-link">
            Contact Us
          </a>
          <a href="#" className="footer-link">
            Support Center
          </a>
        </div>
        <div className="footer-links-group">
          <div className="footer-links-title">Connect With Us</div>
          <a href="#" className="footer-link">
            Facebook Page
          </a>
          <a href="#" className="footer-link">
            Instagram Feed
          </a>
          <a href="#" className="footer-link">
            Twitter Profile
          </a>
          <a href="#" className="footer-link">
            LinkedIn Page
          </a>
          <a href="#" className="footer-link">
            YouTube Channel
          </a>
        </div>
        <div className="footer-links-group">
          <div className="footer-links-title">Stay Updated</div>
          <a href="#" className="footer-link">
            Facebook
          </a>
          <a href="#" className="footer-link">
            Instagram
          </a>
          <a href="#" className="footer-link">
            Twitter
          </a>
          <a href="#" className="footer-link">
            LinkedIn
          </a>
          <a href="#" className="footer-link">
            YouTube
          </a>
        </div>
      </div>
      </motion.div>
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        <div className="footer-bottom-link">
          © 2025 Resume. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">
            Privacy Policy
          </a>
          <a href="#" className="footer-bottom-link">
            Terms of Service
          </a>
          <a href="#" className="footer-bottom-link">
            Cookie Settings
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
