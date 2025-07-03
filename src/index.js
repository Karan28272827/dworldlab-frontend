// IMPORT IMPORTANT: Make sure to use <script type="module" src="index.js"></script> in your HTML
import { imageConverter } from "./components/imageConverter.js";
import { passwordGenerator } from "./components/passwordGenerator.js";
import { qrCodeGenerator } from "./components/qrCodeGenerator.js";
import { wordCounter } from "./components/wordCounter.js";
import { base64Coder } from "./components/base64Coder.js";
import { textToSpeech } from "./components/textToSpeech.js";
import { jsonFormatter } from "./components/jsonFormatter.js";
import { colorPicker } from "./components/colorPicker.js";
import { bmiCalculator } from "./components/bmiCalculator.js";
import { ageCalculator } from "./components/ageCalculator.js";
import { imageCompressor } from "./components/imageCompressor.js";
import { imageCropper } from "./components/imageCropper.js";
import { videoConverter } from "./components/videoConverter.js";
import { audioConverter } from "./components/audioConverter.js";
import { audioTrimmer } from "./components/audioTrimmer.js";
import { emiCalculator } from "./components/emiCalculator.js";
import { sipCalculator } from "./components/sipCalculator.js";
import { speechToText } from "./components/speechToText.js";
import { unitConverter } from "./components/unitConverter.js";
import { timerStopwatch } from "./components/timerStopwatch.js";

const tools = [
  imageConverter,
  passwordGenerator,
  qrCodeGenerator,
  wordCounter,
  base64Coder,
  textToSpeech,
  jsonFormatter,
  colorPicker,
  bmiCalculator,
  ageCalculator,
  imageCompressor,
  imageCropper,
  videoConverter,
  audioConverter,
  audioTrimmer,
  emiCalculator,
  sipCalculator,
  speechToText,
  unitConverter,
  timerStopwatch,
];

document.addEventListener("DOMContentLoaded", () => {
  const toolGridContainer = document.querySelector(".tool-grid-container");
  const modal = document.getElementById("toolModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const closeModalButton = document.querySelector(".close-button");

  function renderToolCards() {
    toolGridContainer.innerHTML = "";
    tools.forEach((tool) => {
      const card = document.createElement("div");
      card.className = "tool-card";
      card.innerHTML = `
        <h2>${tool.title}</h2>
        <p>${tool.description}</p>
        <button class="glow-button" data-tool-id="${tool.id}">Open Tool</button>
      `;
      toolGridContainer.appendChild(card);
    });
  }

  function openToolModal(toolId) {
    const tool = tools.find((t) => t.id === toolId);
    if (tool) {
      modalTitle.textContent = tool.title;
      modalBody.innerHTML = tool.render();
      if (tool.init) {
        tool.init();
      }
      modal.style.display = "flex";
    }
  }

  toolGridContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("glow-button")) {
      const toolId = e.target.getAttribute("data-tool-id");
      openToolModal(toolId);
    }
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  renderToolCards();
});
