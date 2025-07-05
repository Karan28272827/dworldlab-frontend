import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>
          Streamline Your Digital
          <br />
          Tasks Effortlessly
        </h1>
        <p>
          Discover a suite of over 20 free tools designed to simplify your daily
          digital tasks. From file conversions to calculators, everything you
          need is just a click away.
        </p>
        <div className="buttons">
          <button className="explore-btn">Explore</button>
          <button className="learn-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
