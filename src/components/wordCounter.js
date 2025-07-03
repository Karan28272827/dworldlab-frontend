export const wordCounter = {
  id: "word-counter",
  title: "Word Counter",
  description: "Count words, characters, and sentences in your text.",
  render: () => `
    <div class="tool-ui">
      <textarea id="wordCounterInput" placeholder="Paste your text here..."></textarea>
      <div id="wordCounterOutput" class="tool-output">
        Words: 0 | Characters: 0 | Sentences: 0
      </div>
    </div>
  `,
  init: () => {
    const textarea = document.getElementById("wordCounterInput");
    const outputDiv = document.getElementById("wordCounterOutput");
    textarea.addEventListener("input", () => {
      const text = textarea.value;
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      const chars = text.length;
      const sentences = (text.match(/[.!?]+/g) || []).length;
      outputDiv.textContent = `Words: ${words} | Characters: ${chars} | Sentences: ${sentences}`;
    });
  },
}; 