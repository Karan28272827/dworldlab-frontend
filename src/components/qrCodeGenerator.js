export const qrCodeGenerator = {
  id: "qr-code-generator",
  title: "QR Code Generator",
  description: "Generate a QR code from any text or URL.",
  render: () => `
    <div class="tool-ui">
      <label for="qrInput">Text or URL:</label>
      <input type="text" id="qrInput" placeholder="https://example.com">
      <button class="glow-button" id="qrGenerateBtn">Generate QR Code</button>
      <div id="qrOutput" class="tool-output" style="text-align: center;"></div>
    </div>
  `,
  init: () => {
    const input = document.getElementById("qrInput");
    const btn = document.getElementById("qrGenerateBtn");
    const outputDiv = document.getElementById("qrOutput");
    btn.addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) {
        outputDiv.innerHTML = "Please enter some text or a URL.";
        return;
      }
      outputDiv.innerHTML = "Generating...";
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
      const img = new Image();
      img.src = qrCodeUrl;
      img.onload = () => {
        outputDiv.innerHTML = "";
        img.style.maxWidth = "100%";
        outputDiv.appendChild(img);
      };
      img.onerror = () => {
        outputDiv.innerHTML = "Failed to generate QR code. Please try again.";
      };
    });
  },
}; 