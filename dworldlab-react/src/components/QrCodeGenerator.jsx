import React, { useState } from "react";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!text.trim()) {
      setOutput(<span>Please enter some text or a URL.</span>);
      return;
    }
    setLoading(true);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    const img = new window.Image();
    img.src = qrCodeUrl;
    img.onload = () => {
      setOutput(<img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: "100%" }} />);
      setLoading(false);
    };
    img.onerror = () => {
      setOutput(<span>Failed to generate QR code. Please try again.</span>);
      setLoading(false);
    };
  };

  return (
    <div className="tool-ui">
      <label htmlFor="qrInput">Text or URL:</label>
      <input
        type="text"
        id="qrInput"
        placeholder="https://example.com"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="glow-button" onClick={handleGenerate}>Generate QR Code</button>
      <div id="qrOutput" className="tool-output" style={{ textAlign: "center" }}>
        {loading ? "Generating..." : output}
      </div>
    </div>
  );
};

export default QrCodeGenerator; 