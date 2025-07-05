import React from "react";
import "./Features.css";

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <h2>
        Discover the ultimate suite of free tools <br /> at your fingertips.
      </h2>

      <div className="features-grid">
        <div className="feature-card">
          <img src="/images/Placeholder Image.png" alt="Feature 1" />
          <h3>
            Experience seamless digital tasks with our user-friendly platform.
          </h3>
          <p>
            Enjoy free access to a variety of tools without any login
            requirements.
          </p>
          <span className="link-button">Explore ➔</span>
        </div>

        <div className="feature-card">
          <img src="/images/Placeholder Image-1.png" alt="Feature 2" />
          <h3>Access our tools anytime, anywhere on any device.</h3>
          <p>Our platform is designed to be fast and secure for all users.</p>
          <span className="link-button">Try ➔</span>
        </div>

        <div className="feature-card">
          <img src="/images/Placeholder Image-2.png" alt="Feature 3" />
          <h3>
            Enjoy a minimalistic user interface that enhances your experience.
          </h3>
          <p>
            Switch effortlessly between light and dark modes to suit your
            preference.
          </p>
          <span className="link-button">Toggle ➔</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
