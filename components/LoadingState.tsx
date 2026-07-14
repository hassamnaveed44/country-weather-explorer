// components/LoadingState.tsx
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  message?: string;
  variant?: "spinner" | "skeleton-grid";
  count?: number;
}

export default function LoadingState({
  message = "Loading...",
  variant = "spinner",
  count = 6,
}: LoadingStateProps) {
  if (variant === "skeleton-grid") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/50 p-4 shadow-sm"
          >
            <Skeleton className="h-5 w-2/3 bg-indigo-100" />
            <Skeleton className="h-4 w-1/2 bg-sky-100" />
            <Skeleton className="h-4 w-full bg-indigo-100/70" />
            <Skeleton className="h-4 w-full bg-sky-100/70" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center sm:py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 sm:h-12 sm:w-12" />
      <p className="text-sm font-medium text-indigo-600/80">{message}</p>
    </div>
  );
}