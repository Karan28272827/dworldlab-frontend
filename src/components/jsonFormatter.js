export const jsonFormatter = {
  id: "json-formatter",
  title: "JSON Formatter",
  description: "Format and validate your JSON data.",
  render: () => `
    <div class="tool-ui">
      <textarea id="jsonInput" placeholder="Paste your JSON here..."></textarea>
      <button class="glow-button" id="jsonFormatBtn">Format</button>
      <pre id="jsonOutput" class="tool-output"></pre>
    </div>`,
  init: () => {
    const input = document.getElementById("jsonInput");
    const btn = document.getElementById("jsonFormatBtn");
    const output = document.getElementById("jsonOutput");
    btn.addEventListener("click", () => {
      try {
        const parsed = JSON.parse(input.value);
        output.textContent = JSON.stringify(parsed, null, 4);
        output.classList.remove("error");
        output.classList.add("success");
      } catch (e) {
        output.textContent = `Invalid JSON: ${e.message}`;
        output.classList.add("error");
        output.classList.remove("success");
      }
    });
  },
}; 