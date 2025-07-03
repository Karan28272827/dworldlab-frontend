export const imageConverter = {
  id: "image-converter",
  title: "Image Converter",
  description: "Convert images between formats like PNG, JPEG, and WEBP.",
  render: () => `
    <div class="tool-ui">
      <label class="file-input-label">Select Image
        <input type="file" id="imageConverterInput" accept="image/*">
      </label>
      <select id="imageConverterFormat">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WEBP</option>
      </select>
      <button class="glow-button" id="imageConverterBtn">Convert & Download</button>
      <div id="imageConverterOutput" class="tool-output"></div>
    </div>
  `,
  init: () => {
    const input = document.getElementById("imageConverterInput");
    const btn = document.getElementById("imageConverterBtn");
    const formatSelect = document.getElementById("imageConverterFormat");
    const outputDiv = document.getElementById("imageConverterOutput");
    btn.addEventListener("click", () => {
      if (input.files.length === 0) {
        outputDiv.textContent = "Please select an image first.";
        return;
      }
      const file = input.files[0];
      const format = formatSelect.value;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL(format);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `converted-image.${format.split("/")[1]}`;
          link.click();
          outputDiv.textContent = "Success! Your image has been downloaded.";
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },
}; 