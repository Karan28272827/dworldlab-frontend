import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainer } from "../../hooks/useScrollAnimation";
import "./Features.css";

const FeaturesPage = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <div className="features-page">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Discover the ultimate suite of free tools <br /> at your fingertips.
      </motion.h2>

      <motion.div 
        className="features-grid"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div 
          className="feature-card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <img src="/images/Placeholder Image.png" alt="Feature 1" />
          <h3>
            Experience seamless digital tasks with our user-friendly platform.
          </h3>
          <p>
            Enjoy free access to a variety of tools without any login
            requirements.
          </p>
          <span className="link-button">Explore ➔</span>
        </motion.div>

        <motion.div 
          className="feature-card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
          }}
        >
          <img src="/images/Placeholder Image-1.png" alt="Feature 2" />
          <h3>Access our tools anytime, anywhere on any device.</h3>
          <p>Our platform is designed to be fast and secure for all users.</p>
          <span className="link-button">Try ➔</span>
        </motion.div>

        <motion.div 
          className="feature-card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
          }}
        >
          <img src="/images/Placeholder Image-2.png" alt="Feature 3" />
          <h3>
            Enjoy a minimalistic user interface that enhances your experience.
          </h3>
          <p>
            Switch effortlessly between light and dark modes to suit your
            preference.
          </p>
          <span className="link-button">Toggle ➔</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;
