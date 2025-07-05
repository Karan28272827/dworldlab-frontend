import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainer } from "../../hooks/useScrollAnimation";
import styles from "./VersatileToolsLanding.module.css";

const VersatileToolsLanding = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <div className={styles.toolssection}>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Discover Our Versatile Tools for Everyday Digital Tasks
      </motion.h1>

      <motion.div 
        className={styles.toolsgrid}
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div 
          className={styles.toolcard}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2>
            Effortlessly Convert, Calculate, and Utilize with Our Free Tools
          </h2>
          <p className={styles.toolcarddesc}>
            Explore a wide range of tools designed to simplify your digital
            life.
          </p>
          <a className={styles.toolcardlink} href="#">
            Launch &gt;
          </a>
        </motion.div>

        <motion.div 
          className={styles.toolcard}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
          }}
        >
          <h2>
            Transform Your Files Instantly <br />
            with Our Free Converters
          </h2>
          <p className={styles.toolcarddesc}>
            Convert images and documents effortlessly between various formats.
          </p>
          <a className={styles.toolcardlink} href="#">
            Convert &gt;
          </a>
        </motion.div>

        <motion.div 
          className={styles.toolcard}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
          }}
        >
          <h2>
            Calculate Your Metrics with Our <br />
            User-Friendly Calculators
          </h2>
          <p className={styles.toolcarddesc}>
            Get accurate results for age, BMI, and more in seconds.
          </p>
          <a className={styles.toolcardlink} href="#">
            Calculate &gt;
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VersatileToolsLanding;
