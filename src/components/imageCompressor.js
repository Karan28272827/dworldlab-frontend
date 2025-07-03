export const imageCompressor = {
  id: "image-compressor",
  title: "Image Compressor",
  description: "Compress images to reduce file size (JPEG format).",
  render: () => `
    <div class="tool-ui">
      <label class="file-input-label">Select Image
        <input type="file" id="compressorInput" accept="image/*">
      </label>
      <label for="compressorQuality">Quality (0.1 to 1.0):</label>
      <input type="range" id="compressorQuality" min="0.1" max="1.0" value="0.7" step="0.1">
      <button class="glow-button" id="compressorBtn">Compress & Download</button>
      <div id="compressorOutput" class="tool-output"></div>
    </div>
  `,
  init: () => {
    const input = document.getElementById("compressorInput");
    const btn = document.getElementById("compressorBtn");
    const qualitySlider = document.getElementById("compressorQuality");
    const outputDiv = document.getElementById("compressorOutput");
    btn.addEventListener("click", () => {
      if (input.files.length === 0) {
        outputDiv.textContent = "Please select an image first.";
        return;
      }
      const file = input.files[0];
      const quality = parseFloat(qualitySlider.value);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `compressed-image.jpeg`;
          link.click();
          outputDiv.textContent = "Success! Your compressed image has been downloaded.";
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },
}; 