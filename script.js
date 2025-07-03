document.addEventListener("DOMContentLoaded", () => {
  const toolGridContainer = document.querySelector(".tool-grid-container");
  const modal = document.getElementById("toolModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const closeModalButton = document.querySelector(".close-button");

  const tools = [
    // Define all 20 tools here as objects
    {
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
              outputDiv.textContent =
                "Success! Your image has been downloaded.";
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      },
    },
    {
      id: "password-generator",
      title: "Password Generator",
      description: "Create strong, secure, and random passwords.",
      render: () => `
                <div class="tool-ui">
                    <label for="pwLength">Length: <span id="pwLengthVal">16</span></label>
                    <input type="range" id="pwLength" min="8" max="64" value="16">
                    <label><input type="checkbox" id="pwUpper" checked> Uppercase (A-Z)</label>
                    <label><input type="checkbox" id="pwLower" checked> Lowercase (a-z)</label>
                    <label><input type="checkbox" id="pwNumbers" checked> Numbers (0-9)</label>
                    <label><input type="checkbox" id="pwSymbols" checked> Symbols (!@#$)</label>
                    <button class="glow-button" id="pwGenerateBtn">Generate</button>
                    <div id="pwOutput" class="tool-output">Click "Generate" to create a password.</div>
                </div>
            `,
      init: () => {
        const lengthSlider = document.getElementById("pwLength");
        const lengthVal = document.getElementById("pwLengthVal");
        const generateBtn = document.getElementById("pwGenerateBtn");
        const outputDiv = document.getElementById("pwOutput");

        lengthSlider.addEventListener(
          "input",
          () => (lengthVal.textContent = lengthSlider.value),
        );

        generateBtn.addEventListener("click", () => {
          const length = +lengthSlider.value;
          const useUpper = document.getElementById("pwUpper").checked;
          const useLower = document.getElementById("pwLower").checked;
          const useNumbers = document.getElementById("pwNumbers").checked;
          const useSymbols = document.getElementById("pwSymbols").checked;

          const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          const lower = "abcdefghijklmnopqrstuvwxyz";
          const numbers = "0123456789";
          const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

          let charset = "";
          if (useUpper) charset += upper;
          if (useLower) charset += lower;
          if (useNumbers) charset += numbers;
          if (useSymbols) charset += symbols;

          if (charset === "") {
            outputDiv.textContent =
              "Please select at least one character type.";
            return;
          }

          let password = "";
          for (let i = 0; i < length; i++) {
            password += charset.charAt(
              Math.floor(Math.random() * charset.length),
            );
          }
          outputDiv.textContent = password;
        });
      },
    },
    {
      id: "qr-code-generator",
      title: "QR Code Generator",
      description: "Generate a QR code from any text or URL.",
      render: () => `
                <div class="tool-ui">
                    <label for="qrInput">Text or URL:</label>
                    <input type="text" id="qrInput" placeholder="https://example.com">
                    <button class="glow-button" id="qrGenerateBtn">Generate QR Code</button>
                    <div id="qrOutput" class="tool-output" style="text-align: center;"></div>
                </div>
            `,
      init: () => {
        const input = document.getElementById("qrInput");
        const btn = document.getElementById("qrGenerateBtn");
        const outputDiv = document.getElementById("qrOutput");

        btn.addEventListener("click", () => {
          const text = input.value.trim();
          if (!text) {
            outputDiv.innerHTML = "Please enter some text or a URL.";
            return;
          }
          outputDiv.innerHTML = "Generating...";
          const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
          const img = new Image();
          img.src = qrCodeUrl;
          img.onload = () => {
            outputDiv.innerHTML = "";
            img.style.maxWidth = "100%";
            outputDiv.appendChild(img);
          };
          img.onerror = () => {
            outputDiv.innerHTML =
              "Failed to generate QR code. Please try again.";
          };
        });
      },
    },
    {
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
    },
    {
      id: "base64-coder",
      title: "Base64 Encoder/Decoder",
      description: "Encode to or decode from Base64 format.",
      render: () => `
                <div class="tool-ui">
                    <label for="base64Input">Input:</label>
                    <textarea id="base64Input" placeholder="Enter text to encode or decode"></textarea>
                    <div style="display: flex; gap: 1rem;">
                        <button class="glow-button" id="base64EncodeBtn">Encode</button>
                        <button class="glow-button" id="base64DecodeBtn">Decode</button>
                    </div>
                    <div id="base64Output" class="tool-output"></div>
                </div>
            `,
      init: () => {
        const input = document.getElementById("base64Input");
        const encodeBtn = document.getElementById("base64EncodeBtn");
        const decodeBtn = document.getElementById("base64DecodeBtn");
        const outputDiv = document.getElementById("base64Output");

        encodeBtn.addEventListener("click", () => {
          try {
            outputDiv.textContent = btoa(input.value);
          } catch (e) {
            outputDiv.textContent = "Error: " + e.message;
          }
        });
        decodeBtn.addEventListener("click", () => {
          try {
            outputDiv.textContent = atob(input.value);
          } catch (e) {
            outputDiv.textContent = "Error: Invalid Base64 string.";
          }
        });
      },
    },
    {
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
    },
    // --- Add more tools below ---
    {
      id: "json-formatter",
      title: "JSON Formatter",
      description: "Format and validate your JSON data.",
      render: () => `
                <div class="tool-ui">
                    <textarea id="jsonInput" placeholder="Paste your JSON here..."></textarea>
                    <button class="glow-button" id="jsonFormatBtn">Format</button>
                    <pre id="jsonOutput" class="tool-output"></pre>
                </div>`,
      init: () => {
        const input = document.getElementById("jsonInput");
        const btn = document.getElementById("jsonFormatBtn");
        const output = document.getElementById("jsonOutput");
        btn.addEventListener("click", () => {
          try {
            const parsed = JSON.parse(input.value);
            output.textContent = JSON.stringify(parsed, null, 4);
            output.classList.remove("error");
            output.classList.add("success");
          } catch (e) {
            output.textContent = `Invalid JSON: ${e.message}`;
            output.classList.add("error");
            output.classList.remove("success");
          }
        });
      },
    },
    {
      id: "color-picker",
      title: "Color Picker",
      description: "Pick a color and get its HEX, RGB, and HSL values.",
      render: () => `
                <div class="tool-ui">
                    <div class="color-picker-wrapper">
                        <input type="color" id="colorPickerInput" value="#42f8f5">
                        <div id="colorPickerOutput" class="tool-output" style="flex-grow: 1;"></div>
                    </div>
                </div>`,
      init: () => {
        const picker = document.getElementById("colorPickerInput");
        const output = document.getElementById("colorPickerOutput");

        function updateColor() {
          const hex = picker.value;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          output.innerHTML = `HEX: ${hex}<br>RGB: rgb(${r}, ${g}, ${b})`;
        }

        picker.addEventListener("input", updateColor);
        updateColor(); // Initial call
      },
    },
    {
      id: "bmi-calculator",
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index.",
      render: () => `
                <div class="tool-ui">
                    <label for="bmiHeight">Height (cm):</label>
                    <input type="number" id="bmiHeight" placeholder="e.g., 180">
                    <label for="bmiWeight">Weight (kg):</label>
                    <input type="number" id="bmiWeight" placeholder="e.g., 75">
                    <button class="glow-button" id="bmiCalcBtn">Calculate</button>
                    <div id="bmiOutput" class="tool-output"></div>
                </div>`,
      init: () => {
        const heightInput = document.getElementById("bmiHeight");
        const weightInput = document.getElementById("bmiWeight");
        const btn = document.getElementById("bmiCalcBtn");
        const output = document.getElementById("bmiOutput");
        btn.addEventListener("click", () => {
          const height = parseFloat(heightInput.value);
          const weight = parseFloat(weightInput.value);
          if (height > 0 && weight > 0) {
            const bmi = (weight / (height / 100) ** 2).toFixed(2);
            let category = "";
            if (bmi < 18.5) category = "Underweight";
            else if (bmi < 24.9) category = "Normal weight";
            else if (bmi < 29.9) category = "Overweight";
            else category = "Obesity";
            output.textContent = `Your BMI is ${bmi} (${category})`;
          } else {
            output.textContent = "Please enter valid height and weight.";
          }
        });
      },
    },
    {
      id: "age-calculator",
      title: "Age Calculator",
      description: "Calculate your age based on your date of birth.",
      render: () => `
                <div class="tool-ui">
                    <label for="birthDate">Your Date of Birth:</label>
                    <input type="date" id="birthDate">
                    <button class="glow-button" id="ageCalcBtn">Calculate Age</button>
                    <div id="ageOutput" class="tool-output"></div>
                </div>
            `,
      init: () => {
        document.getElementById("ageCalcBtn").addEventListener("click", () => {
          const birthDate = new Date(
            document.getElementById("birthDate").value,
          );
          const output = document.getElementById("ageOutput");
          if (isNaN(birthDate.getTime())) {
            output.textContent = "Please select a valid date.";
            return;
          }
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          output.textContent = `You are ${age} years old.`;
        });
      },
    },
    // Placeholder for more complex tools - they require more code or external WASM libraries
    // for full functionality, but here are basic implementations.
    {
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
              outputDiv.textContent =
                "Success! Your compressed image has been downloaded.";
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      },
    },
    {
      id: "image-cropper",
      title: "Image Cropper",
      description: "Crop and resize your images. (Simplified)",
      render: () =>
        `<div class="tool-output">Image cropping requires a complex canvas interface. This is a placeholder.</div>`,
      init: () => {},
    },
    {
      id: "video-converter",
      title: "Video Converter",
      description: "Convert video files. (Concept)",
      render: () =>
        `<div class="tool-output">True video conversion in-browser requires WebAssembly (e.g., FFMPEG.wasm) and is beyond the scope of a simple Vanilla JS project.</div>`,
      init: () => {},
    },
    {
      id: "audio-converter",
      title: "Audio Converter",
      description: "Convert audio files. (Concept)",
      render: () =>
        `<div class="tool-output">True audio conversion in-browser requires advanced Web Audio API or WebAssembly.</div>`,
      init: () => {},
    },
    {
      id: "audio-trimmer",
      title: "Audio Trimmer",
      description: "Trim audio files to the perfect length. (Concept)",
      render: () =>
        `<div class="tool-output">Audio trimming requires the Web Audio API and buffer manipulation. This is a placeholder for a complex feature.</div>`,
      init: () => {},
    },
    {
      id: "emi-calculator",
      title: "EMI Calculator",
      description: "Calculate your Equated Monthly Installment.",
      render: () => `<div class="tool-output">Coming soon.</div>`,
      init: () => {},
    },
    {
      id: "sip-calculator",
      title: "SIP Calculator",
      description: "Calculate returns on your Systematic Investment Plan.",
      render: () => `<div class="tool-output">Coming soon.</div>`,
      init: () => {},
    },
    {
      id: "speech-to-text",
      title: "Speech to Text",
      description: "Convert spoken words into text.",
      render: () =>
        `<div class="tool-output">The Web Speech API for recognition is still experimental and varies by browser. Placeholder for now.</div>`,
      init: () => {},
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      description: "Convert between various units of measurement.",
      render: () => `<div class="tool-output">Coming soon.</div>`,
      init: () => {},
    },
    {
      id: "timer-stopwatch",
      title: "Timer / Stopwatch",
      description: "A simple timer and stopwatch utility.",
      render: () => `<div class="tool-output">Coming soon.</div>`,
      init: () => {},
    },
  ];

  // Function to generate tool cards and append to the grid
  function renderToolCards() {
    toolGridContainer.innerHTML = ""; // Clear existing cards
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

  // Function to open the modal and initialize the tool
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

  // Event listener for opening tools (using event delegation)
  toolGridContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("glow-button")) {
      const toolId = e.target.getAttribute("data-tool-id");
      openToolModal(toolId);
    }
  });

  // Event listeners for closing the modal
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Initial render
  renderToolCards();
});
