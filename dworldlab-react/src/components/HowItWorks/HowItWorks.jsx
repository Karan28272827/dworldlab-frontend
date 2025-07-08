import React from "react";
import "./HowItWorks.css";
import { FileText, Upload, Download } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Step 1: Choose Your Desired Tool",
    description: "Browse our collection and select a tool.",
  },
  {
    icon: Upload,
    title: "Step 2: Upload Your Data",
    description: "Easily upload your files or input data.",
  },
  {
    icon: Download,
    title: "Step 3: Get Instant Results",
    description: "Receive your results quickly and efficiently.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works__container">
        <div className="how-it-works__header">
          <span className="how-it-works__label">Simple</span>
          <h2 className="how-it-works__title">
            Effortlessly Use Our Tools in Three Steps
          </h2>
          <p className="how-it-works__subtitle">
            Get started by selecting the tool you need. Upload your data, and
            receive instant results with ease.
          </p>
        </div>

        <div className="how-it-works__steps">
          {steps.map((step, index) => (
            <div key={index} className="how-it-works__step">
              <step.icon className="how-it-works__icon" strokeWidth={2} />
              <h3 className="how-it-works__step-title">{step.title}</h3>
              <p className="how-it-works__step-description">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="how-it-works__buttons">
          <button className="how-it-works__button how-it-works__button--primary">
            Start
          </button>
          <button className="how-it-works__button how-it-works__button--secondary">
            Launch
            <svg
              className="how-it-works__arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
