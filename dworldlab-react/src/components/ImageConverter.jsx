import React, { useRef, useState } from "react";

const ImageConverter = () => {
  const fileInputRef = useRef();
  const [format, setFormat] = useState("image/png");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    const input = fileInputRef.current;
    if (!input.files || input.files.length === 0) {
      setOutput("Please select an image first.");
      return;
    }
    const file = input.files[0];
    const reader = new window.FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
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
        setOutput("Success! Your image has been downloaded.");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="tool-ui">
      <label className="file-input-label">
        Select Image
        <input type="file" ref={fileInputRef} accept="image/*" />
      </label>
      <select
        value={format}
        onChange={e => setFormat(e.target.value)}
        id="imageConverterFormat"
      >
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WEBP</option>
      </select>
      <button className="glow-button" onClick={handleConvert}>
        Convert &amp; Download
      </button>
      <div className="tool-output">{output}</div>
    </div>
  );
};

export default ImageConverter; 