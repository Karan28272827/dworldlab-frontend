import React, { useState } from "react";

const BmiCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [output, setOutput] = useState("");

  const handleCalculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmi = (w / (h / 100) ** 2).toFixed(2);
      let category = "";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 24.9) category = "Normal weight";
      else if (bmi < 29.9) category = "Overweight";
      else category = "Obesity";
      setOutput(`Your BMI is ${bmi} (${category})`);
    } else {
      setOutput("Please enter valid height and weight.");
    }
  };

  return (
    <div className="tool-ui">
      <label htmlFor="bmiHeight">Height (cm):</label>
      <input
        type="number"
        id="bmiHeight"
        placeholder="e.g., 180"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <label htmlFor="bmiWeight">Weight (kg):</label>
      <input
        type="number"
        id="bmiWeight"
        placeholder="e.g., 75"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button className="glow-button" onClick={handleCalculate}>
        Calculate
      </button>
      <div id="bmiOutput" className="tool-output">
        {output}
      </div>
    </div>
  );
};

export default BmiCalculator;
