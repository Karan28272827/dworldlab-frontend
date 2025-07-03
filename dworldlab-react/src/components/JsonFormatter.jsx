import React, { useState } from "react";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 4));
      setIsError(false);
    } catch (e) {
      setOutput(`Invalid JSON: ${e.message}`);
      setIsError(true);
    }
  };

  return (
    <div className="tool-ui">
      <textarea
        id="jsonInput"
        placeholder="Paste your JSON here..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button className="glow-button" onClick={handleFormat}>Format</button>
      <pre
        id="jsonOutput"
        className={`tool-output${isError ? " error" : " success"}`}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {output}
      </pre>
    </div>
  );
};

export default JsonFormatter; 