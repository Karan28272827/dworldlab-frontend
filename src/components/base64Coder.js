export const base64Coder = {
  id: "base64-coder",
  title: "Base64 Encoder/Decoder",
  description: "Encode to or decode from Base64 format.",
  render: () => `
    <div class="tool-ui">
      <label for="base64Input">Input:</label>
      <textarea id="base64Input" placeholder="Enter text to encode or decode"></textarea>
      <div style="display: flex; gap: 1rem;">
        <button class="glow-button" id="base64EncodeBtn">Encode</button>
        <button class="glow-button" id="base64DecodeBtn">Decode</button>
      </div>
      <div id="base64Output" class="tool-output"></div>
    </div>
  `,
  init: () => {
    const input = document.getElementById("base64Input");
    const encodeBtn = document.getElementById("base64EncodeBtn");
    const decodeBtn = document.getElementById("base64DecodeBtn");
    const outputDiv = document.getElementById("base64Output");
    encodeBtn.addEventListener("click", () => {
      try {
        outputDiv.textContent = btoa(input.value);
      } catch (e) {
        outputDiv.textContent = "Error: " + e.message;
      }
    });
    decodeBtn.addEventListener("click", () => {
      try {
        outputDiv.textContent = atob(input.value);
      } catch (e) {
        outputDiv.textContent = "Error: Invalid Base64 string.";
      }
    });
  },
}; 