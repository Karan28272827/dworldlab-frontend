import React, { useState } from "react";
import "./Base64Coder.css";

const Base64Coder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch (e) {
      setOutput("Error: " + e.message);
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      setOutput("Error: Invalid Base64 string.");
    }
  };

  return (
    <div className="tool-ui">
      <label htmlFor="base64Input">Input:</label>
      <textarea
        id="base64Input"
        placeholder="Enter text to encode or decode"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="glow-button" onClick={handleEncode}>
          Encode
        </button>
        <button className="glow-button" onClick={handleDecode}>
          Decode
        </button>
      </div>
      <div id="base64Output" className="tool-output">
        {output}
      </div>
    </div>
  );
};

export default Base64Coder;
