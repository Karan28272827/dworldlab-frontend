import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./LandingPage.css";

const LandingPage = () => {
  const { ref, isInView } = useScrollAnimation(0.3);

  return (
    <div className="landing-page">
      <div className="overlay">
        <motion.h1
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Streamline Your Digital
          <br />
          Tasks Effortlessly
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Discover a suite of over 20 free tools designed to simplify your daily
          digital tasks. From file conversions to calculators, everything you
          need is just a click away.
        </motion.p>
        <motion.div 
          className="buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button className="explore-btn">Explore</button>
          <button className="learn-btn">Learn More</button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
