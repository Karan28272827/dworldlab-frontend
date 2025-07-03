import React, { useRef, useState } from "react";

const ImageCompressor = () => {
  const fileInputRef = useRef();
  const [quality, setQuality] = useState(0.7);
  const [output, setOutput] = useState("");

  const handleCompress = () => {
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
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `compressed-image.jpeg`;
        link.click();
        setOutput("Success! Your compressed image has been downloaded.");
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
      <label htmlFor="compressorQuality">Quality (0.1 to 1.0):</label>
      <input
        type="range"
        id="compressorQuality"
        min={0.1}
        max={1.0}
        step={0.1}
        value={quality}
        onChange={e => setQuality(Number(e.target.value))}
      />
      <button className="glow-button" onClick={handleCompress}>
        Compress &amp; Download
      </button>
      <div className="tool-output">{output}</div>
    </div>
  );
};

export default ImageCompressor; 