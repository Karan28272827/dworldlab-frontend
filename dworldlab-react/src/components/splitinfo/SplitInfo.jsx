import "./SplitInfo.css";

export default function SplitInfo() {
  return (
    <section className="split-section">
      <div className="split-container">
        {/* Text Section */}
        <div className="split-text">
          <h2 className="split-heading">
            Empowering your digital tasks with simplicity, speed, and
            accessibility.
          </h2>
          <p className="split-paragraph">
            Our platform is designed to streamline your daily digital tasks
            effortlessly. Enjoy fast, user-friendly tools that are accessible
            anytime, anywhere.
          </p>
        </div>

        {/* Image Section */}
        <div className="split-image-container">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
            alt="Person working on digital tasks"
            className="split-image"
          />
        </div>
      </div>
    </section>
  );
}
