export const textToSpeech = {
  id: "text-to-speech",
  title: "Text to Speech",
  description: "Convert written text into spoken words.",
  render: () => `
    <div class="tool-ui">
      <textarea id="ttsInput" placeholder="Enter text to speak..."></textarea>
      <button class="glow-button" id="ttsSpeakBtn">Speak</button>
      <div class="tool-output">Note: Voice and language depend on your browser.</div>
    </div>
  `,
  init: () => {
    const input = document.getElementById("ttsInput");
    const speakBtn = document.getElementById("ttsSpeakBtn");
    const synth = window.speechSynthesis;
    speakBtn.addEventListener("click", () => {
      if (synth.speaking) {
        synth.cancel();
      }
      if (input.value !== "") {
        const utterThis = new SpeechSynthesisUtterance(input.value);
        synth.speak(utterThis);
      }
    });
  },
}; 