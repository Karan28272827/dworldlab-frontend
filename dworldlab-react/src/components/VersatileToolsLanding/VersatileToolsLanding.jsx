import React from "react";
import styles from "./VersatileToolsLanding.module.css";

const VersatileToolsLanding = () => {
  return (
    <div className={styles.toolssection}>
      <h1>Discover Our Versatile Tools for Everyday Digital Tasks</h1>

      <div className={styles.toolsgrid}>
        <div className={styles.toolcard}>
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
        </div>

        <div className={styles.toolcard}>
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
        </div>

        <div className={styles.toolcard}>
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
        </div>
      </div>
    </div>
  );
};

export default VersatileToolsLanding;
