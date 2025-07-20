import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faTimes, faSpa } from "@fortawesome/free-solid-svg-icons";

interface PomodoroProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function Pomodoro({ isOpen, onOpen, onClose }: PomodoroProps) {
  const FOCUS = 25 * 60;
  const BREAK = 5 * 60;

  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number>(0);

  // handle ticking
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            // switch mode
            const nextMode = mode === "focus" ? "break" : "focus";
            setMode(nextMode);
            return nextMode === "focus" ? FOCUS : BREAK;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      window.clearInterval(intervalRef.current);
    }
    return () => window.clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  // reset timer when mode changes manually
  useEffect(() => {
    setTimeLeft(mode === "focus" ? FOCUS : BREAK);
    setIsRunning(false);
  }, [mode]);

  // format mm:ss
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  // toggle start/stop
  const toggleRun = () => setIsRunning((r) => !r);

  if (!isOpen) {
    // collapsed: only call onOpen (remove local state)
    return (
      <button
        onClick={onOpen}
        className="
          absolute top-4 left-4
          flex flex-col items-center justify-center
          bg-white/10 rounded-md shadow-md
          text-white text-shadow
          backdrop-blur-md
          w-14 h-14
          hover:bg-white/20 transition-colors duration-200
        "
        aria-label="Open Pomodoro Timer"
      >
        <FontAwesomeIcon icon={faSpa} className="text-2xl" />
        <span className="mt-1 text-xs">Focus</span>
      </button>
    );
  }

  // full-screen timer
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 text-white p-4">
      {/* close button */}
      <button
        onClick={() => {
          onClose();
          setIsRunning(false);
        }}
        className="absolute top-4 left-4
          flex flex-col items-center justify-center
          bg-white/10 rounded-md shadow-md
          text-white text-shadow
          w-14 h-14
          backdrop-blur-md
          hover:bg-white/20 transition-colors duration-200"
        aria-label="Close Pomodoro Timer"
      >
        <FontAwesomeIcon icon={faTimes} className="text-2xl" />
      </button>

      {/* mode tabs */}
      <div className="flex space-x-8 mb-6">
        {["focus", "break"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as "focus" | "break")}
            className={`
              px-4 py-2 rounded 
              ${mode === m ? "bg-white text-gray-800" : "bg-white/30 hover:bg-white/50"}
              transition-colors duration-200
            `}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* timer display */}
      <div className="text-8xl font-semibold mb-6">
        {minutes}:{seconds}
      </div>

      {/* start/stop button */}
      <button
        onClick={toggleRun}
        className="
          mt-6                    /* pushes button down below the timer */
          w-16 h-16
          flex items-center justify-center
          bg-white/80 text-gray-800
          rounded-full shadow-lg
          hover:bg-white transition-colors duration-200
        "
        aria-label={isRunning ? "Stop timer" : "Start timer"}
      >
        <FontAwesomeIcon icon={isRunning ? faStop : faPlay} size="2x" />
      </button>
    </div>
  );
}
