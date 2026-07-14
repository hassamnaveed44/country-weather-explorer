// components/playground/SearchParamDemo.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["technology", "business", "health", "sports"];

export default function SearchParamDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");

  // Update local state when URL changes, but defer the update
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchParams.get("search") ?? "");
      setCategory(searchParams.get("category") ?? "");
    }, 0); // Defer to the next tick

    return () => clearTimeout(handler);
  }, [searchParams]);

  /**
   * Generic single-param updater — reused for both "search" and "category".
   * Always starts from the CURRENT params, so updating one key never
   * touches any other key already sitting in the URL.
   */
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim() === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // Sync local state immediately
    updateParam("search", value); // Sync URL
  };

  const handleClearSearch = () => {
    setSearch("");
    updateParam("search", "");
  };

  const handleCategoryClick = (value: string) => {
    // Clicking the already-active category toggles it off.
    const next = category === value ? "" : value;
    setCategory(next);
    updateParam("category", next);
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="Search e.g. 'ali'..."
          className="sm:max-w-xs"
        />
        <Button variant="outline" onClick={handleClearSearch}>
          Clear Search
        </Button>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={category === cat ? "default" : "outline"}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Live param readout */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          Current <code className="rounded bg-gray-100 px-1">search</code> param:{" "}
          <span className="font-semibold text-blue-600">
            {searchParams.get("search") || "(none)"}
          </span>
        </p>
        <p>
          Current <code className="rounded bg-gray-100 px-1">category</code> param:{" "}
          <span className="font-semibold text-blue-600">
            {searchParams.get("category") || "(none)"}
          </span>
        </p>
      </div>

      <p className="text-xs text-gray-400">
        Set both, then refresh — both params should persist independently.
        Clear one — confirm the other stays untouched.
      </p>
    </div>
  );
}