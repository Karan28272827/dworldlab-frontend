export const bmiCalculator = {
  id: "bmi-calculator",
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index.",
  render: () => `
    <div class="tool-ui">
      <label for="bmiHeight">Height (cm):</label>
      <input type="number" id="bmiHeight" placeholder="e.g., 180">
      <label for="bmiWeight">Weight (kg):</label>
      <input type="number" id="bmiWeight" placeholder="e.g., 75">
      <button class="glow-button" id="bmiCalcBtn">Calculate</button>
      <div id="bmiOutput" class="tool-output"></div>
    </div>`,
  init: () => {
    const heightInput = document.getElementById("bmiHeight");
    const weightInput = document.getElementById("bmiWeight");
    const btn = document.getElementById("bmiCalcBtn");
    const output = document.getElementById("bmiOutput");
    btn.addEventListener("click", () => {
      const height = parseFloat(heightInput.value);
      const weight = parseFloat(weightInput.value);
      if (height > 0 && weight > 0) {
        const bmi = (weight / (height / 100) ** 2).toFixed(2);
        let category = "";
        if (bmi < 18.5) category = "Underweight";
        else if (bmi < 24.9) category = "Normal weight";
        else if (bmi < 29.9) category = "Overweight";
        else category = "Obesity";
        output.textContent = `Your BMI is ${bmi} (${category})`;
      } else {
        output.textContent = "Please enter valid height and weight.";
      }
    });
  },
}; 