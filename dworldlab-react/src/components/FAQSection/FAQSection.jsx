import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainer } from "../../hooks/useScrollAnimation";
import "./FAQSection.css";

const FAQSection = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section className="faq-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="faq-title">FAQs</h2>
        <p className="faq-subtitle">
          Find answers to your most common questions about our tools and services.
        </p>
      </motion.div>
      <motion.div 
        className="faq-list"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div 
          className="faq-item"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <div className="faq-question">Is it really free?</div>
          <div className="faq-answer">
            Yes, all our tools are completely free to use. There are no hidden
            fees or subscriptions. Enjoy unlimited access without any charges.
          </div>
        </motion.div>
        <motion.div 
          className="faq-item"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
          }}
        >
          <div className="faq-question">How is my data handled?</div>
          <div className="faq-answer">
            We prioritize your privacy and security. Data is processed temporarily
            and not stored after use. You can use our tools with confidence.
          </div>
        </motion.div>
        <motion.div 
          className="faq-item"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
          }}
        >
          <div className="faq-question">Is it mobile-friendly?</div>
          <div className="faq-answer">
            Absolutely! Our platform is designed to work seamlessly on mobile
            devices. You can access all tools on the go, ensuring convenience.
          </div>
        </motion.div>
        <motion.div 
          className="faq-item"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
          }}
        >
          <div className="faq-question">Do I need to register?</div>
          <div className="faq-answer">
            No registration is required to use our tools. Simply visit the site
            and start using the utilities you need. It's that easy!
          </div>
        </motion.div>
        <motion.div 
          className="faq-item"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }
          }}
        >
          <div className="faq-question">What if I have more questions?</div>
          <div className="faq-answer">
            We're here to help! If you have any additional questions or need
            assistance, feel free to reach out. Your feedback is always welcome.
          </div>
        </motion.div>
      </motion.div>
      <motion.div 
        className="faq-footer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <h3 className="faq-footer-title">Still have questions?</h3>
        <button className="contact-us-btn">Contact Us</button>
      </motion.div>
    </section>
  );
};

export default FAQSection;
