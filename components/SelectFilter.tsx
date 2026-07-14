// components/SelectFilter.tsx
"use client";

interface SelectFilterProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SelectFilter({
  label,
  value,
  options,
  onChange,
}: SelectFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-indigo-600/80">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-indigo-100 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}