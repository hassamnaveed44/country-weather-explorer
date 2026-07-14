// components/playground/ControlledInputDemo.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ControlledInputDemo() {
  const [name, setName] = useState("");

  const handleClear = () => setName("");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name..."
          className="sm:max-w-xs"
        />
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <p className="text-lg">
        Hello,{" "}
        <span className="font-semibold text-blue-600">
          {name.trim() ? name : "stranger"}
        </span>
        !
      </p>
    </div>
  );
}