import React from "react";
import "./FAQSection.css";

const FAQSection = () => (
  <section className="faq-section">
    <h2 className="faq-title">FAQs</h2>
    <p className="faq-subtitle">
      Find answers to your most common questions about our tools and services.
    </p>
    <div className="faq-list">
      <div className="faq-item">
        <div className="faq-question">Is it really free?</div>
        <div className="faq-answer">
          Yes, all our tools are completely free to use. There are no hidden
          fees or subscriptions. Enjoy unlimited access without any charges.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-question">How is my data handled?</div>
        <div className="faq-answer">
          We prioritize your privacy and security. Data is processed temporarily
          and not stored after use. You can use our tools with confidence.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-question">Is it mobile-friendly?</div>
        <div className="faq-answer">
          Absolutely! Our platform is designed to work seamlessly on mobile
          devices. You can access all tools on the go, ensuring convenience.
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-question">Do I need to register?</div>
        <div className="faq-answer">
          No registration is required to use our tools. Simply visit the site
          and start using the utilities you need. It's that easy!
        </div>
      </div>
      <div className="faq-item">
        <div className="faq-question">What if I have more questions?</div>
        <div className="faq-answer">
          We're here to help! If you have any additional questions or need
          assistance, feel free to reach out. Your feedback is always welcome.
        </div>
      </div>
    </div>
    <div className="faq-footer">
      <h3 className="faq-footer-title">Still have questions?</h3>
    </div>
  </section>
);

export default FAQSection;
