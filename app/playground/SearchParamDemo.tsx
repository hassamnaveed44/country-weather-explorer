"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchParamDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  // Update local state when URL changes, but defer the update
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchParams.get("search") ?? "");
    }, 0); // Defer to the next tick
    
    return () => clearTimeout(handler);
  }, [searchParams]);

  const updateUrl = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", value);
    }

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // Sync local state immediately
    updateUrl(value); // Sync URL
  };

  const handleClear = () => {
    setSearch("");
    updateUrl("");
  };

  return (
    // ... (rest of your return JSX remains the same)
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={search}
          onChange={handleChange}
          placeholder="Search e.g. 'ali'..."
          className="sm:max-w-xs"
        />
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <p className="text-sm text-gray-600">
        Current <code className="rounded bg-gray-100 px-1">search</code> param:{" "}
        <span className="font-semibold text-blue-600">
          {searchParams.get("search") || "(none)"}
        </span>
      </p>
    </div>
  );
}