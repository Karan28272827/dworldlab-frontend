import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainer } from "../../hooks/useScrollAnimation";
import "./HowItWorks.css";

const HowItWorks = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <div className="howitworks-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="howitworks-small">Easy</p>
        <h1 className="howitworks-title">How It Works</h1>
        <p className="howitworks-subtitle">
          Follow these simple steps to get started.
        </p>
      </motion.div>

      <motion.div 
        className="howitworks-grid"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div 
          className="howitworks-card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <p className="card-label">Steps</p>
          <h2 className="card-title">Get Results in Just Three Steps</h2>
          <p className="card-desc">
            Choose a tool and start using it instantly.
          </p>
          <a className="card-link" href="#">
            Start &gt;
          </a>
        </motion.div>

        <motion.div 
          className="howitworks-image"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.1 } }
          }}
        >
          <img
            src="/images/Placeholder Image-3.png"
            alt="Person using laptop"
          />
        </motion.div>

        <motion.div 
          className="howitworks-card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
          }}
        >
          <p className="card-label">Upload</p>
          <h2 className="card-title">Upload Your Data</h2>
          <p className="card-desc">
            Easily upload files or input data for processing.
          </p>
          <a className="card-link" href="#">
            Process &gt;
          </a>
        </motion.div>

        <motion.div 
          className="howitworks-card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
          }}
        >
          <p className="card-label">Receive</p>
          <h2 className="card-title">Get Your Results</h2>
          <p className="card-desc">
            Your results are ready for download or use.
          </p>
          <a className="card-link" href="#">
            Download &gt;
          </a>
        </motion.div>

        <motion.div 
          className="howitworks-image"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } }
          }}
        >
          <img
            src="/images/Placeholder Image-4.png"
            alt="People working together"
          />
        </motion.div>

        <motion.div 
          className="howitworks-image"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5 } }
          }}
        >
          <img
            src="/images/Placeholder Image-5.png"
            alt="Team reviewing results"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
