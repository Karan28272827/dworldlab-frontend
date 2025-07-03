import React, { useState } from "react";

const TextToSpeech = () => {
  const [input, setInput] = useState("");
  const synth = window.speechSynthesis;

  const handleSpeak = () => {
    if (synth.speaking) {
      synth.cancel();
    }
    if (input !== "") {
      const utterThis = new window.SpeechSynthesisUtterance(input);
      synth.speak(utterThis);
    }
  };

  return (
    <div className="tool-ui">
      <textarea
        id="ttsInput"
        placeholder="Enter text to speak..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button className="glow-button" onClick={handleSpeak}>Speak</button>
      <div className="tool-output">Note: Voice and language depend on your browser.</div>
    </div>
  );
};

export default TextToSpeech; 