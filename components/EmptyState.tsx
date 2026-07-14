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
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-16 text-center text-gray-500">
      <SearchX className="h-10 w-10 text-gray-400" />
      <p className="font-medium text-gray-700">{title}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}