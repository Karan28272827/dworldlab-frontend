export const passwordGenerator = {
  id: "password-generator",
  title: "Password Generator",
  description: "Create strong, secure, and random passwords.",
  render: () => `
    <div class="tool-ui">
      <label for="pwLength">Length: <span id="pwLengthVal">16</span></label>
      <input type="range" id="pwLength" min="8" max="64" value="16">
      <label><input type="checkbox" id="pwUpper" checked> Uppercase (A-Z)</label>
      <label><input type="checkbox" id="pwLower" checked> Lowercase (a-z)</label>
      <label><input type="checkbox" id="pwNumbers" checked> Numbers (0-9)</label>
      <label><input type="checkbox" id="pwSymbols" checked> Symbols (!@#$)</label>
      <button class="glow-button" id="pwGenerateBtn">Generate</button>
      <div id="pwOutput" class="tool-output">Click "Generate" to create a password.</div>
    </div>
  `,
  init: () => {
    const lengthSlider = document.getElementById("pwLength");
    const lengthVal = document.getElementById("pwLengthVal");
    const generateBtn = document.getElementById("pwGenerateBtn");
    const outputDiv = document.getElementById("pwOutput");
    lengthSlider.addEventListener("input", () => (lengthVal.textContent = lengthSlider.value));
    generateBtn.addEventListener("click", () => {
      const length = +lengthSlider.value;
      const useUpper = document.getElementById("pwUpper").checked;
      const useLower = document.getElementById("pwLower").checked;
      const useNumbers = document.getElementById("pwNumbers").checked;
      const useSymbols = document.getElementById("pwSymbols").checked;
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
        outputDiv.textContent = "Please select at least one character type.";
        return;
      }
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      outputDiv.textContent = password;
    });
  },
}; 