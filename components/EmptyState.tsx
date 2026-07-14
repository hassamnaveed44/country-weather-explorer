// components/EmptyState.tsx
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No results found",
  message = "Try adjusting your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-amber-200 bg-gradient-to-br from-amber-50/60 via-white to-slate-50 px-4 py-12 text-center shadow-sm sm:py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 sm:h-16 sm:w-16">
        <SearchX className="h-7 w-7 text-amber-500 sm:h-8 sm:w-8" />
      </div>
      <p className="mt-1 font-semibold text-gray-700">{title}</p>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}