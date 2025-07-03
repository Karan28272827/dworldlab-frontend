import React, { useState, useRef, useEffect } from "react";
import "./AudioConverter.css";

function AudioConverter() {
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [wavUrl, setWavUrl] = useState("");

  const audioRef = useRef(null);
  const audioContextRef = useRef(null); // To store the AudioContext instance
  const audioBufferRef = useRef(null); // To store the decoded AudioBuffer

  // Clean up object URLs when component unmounts or audioFile changes
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (wavUrl) URL.revokeObjectURL(wavUrl);
      if (audioContextRef.current) {
        audioContextRef.current.close(); // Close AudioContext to release resources
        audioContextRef.current = null;
      }
    };
  }, [audioUrl, wavUrl]);

  /**
   * Handles the selection of an audio file by the user.
   * Reads the file and sets the audio source for playback.
   * @param {Event} event - The change event from the file input.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setWavUrl(""); // Clear previous WAV
      setMessage("");

      // Decode audio for WAV conversion immediately after file selection
      decodeAudioFile(file);
    } else {
      setAudioUrl("");
      setWavUrl("");
      setMessage("Please select a valid audio file.");
    }
  };

  /**
   * Decodes the audio file into an AudioBuffer using the Web Audio API.
   * This is a prerequisite for processing audio data.
   * @param {File} file - The audio file to decode.
   */
  const decodeAudioFile = async (file) => {
    setMessage("Decoding audio file...");
    setLoading(true);

    try {
      // Create a new AudioContext if one doesn't exist or is closed
      if (
        !audioContextRef.current ||
        audioContextRef.current.state === "closed"
      ) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }

      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer =
        await audioContextRef.current.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
      setMessage("Audio decoded and ready for conversion.");
    } catch (error) {
      setMessage(
        `Error decoding audio: ${error.message}. Please try another file.`,
      );
      console.error("Error decoding audio:", error);
      audioBufferRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Converts the decoded AudioBuffer to a WAV Blob.
   * Based on https://github.com/mattdiamond/Recorderjs/blob/master/src/recorder.js
   * @param {AudioBuffer} audioBuffer - The audio buffer to convert.
   * @returns {Blob} The WAV audio blob.
   */
  const encodeWAV = (audioBuffer) => {
    const numOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bytesPerSample = 2; // 16-bit PCM

    // Interleave channels (if stereo)
    let interleaved;
    if (numOfChannels === 2) {
      interleaved = new Float32Array(audioBuffer.length * numOfChannels);
      for (let i = 0; i < audioBuffer.length; i++) {
        interleaved[i * 2] = audioBuffer.getChannelData(0)[i];
        interleaved[i * 2 + 1] = audioBuffer.getChannelData(1)[i];
      }
    } else {
      interleaved = audioBuffer.getChannelData(0); // Mono
    }

    // Convert float to 16-bit PCM
    const pcmData = new Int16Array(interleaved.length);
    for (let i = 0; i < interleaved.length; i++) {
      let s = Math.max(-1, Math.min(1, interleaved[i]));
      pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    // WAV header construction
    const dataLength = pcmData.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, "RIFF");
    /* file length */
    view.setUint32(4, 36 + dataLength, true);
    /* RIFF type */
    writeString(view, 8, "WAVE");
    /* format chunk identifier */
    writeString(view, 12, "fmt ");
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw PCM) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, numOfChannels, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * numOfChannels * bytesPerSample, true);
    /* block align (channels * bytes per sample) */
    view.setUint16(32, numOfChannels * bytesPerSample, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, "data");
    /* data chunk length */
    view.setUint32(40, dataLength, true);

    // Write PCM data
    floatTo16BitPCM(view, 44, pcmData);

    return new Blob([view], { type: "audio/wav" });
  };

  // Helper function for WAV encoding
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Helper function for WAV encoding
  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      output.setInt16(offset, input[i], true);
    }
  };

  /**
   * Initiates the conversion to WAV format.
   */
  const convertToWav = () => {
    if (!audioBufferRef.current) {
      setMessage("Please load and decode an audio file first.");
      return;
    }

    setLoading(true);
    setMessage("Converting to WAV...");
    setWavUrl("");

    try {
      const wavBlob = encodeWAV(audioBufferRef.current);
      const url = URL.createObjectURL(wavBlob);
      setWavUrl(url);
      setMessage("Conversion to WAV complete!");
    } catch (error) {
      setMessage(`Error during WAV conversion: ${error.message}`);
      console.error("WAV conversion error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Audio Converter
        </h1>

        {/* File Input */}
        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="audio-upload"
            className="block text-lg font-medium text-gray-700"
          >
            Upload Audio File:
          </label>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <div className="mt-6 flex justify-center">
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-full max-w-md rounded-lg shadow-md border border-gray-200"
              onLoadedMetadata={() => {
                setMessage(
                  `Audio loaded: ${audioRef.current.duration.toFixed(2)}s`,
                );
              }}
            >
              Your browser does not support the audio tag.
            </audio>
          </div>
        )}

        {/* Control Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={convertToWav}
            disabled={!audioBufferRef.current || loading}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {loading && message.startsWith("Converting") && (
              <div className="loading-spinner"></div>
            )}
            Convert to WAV
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p className="text-center text-gray-600 mt-4 p-2 bg-gray-50 rounded-md">
            {message}
          </p>
        )}

        {/* WAV Output Display */}
        {wavUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Converted WAV Audio:
            </h2>
            <audio
              src={wavUrl}
              controls
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg border border-gray-200"
            >
              Your browser does not support the audio tag.
            </audio>
            <a
              href={wavUrl}
              download="converted-audio.wav"
              className="btn-primary mt-4 inline-block"
            >
              Download WAV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioConverter;
