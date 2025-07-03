import React, { useState, useRef, useEffect } from "react";
import "./AudioTrimmer.css";

function AudioTrimmer() {
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [trimmedAudioUrl, setTrimmedAudioUrl] = useState("");

  const [audioDuration, setAudioDuration] = useState(0); // Total duration of the audio
  const [trimStart, setTrimStart] = useState(0); // Trim start time in seconds
  const [trimEnd, setTrimEnd] = useState(0); // Trim end time in seconds

  const audioRef = useRef(null);
  const audioContextRef = useRef(null); // To store the AudioContext instance
  const audioBufferRef = useRef(null); // To store the decoded AudioBuffer

  // Clean up object URLs and AudioContext when component unmounts or audioFile changes
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (trimmedAudioUrl) URL.revokeObjectURL(trimmedAudioUrl);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [audioUrl, trimmedAudioUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setTrimmedAudioUrl(""); // Clear previous trimmed audio
      setMessage("");
      setAudioDuration(0); // Reset duration
      setTrimStart(0); // Reset trim points
      setTrimEnd(0);
      decodeAudioFile(file);
    } else {
      setAudioUrl("");
      setTrimmedAudioUrl("");
      setMessage("Please select a valid audio file.");
    }
  };

  const decodeAudioFile = async (file) => {
    setMessage("Decoding audio file...");
    setLoading(true);
    try {
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
      setAudioDuration(audioBuffer.duration);
      setTrimEnd(audioBuffer.duration); // Set trimEnd to full duration initially
      setMessage("Audio decoded and ready for trimming.");
    } catch (error) {
      setMessage(
        `Error decoding audio: ${error.message}. Please try another file.`,
      );
      console.error("Error decoding audio:", error);
      audioBufferRef.current = null;
      setAudioDuration(0);
      setTrimStart(0);
      setTrimEnd(0);
    } finally {
      setLoading(false);
    }
  };

  const encodeWAV = (audioBuffer) => {
    const numOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bytesPerSample = 2; // 16-bit PCM
    let interleaved;
    if (numOfChannels === 2) {
      interleaved = new Float32Array(audioBuffer.length * numOfChannels);
      for (let i = 0; i < audioBuffer.length; i++) {
        interleaved[i * 2] = audioBuffer.getChannelData(0)[i];
        interleaved[i * 2 + 1] = audioBuffer.getChannelData(1)[i];
      }
    } else {
      interleaved = audioBuffer.getChannelData(0);
    }
    const pcmData = new Int16Array(interleaved.length);
    for (let i = 0; i < interleaved.length; i++) {
      let s = Math.max(-1, Math.min(1, interleaved[i]));
      pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const dataLength = pcmData.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataLength, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numOfChannels * bytesPerSample, true);
    view.setUint16(32, numOfChannels * bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, dataLength, true);
    floatTo16BitPCM(view, 44, pcmData);
    return new Blob([view], { type: "audio/wav" });
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      output.setInt16(offset, input[i], true);
    }
  };

  const handleTrim = () => {
    if (!audioBufferRef.current) {
      setMessage("Please load and decode an audio file first.");
      return;
    }
    const start = parseFloat(trimStart);
    const end = parseFloat(trimEnd);
    if (
      isNaN(start) ||
      isNaN(end) ||
      start < 0 ||
      end > audioDuration ||
      start >= end
    ) {
      setMessage(
        "Invalid trim points. Please ensure Start < End and within audio duration.",
      );
      return;
    }
    setLoading(true);
    setMessage("Trimming audio...");
    setTrimmedAudioUrl("");
    try {
      const audioBuffer = audioBufferRef.current;
      const sampleRate = audioBuffer.sampleRate;
      const numOfChannels = audioBuffer.numberOfChannels;
      const startSample = Math.floor(start * sampleRate);
      const endSample = Math.floor(end * sampleRate);
      const trimmedLength = endSample - startSample;
      const trimmedAudioBuffer = audioContextRef.current.createBuffer(
        numOfChannels,
        trimmedLength,
        sampleRate,
      );
      for (let i = 0; i < numOfChannels; i++) {
        const originalChannelData = audioBuffer.getChannelData(i);
        const trimmedChannelData = trimmedAudioBuffer.getChannelData(i);
        for (let j = 0; j < trimmedLength; j++) {
          trimmedChannelData[j] = originalChannelData[startSample + j];
        }
      }
      const wavBlob = encodeWAV(trimmedAudioBuffer);
      const url = URL.createObjectURL(wavBlob);
      setTrimmedAudioUrl(url);
      setMessage("Audio trimmed successfully!");
    } catch (error) {
      setMessage(`Error trimming audio: ${error.message}`);
      console.error("Audio trimming error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00.000";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const ms = Math.floor(
      (remainingSeconds - Math.floor(remainingSeconds)) * 1000,
    );
    return `${String(minutes).padStart(2, "0")}:${String(Math.floor(remainingSeconds)).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Audio Trimmer
        </h1>

        {/* Explanation of Limitations */}
        <div
          className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md"
          role="alert"
        >
          <p className="font-bold">
            Important Note on Audio Format Conversion:
          </p>
          <p className="text-sm mt-2">
            This application allows you to trim audio and export it as an
            **uncompressed WAV file**. Directly converting to complex,
            compressed audio formats (like MP3, AAC, OGG, FLAC, etc.) in a web
            browser using client-side JavaScript is highly challenging and
            generally not practical due to performance, browser API
            restrictions, and the complexity/licensing of codecs. For other
            formats, server-side processing or large WebAssembly libraries are
            typically required.
          </p>
        </div>

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

        {/* Audio Player for Original Audio */}
        {audioUrl && (
          <div className="mt-6 flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Original Audio:
            </h2>
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-full max-w-md rounded-lg shadow-md border border-gray-200"
              onLoadedMetadata={() => {
                setMessage(
                  `Audio loaded. Duration: ${formatTime(audioRef.current.duration)}`,
                );
              }}
            >
              Your browser does not support the audio tag.
            </audio>
            <p className="text-sm text-gray-600">
              Total Duration: {formatTime(audioDuration)}
            </p>
          </div>
        )}

        {/* Trim Controls */}
        {audioBufferRef.current && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 text-center">
              Set Trim Points:
            </h2>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-1">
                <label
                  htmlFor="trim-start"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Time (seconds):
                </label>
                <input
                  id="trim-start"
                  type="number"
                  step="0.01"
                  min="0"
                  max={audioDuration}
                  value={trimStart.toFixed(2)}
                  onChange={(e) => setTrimStart(parseFloat(e.target.value))}
                  className="input-field w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current: {formatTime(trimStart)}
                </p>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="trim-end"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Time (seconds):
                </label>
                <input
                  id="trim-end"
                  type="number"
                  step="0.01"
                  min="0"
                  max={audioDuration}
                  value={trimEnd.toFixed(2)}
                  onChange={(e) => setTrimEnd(parseFloat(e.target.value))}
                  className="input-field w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current: {formatTime(trimEnd)}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleTrim}
                disabled={
                  loading ||
                  !audioBufferRef.current ||
                  trimStart >= trimEnd ||
                  trimStart < 0 ||
                  trimEnd > audioDuration
                }
                className="btn-primary flex items-center justify-center gap-2"
              >
                {loading && message.startsWith("Trimming") && (
                  <div className="loading-spinner"></div>
                )}
                Trim Audio
              </button>
            </div>
          </div>
        )}

        {/* Status Message */}
        {message && (
          <p className="text-center text-gray-600 mt-4 p-2 bg-gray-50 rounded-md">
            {message}
          </p>
        )}

        {/* Trimmed Audio Output Display */}
        {trimmedAudioUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Trimmed Audio:
            </h2>
            <audio
              src={trimmedAudioUrl}
              controls
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg border border-gray-200"
            >
              Your browser does not support the audio tag.
            </audio>
            <a
              href={trimmedAudioUrl}
              download="trimmed-audio.wav"
              className="btn-primary mt-4 inline-block"
            >
              Download Trimmed WAV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioTrimmer;
