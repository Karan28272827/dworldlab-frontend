import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="howitworks-section">
      <p className="howitworks-small">Easy</p>
      <h1 className="howitworks-title">How It Works</h1>
      <p className="howitworks-subtitle">
        Follow these simple steps to get started.
      </p>

      <div className="howitworks-grid">
        <div className="howitworks-card">
          <p className="card-label">Steps</p>
          <h2 className="card-title">Get Results in Just Three Steps</h2>
          <p className="card-desc">
            Choose a tool and start using it instantly.
          </p>
          <a className="card-link" href="#">
            Start &gt;
          </a>
        </div>

        <div className="howitworks-image">
          <img
            src="/images/Placeholder Image-3.png"
            alt="Person using laptop"
          />
        </div>

        <div className="howitworks-card">
          <p className="card-label">Upload</p>
          <h2 className="card-title">Upload Your Data</h2>
          <p className="card-desc">
            Easily upload files or input data for processing.
          </p>
          <a className="card-link" href="#">
            Process &gt;
          </a>
        </div>

        <div className="howitworks-card">
          <p className="card-label">Receive</p>
          <h2 className="card-title">Get Your Results</h2>
          <p className="card-desc">
            Your results are ready for download or use.
          </p>
          <a className="card-link" href="#">
            Download &gt;
          </a>
        </div>

        <div className="howitworks-image">
          <img
            src="/images/Placeholder Image-4.png"
            alt="People working together"
          />
        </div>

        <div className="howitworks-image">
          <img
            src="/images/Placeholder Image-5.png"
            alt="Team reviewing results"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
