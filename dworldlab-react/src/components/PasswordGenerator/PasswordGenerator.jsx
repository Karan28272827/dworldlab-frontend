import React, { useState } from "react";
import "./PasswordGenerator.css";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [output, setOutput] = useState(
    'Click "Generate" to create a password.',
  );

  const handleGenerate = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let charset = "";
    if (useUpper) charset += upper;
    if (useLower) charset += lower;
    if (useNumbers) charset += numbers;
    if (useSymbols) charset += symbols;
    if (charset === "") {
      setOutput("Please select at least one character type.");
      return;
    }
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setOutput(password);
  };

  return (
    <div className="tool-ui">
      <label htmlFor="pwLength">
        Length: <span>{length}</span>
      </label>
      <input
        type="range"
        id="pwLength"
        min={8}
        max={64}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <label>
        <input
          type="checkbox"
          checked={useUpper}
          onChange={(e) => setUseUpper(e.target.checked)}
        />{" "}
        Uppercase (A-Z)
      </label>
      <label>
        <input
          type="checkbox"
          checked={useLower}
          onChange={(e) => setUseLower(e.target.checked)}
        />{" "}
        Lowercase (a-z)
      </label>
      <label>
        <input
          type="checkbox"
          checked={useNumbers}
          onChange={(e) => setUseNumbers(e.target.checked)}
        />{" "}
        Numbers (0-9)
      </label>
      <label>
        <input
          type="checkbox"
          checked={useSymbols}
          onChange={(e) => setUseSymbols(e.target.checked)}
        />{" "}
        Symbols (!@#$)
      </label>
      <button className="glow-button" onClick={handleGenerate}>
        Generate
      </button>
      <div className="tool-output">{output}</div>
    </div>
  );
};

export default PasswordGenerator;
