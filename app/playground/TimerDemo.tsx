// components/playground/TimerDemo.tsx
"use client";

import { useEffect, useState } from "react";

export default function TimerDemo() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function — runs when component unmounts
    return () => clearInterval(intervalId);
  }, []); // empty dependency array = run once, on mount

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-sm text-gray-500">Time on this page</p>
      <p className="font-mono text-4xl font-bold text-blue-600">
        {formatTime(seconds)}
      </p>
      <p className="text-xs text-gray-400">
        {seconds} second{seconds !== 1 ? "s" : ""} elapsed
      </p>
    </div>
  );
}