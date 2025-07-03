import React, { useState, useEffect, useRef } from "react";
import "./TimerStopwatch.css";

function TimerStopwatch() {
  const [mode, setMode] = useState("stopwatch"); // 'stopwatch' or 'timer'
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // Time in milliseconds
  const [laps, setLaps] = useState([]);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const intervalRef = useRef(null); // To store the interval ID

  // Effect for stopwatch/timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (mode === "stopwatch") {
            return prevTime + 10; // Increment by 10ms
          } else {
            // mode === 'timer'
            if (prevTime <= 10) {
              // Check for near zero to prevent negative time
              clearInterval(intervalRef.current);
              setIsRunning(false);
              setMessage("Timer finished!");
              return 0;
            }
            return prevTime - 10; // Decrement by 10ms
          }
        });
      }, 10); // Update every 10 milliseconds
    } else {
      clearInterval(intervalRef.current);
    }

    // Cleanup function
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  // Message state for timer completion
  const [message, setMessage] = useState("");

  /**
   * Formats milliseconds into HH:MM:SS.ms string.
   * @param {number} ms - Time in milliseconds.
   * @returns {string} Formatted time string.
   */
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Show two digits for milliseconds

    return (
      `${String(hours).padStart(2, "0")}:` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}.` +
      `${String(milliseconds).padStart(2, "0")}`
    );
  };

  /**
   * Starts the stopwatch or timer.
   */
  const handleStart = () => {
    if (mode === "timer" && time === 0) {
      setErrorMessage("Please set a timer duration first.");
      return;
    }
    setIsRunning(true);
    setErrorMessage("");
    setMessage("");
  };

  /**
   * Pauses the stopwatch or timer.
   */
  const handlePause = () => {
    setIsRunning(false);
  };

  /**
   * Resets the stopwatch or timer.
   */
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setErrorMessage("");
    setMessage("");
    if (mode === "timer") {
      setInputMinutes("");
      setInputSeconds("");
    }
  };

  /**
   * Records a lap time for the stopwatch.
   */
  const handleLap = () => {
    if (mode === "stopwatch" && isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  /**
   * Sets the initial time for the countdown timer.
   */
  const setTimerDuration = () => {
    const minutes = parseInt(inputMinutes || "0");
    const seconds = parseInt(inputSeconds || "0");

    if (
      isNaN(minutes) ||
      isNaN(seconds) ||
      minutes < 0 ||
      seconds < 0 ||
      seconds >= 60
    ) {
      setErrorMessage("Please enter valid minutes (>=0) and seconds (0-59).");
      return;
    }

    const totalMs = (minutes * 60 + seconds) * 1000;
    if (totalMs === 0) {
      setErrorMessage("Timer duration must be greater than zero.");
      return;
    }

    setTime(totalMs);
    setIsRunning(false); // Stop if running when new duration set
    setErrorMessage("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="card">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Timer / Stopwatch
        </h1>

        {/* Mode Toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => {
              setMode("stopwatch");
              handleReset();
            }}
            className={`btn-toggle ${mode === "stopwatch" ? "btn-active" : "btn-inactive"}`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => {
              setMode("timer");
              handleReset();
            }}
            className={`btn-toggle ${mode === "timer" ? "btn-active" : "btn-inactive"}`}
          >
            Timer
          </button>
        </div>

        {/* Timer Input Section */}
        {mode === "timer" && (
          <div className="flex flex-col items-center space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Set Timer Duration:
            </h2>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="MM"
                min="0"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                className="input-field w-20 text-center"
              />
              <span className="text-2xl">:</span>
              <input
                type="number"
                placeholder="SS"
                min="0"
                max="59"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                className="input-field w-20 text-center"
              />
            </div>
            <button
              onClick={setTimerDuration}
              className="btn-action bg-blue-500 text-white hover:bg-blue-600"
            >
              Set Timer
            </button>
          </div>
        )}

        {/* Display Time */}
        <div className="text-5xl font-mono font-bold text-center text-gray-900 mb-6">
          {formatTime(time)}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <button onClick={handleStart} className="btn-action btn-start">
              Start
            </button>
          ) : (
            <button onClick={handlePause} className="btn-action btn-pause">
              Pause
            </button>
          )}
          <button onClick={handleReset} className="btn-action btn-reset">
            Reset
          </button>
          {mode === "stopwatch" && (
            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="btn-action btn-lap"
            >
              Lap
            </button>
          )}
        </div>

        {/* Error and Status Messages */}
        {errorMessage && (
          <p className="error-message text-center mt-4">{errorMessage}</p>
        )}
        {message && (
          <p className="status-message text-center mt-4">{message}</p>
        )}

        {/* Lap Times Display */}
        {mode === "stopwatch" && laps.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Lap Times:
            </h2>
            <ul className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
              {laps.map((lapTime, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                >
                  <span className="font-mono text-gray-800">
                    Lap {index + 1}:
                  </span>
                  <span className="font-mono text-gray-800">
                    {formatTime(lapTime)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimerStopwatch;
