// components/playground/CounterDemo.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div className="text-center sm:text-left">
        <p className="text-sm text-gray-500">Current count</p>
        <p
          className={`text-5xl font-bold ${
            count < 0 ? "text-red-500" : "text-blue-600"
          }`}
        >
          {count}
        </p>
      </div>

      <div className="flex gap-2">
        <Button onClick={decrease} variant="outline">
          Decrease
        </Button>
        <Button onClick={increase}>Increase</Button>
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
}