export const ageCalculator = {
  id: "age-calculator",
  title: "Age Calculator",
  description: "Calculate your age based on your date of birth.",
  render: () => `
    <div class="tool-ui">
      <label for="birthDate">Your Date of Birth:</label>
      <input type="date" id="birthDate">
      <button class="glow-button" id="ageCalcBtn">Calculate Age</button>
      <div id="ageOutput" class="tool-output"></div>
    </div>
  `,
  init: () => {
    document.getElementById("ageCalcBtn").addEventListener("click", () => {
      const birthDate = new Date(document.getElementById("birthDate").value);
      const output = document.getElementById("ageOutput");
      if (isNaN(birthDate.getTime())) {
        output.textContent = "Please select a valid date.";
        return;
      }
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      output.textContent = `You are ${age} years old.`;
    });
  },
}; 