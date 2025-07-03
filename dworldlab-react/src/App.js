import React from "react";
import "./App.css";
import ImageConverter from "./components/ImageConverter";
import PasswordGenerator from "./components/PasswordGenerator";
import QrCodeGenerator from "./components/QrCodeGenerator";
import WordCounter from "./components/WordCounter";
import Base64Coder from "./components/Base64Coder";
import TextToSpeech from "./components/TextToSpeech";
import JsonFormatter from "./components/JsonFormatter";
import ColorPicker from "./components/ColorPicker";
import BmiCalculator from "./components/BmiCalculator";
import AgeCalculator from "./components/AgeCalculator";
import ImageCompressor from "./components/ImageCompressor";
import ImageCropper from "./components/ImageCropper";
import VideoConverter from "./components/VideoConverter";
import AudioConverter from "./components/AudioConverter";
import AudioTrimmer from "./components/AudioTrimmer";
import EmiCalculator from "./components/EmiCalculator";
import SipCalculator from "./components/SipCalculator";
import SpeechToText from "./components/SpeechToText";
import UnitConverter from "./components/UnitConverter";
import TimerStopwatch from "./components/TimerStopwatch";

const toolSections = [
  {
    title: "File & Media Tools",
    tools: [
      { name: "Image Converter", component: <ImageConverter /> },
      { name: "Image Compressor", component: <ImageCompressor /> },
      { name: "Image Cropper", component: <ImageCropper /> },
      { name: "Video Converter", component: <VideoConverter /> },
      { name: "Audio Converter", component: <AudioConverter /> },
      { name: "Audio Trimmer", component: <AudioTrimmer /> },
    ],
  },
  {
    title: "Text & Code Tools",
    tools: [
      { name: "Password Generator", component: <PasswordGenerator /> },
      { name: "QR Code Generator", component: <QrCodeGenerator /> },
      { name: "Word Counter", component: <WordCounter /> },
      { name: "Base64 Encoder/Decoder", component: <Base64Coder /> },
      { name: "JSON Formatter", component: <JsonFormatter /> },
      { name: "Text to Speech", component: <TextToSpeech /> },
      { name: "Speech to Text", component: <SpeechToText /> },
    ],
  },
  {
    title: "Calculators",
    tools: [
      { name: "BMI Calculator", component: <BmiCalculator /> },
      { name: "Age Calculator", component: <AgeCalculator /> },
      { name: "EMI Calculator", component: <EmiCalculator /> },
      { name: "SIP Calculator", component: <SipCalculator /> },
      { name: "Unit Converter", component: <UnitConverter /> },
      { name: "Timer / Stopwatch", component: <TimerStopwatch /> },
    ],
  },
  {
    title: "Other Tools",
    tools: [{ name: "Color Picker", component: <ColorPicker /> }],
  },
];

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <h1>Idiot Minds – Multi Tool Hub (React)</h1>
      </header>

      <main>
        {toolSections.map((section) => (
          <section className="tool-section" key={section.title}>
            <h2 className="tool-section-title">{section.title}</h2>
            <div className="tool-section-grid">
              {section.tools.map((tool) => (
                <div key={tool.name} className="tool-entry">
                  <h3 style={{ textAlign: "center", marginBottom: 10 }}>
                    {tool.name}
                  </h3>
                  {tool.component}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
