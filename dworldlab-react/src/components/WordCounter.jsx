import React, { useState } from "react";

const WordCounter = () => {
  const [text, setText] = useState("");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const sentences = (text.match(/[.!?]+/g) || []).length;

  return (
    <div className="tool-ui">
      <textarea
        id="wordCounterInput"
        placeholder="Paste your text here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div id="wordCounterOutput" className="tool-output">
        Words: {words} | Characters: {chars} | Sentences: {sentences}
      </div>
    </div>
  );
};

export default WordCounter; 