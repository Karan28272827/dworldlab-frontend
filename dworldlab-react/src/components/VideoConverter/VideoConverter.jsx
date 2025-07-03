import React, { useState, useRef, useEffect } from "react";

// Ensure the gif.js library is loaded. This is typically done via a script tag in index.html,
// but for a self-contained React immersive, we'll assume it's available globally.
// In a real-world React app, you'd import it if it were an npm package.
// For this example, we'll rely on it being globally available after a CDN load.
// <script src="https://unpkg.com/gif.js@0.2.0/gif.js"></script>

function VideoConverter() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [extractedFrames, setExtractedFrames] = useState([]);
  const [gifUrl, setGifUrl] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Effect to clean up video URL when component unmounts or videoFile changes
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  /**
   * Handles the selection of a video file by the user.
   * @param {Event} event - The change event from the file input.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setExtractedFrames([]); // Clear previous frames
      setGifUrl(""); // Clear previous GIF
      setMessage("");
    } else {
      setVideoFile(null);
      setVideoUrl("");
      setMessage("Please select a valid video file.");
    }
  };

  /**
   * Captures a single frame from the video at the current time and returns it as a data URL.
   * @param {HTMLVideoElement} video - The video element.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @returns {string} - Data URL of the captured frame (PNG).
   */
  const captureFrame = (video, canvas) => {
    if (!video || !canvas) return "";

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  /**
   * Extracts frames from the video at specified intervals.
   */
  const extractFrames = async () => {
    if (!videoRef.current || !canvasRef.current || !videoFile) {
      setMessage("Please load a video first.");
      return;
    }

    setLoading(true);
    setMessage("Extracting frames...");
    setExtractedFrames([]);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const frames = [];

    // Ensure video metadata is loaded before seeking
    await new Promise((resolve) => {
      if (video.readyState >= 2) {
        // HAVE_CURRENT_DATA or higher
        resolve();
      } else {
        video.onloadedmetadata = () => resolve();
      }
    });

    const duration = video.duration;
    const frameInterval = 1; // Extract a frame every 1 second

    for (let i = 0; i < duration; i += frameInterval) {
      video.currentTime = i;
      // Wait for the video to seek to the new time
      await new Promise((resolve) => {
        video.onseeked = () => resolve();
      });
      const frameDataUrl = captureFrame(video, canvas);
      if (frameDataUrl) {
        frames.push(frameDataUrl);
      }
    }

    setExtractedFrames(frames);
    setLoading(false);
    setMessage(`Extracted ${frames.length} frames.`);
  };

  /**
   * Converts the loaded video to a GIF using gif.js.
   */
  const convertToGif = async () => {
    if (!videoRef.current || !canvasRef.current || !videoFile) {
      setMessage("Please load a video first.");
      return;
    }

    setLoading(true);
    setMessage("Converting to GIF... This may take a while for longer videos.");
    setGifUrl("");

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Ensure video metadata is loaded before processing
    await new Promise((resolve) => {
      if (video.readyState >= 2) {
        resolve();
      } else {
        video.onloadedmetadata = () => resolve();
      }
    });

    const duration = video.duration;
    const frameRate = 10; // frames per second for the GIF
    const totalFrames = Math.min(duration * frameRate, 100); // Limit frames for performance
    const frameInterval = duration / totalFrames; // Time interval between frames

    // Initialize GIF.js
    // Check if GIF global is available (from CDN script)
    if (typeof GIF === "undefined") {
      setMessage(
        "Error: gif.js library not loaded. Please ensure the CDN script is included.",
      );
      setLoading(false);
      return;
    }

    const gif = new GIF({
      workers: 2, // Number of web workers to use for encoding
      quality: 10, // Lower quality (higher number) means faster encoding, smaller file
      width: video.videoWidth,
      height: video.videoHeight,
      workerScript: "https://unpkg.com/gif.js@0.2.0/gif.worker.js", // Path to the worker script
    });

    gif.on("progress", (p) => {
      setMessage(`Converting to GIF: ${Math.round(p * 100)}%`);
    });

    gif.on("finished", (blob) => {
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      setLoading(false);
      setMessage("GIF conversion complete!");
    });

    gif.on("error", (err) => {
      setMessage(`GIF conversion failed: ${err.message}`);
      setLoading(false);
    });

    // Capture frames for the GIF
    for (let i = 0; i < totalFrames; i++) {
      video.currentTime = i * frameInterval;
      await new Promise((resolve) => {
        video.onseeked = () => resolve();
      });
      const frameDataUrl = captureFrame(video, canvas);
      if (frameDataUrl) {
        // Add image data directly to gif.js
        const img = new Image();
        img.src = frameDataUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        gif.addFrame(img, { delay: 1000 / frameRate }); // Delay in ms
      }
    }

    gif.render();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/gif.js@0.2.0/gif.js"></script>{" "}
      {/* gif.js library */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          .btn-primary {
            @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out;
          }
          .btn-secondary {
            @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out;
          }
          .loading-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #3b82f6; /* Tailwind blue-500 */
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Video Processor
        </h1>

        {/* Explanation of Limitations */}
        <div
          className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md"
          role="alert"
        >
          <p className="font-bold">
            Important Note on Video Format Conversion:
          </p>
          <p className="text-sm mt-2"></p>
          <p className="text-sm mt-2"></p>
        </div>

        {/* File Input */}
        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="video-upload"
            className="block text-lg font-medium text-gray-700"
          >
            Upload Video File:
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>

        {/* Video Player */}
        {videoUrl && (
          <div className="mt-6 flex justify-center">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full max-h-96 rounded-lg shadow-md border border-gray-200"
              onLoadedMetadata={() => {
                setMessage(
                  `Video loaded: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight}, ${videoRef.current.duration.toFixed(2)}s`,
                );
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={extractFrames}
            disabled={!videoFile || loading}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {loading && message.startsWith("Extracting") && (
              <div className="loading-spinner"></div>
            )}
            Extract Frames
          </button>
          <button
            onClick={convertToGif}
            disabled={!videoFile || loading}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {loading && message.startsWith("Converting") && (
              <div className="loading-spinner"></div>
            )}
            Convert to GIF
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p className="text-center text-gray-600 mt-4 p-2 bg-gray-50 rounded-md">
            {message}
          </p>
        )}

        {/* Hidden Canvas for processing */}
        <canvas ref={canvasRef} className="hidden"></canvas>

        {/* Extracted Frames Display */}
        {extractedFrames.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Extracted Frames:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {extractedFrames.map((frame, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden shadow-md border border-gray-200"
                >
                  <img
                    src={frame}
                    alt={`Extracted Frame ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                  <a
                    href={frame}
                    download={`frame-${index + 1}.png`}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium rounded-lg"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GIF Display */}
        {gifUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Generated GIF:
            </h2>
            <img
              src={gifUrl}
              alt="Generated GIF"
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg border border-gray-200"
            />
            <a
              href={gifUrl}
              download="converted-video.gif"
              className="btn-primary mt-4 inline-block"
            >
              Download GIF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoConverter;
