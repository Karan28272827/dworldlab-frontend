import React from 'react';
import './App.css';
import ImageConverter from './components/ImageConverter.jsx';
import PasswordGenerator from './components/PasswordGenerator.jsx';
import QrCodeGenerator from './components/QrCodeGenerator.jsx';
import WordCounter from './components/WordCounter.jsx';
import Base64Coder from './components/Base64Coder.jsx';
import TextToSpeech from './components/TextToSpeech.jsx';
import JsonFormatter from './components/JsonFormatter.jsx';
import ColorPicker from './components/ColorPicker.jsx';
import BmiCalculator from './components/BmiCalculator.jsx';
import AgeCalculator from './components/AgeCalculator.jsx';
import ImageCompressor from './components/ImageCompressor.jsx';
import ImageCropper from './components/ImageCropper.jsx';
import VideoConverter from './components/VideoConverter.jsx';
import AudioConverter from './components/AudioConverter.jsx';
import AudioTrimmer from './components/AudioTrimmer.jsx';
import EmiCalculator from './components/EmiCalculator.jsx';
import SipCalculator from './components/SipCalculator.jsx';
import SpeechToText from './components/SpeechToText.jsx';
import UnitConverter from './components/UnitConverter.jsx';
import TimerStopwatch from './components/TimerStopwatch.jsx';

const toolSections = [
  {
    title: 'File & Media Tools',
    tools: [
      { name: 'Image Converter', component: <ImageConverter /> },
      { name: 'Image Compressor', component: <ImageCompressor /> },
      { name: 'Image Cropper', component: <ImageCropper /> },
      { name: 'Video Converter', component: <VideoConverter /> },
      { name: 'Audio Converter', component: <AudioConverter /> },
      { name: 'Audio Trimmer', component: <AudioTrimmer /> },
    ],
  },
  {
    title: 'Text & Code Tools',
    tools: [
      { name: 'Password Generator', component: <PasswordGenerator /> },
      { name: 'QR Code Generator', component: <QrCodeGenerator /> },
      { name: 'Word Counter', component: <WordCounter /> },
      { name: 'Base64 Encoder/Decoder', component: <Base64Coder /> },
      { name: 'JSON Formatter', component: <JsonFormatter /> },
      { name: 'Text to Speech', component: <TextToSpeech /> },
      { name: 'Speech to Text', component: <SpeechToText /> },
    ],
  },
  {
    title: 'Calculators',
    tools: [
      { name: 'BMI Calculator', component: <BmiCalculator /> },
      { name: 'Age Calculator', component: <AgeCalculator /> },
      { name: 'EMI Calculator', component: <EmiCalculator /> },
      { name: 'SIP Calculator', component: <SipCalculator /> },
      { name: 'Unit Converter', component: <UnitConverter /> },
      { name: 'Timer / Stopwatch', component: <TimerStopwatch /> },
    ],
  },
  {
    title: 'Other Tools',
    tools: [
      { name: 'Color Picker', component: <ColorPicker /> },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <h1>Idiot Minds – Multi Tool Hub (React)</h1>
      </header>
      <main>
        {toolSections.map(section => (
          <section className="tool-section" key={section.title} style={{ marginBottom: 40 }}>
            <h2>{section.title}</h2>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '2rem 1.5rem' }}>
              <tbody>
                <tr>
                  {section.tools.map(tool => (
                    <td key={tool.name} style={{ verticalAlign: 'top', minWidth: 350 }}>
                      <h3 style={{ textAlign: 'center', marginBottom: 10 }}>{tool.name}</h3>
                      {tool.component}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
