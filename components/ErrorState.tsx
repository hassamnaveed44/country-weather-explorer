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
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center">
      <AlertTriangle className="h-10 w-10 text-red-500" />
      <div>
        <p className="font-medium text-red-700">{message}</p>
        <p className="mt-1 text-sm text-red-500">
          Please check your connection and try again.
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}