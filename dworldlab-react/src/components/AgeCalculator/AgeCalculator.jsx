import React, { useState } from "react";
import "./AgeCalculator.css";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [output, setOutput] = useState("");

  const handleCalculate = () => {
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      setOutput("Please select a valid date.");
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    setOutput(`You are ${age} years old.`);
  };

  return (
    <div className="tool-ui">
      <label htmlFor="birthDate">Your Date of Birth:</label>
      <input
        type="date"
        id="birthDate"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <button className="glow-button" onClick={handleCalculate}>
        Calculate Age
      </button>
      <div id="ageOutput" className="tool-output">
        {output}
      </div>
    </div>
  );
};

export default AgeCalculator;
