import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const App = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);

  // Predefined timer options
  const timerOptions = [60, 120, 1800]; // 1 min, 2 min, 30 min

  // Countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  // Format time into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle timer controls
  const handleStart = () => {
    if (time > 0) setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTime(selectedTime);
  };

  const handleSelectTime = (seconds) => {
    setSelectedTime(seconds);
    setTime(seconds);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex items-center justify-center w-48 h-48 bg-blue-500 rounded-full">
        <svg
          className="absolute w-full h-full transform rotate-90"
          viewBox="0 0 36 36"
        >
          <path
            className="text-blue-200"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
          />
          <path
            className="text-blue-600"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`$((time / selectedTime) * 100)}, 100`}
            stroke="currentColor"
          />
        </svg>
        <span className="text-3xl text-white">{formatTime(time)}</span>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>

      <div className="flex flex-col items-center mt-8">
        <h3 className="mb-4 text-lg font-semibold">Select Timer</h3>
        <div className="flex gap-4">
          {timerOptions.map((option) => (
            <button
              key={option}
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => handleSelectTime(option)}
            >
              {option / 60} min
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;





