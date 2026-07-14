// components/ErrorState.tsx
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong while fetching data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-10 text-center shadow-sm sm:px-6 sm:py-12">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
        <AlertTriangle className="h-7 w-7 text-red-500 sm:h-8 sm:w-8" />
      </div>
      <div>
        <p className="font-semibold text-red-700">{message}</p>
        <p className="mt-1 text-sm text-red-400">
          Please check your connection and try again.
        </p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700"
        >
          Retry
        </Button>
      )}
    </div>
  );
}