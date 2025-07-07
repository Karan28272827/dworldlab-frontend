import React from "react";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  staggerContainer,
} from "../../hooks/useScrollAnimation";
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
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
          }}
        >
          <div className="footer-contact-icon email" />
          <div>
            <div className="footer-contact-title">Email</div>
            <div className="footer-contact-desc">
              Reach out to us anytime with your inquiries.
            </div>
            <a
              className="footer-contact-link"
              href="mailto:support@utilitytools.com"
            >
              support@utilitytools.com
            </a>
          </div>
        </motion.div>
        <motion.div
          className="footer-contact-item"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, delay: 0.1 },
            },
          }}
        >
          <div className="footer-contact-icon phone" />
          <div>
            <div className="footer-contact-title">Phone</div>
            <div className="footer-contact-desc">
              Call us for immediate assistance or questions.
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
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, delay: 0.2 },
            },
          }}
        >
          <div className="footer-contact-icon office" />
          <div>
            <div className="footer-contact-title">Office</div>
            <div className="footer-contact-desc">
              Visit us at our headquarters for direct support.
            </div>
            <a
              className="footer-contact-link"
              href="https://maps.google.com/?q=456+Example+Ave,+New+York+NY+10001+US"
              target="_blank"
              rel="noopener noreferrer"
            >
              456 Example Ave, New York, NY 10001 US
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Footer Section: Logo + Nav (left), Newsletter (right) */}
      <motion.div
        className="footer-main-row"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="footer-main-left">
          <div className="footer-logo">Logo</div>
          <nav className="footer-nav">
            <a className="footer-link" href="#">
              Home Page
            </a>
            <a className="footer-link" href="#">
              Tool Overview
            </a>
            <a className="footer-link" href="#">
              Blog Updates
            </a>
            <a className="footer-link" href="#">
              FAQs
            </a>
            <a className="footer-link" href="#">
              Contact Us
            </a>
          </nav>
        </div>
        <div className="footer-main-right">
          <div className="footer-newsletter-text">Join</div>
          <form className="footer-newsletter-form">
            <input
              className="footer-newsletter-input"
              type="email"
              placeholder="Your Email Here"
            />
            <button className="footer-newsletter-btn" type="submit">
              Join
            </button>
          </form>
          <div className="footer-newsletter-privacy">
            By joining you accept our Privacy Policy.{' '}
            <a href="#">By joining you accept our Privacy Policy.</a>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        <div className="footer-bottom-links">
          <a className="footer-bottom-link" href="#">
            Privacy Policy
          </a>
          <a className="footer-bottom-link" href="#">
            Terms of Use
          </a>
          <a className="footer-bottom-link" href="#">
            Cookie Settings
          </a>
        </div>
        <div className="footer-bottom-link">
          © 2025 Relume. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
