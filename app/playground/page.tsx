// app/playground/page.tsx
import { Suspense } from "react";
import CounterDemo from "@/app/playground/CounterDemo";
import ControlledInputDemo from "@/app/playground/ControlledInputDemo";
import TimerDemo from "@/app/playground/TimerDemo";
import ApiDemo from "@/app/playground/ApiDemo";
import SearchParamDemo from "@/app/playground/SearchParamDemo";

export default function PlaygroundPage() {
  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
        <p className="mt-1 text-gray-600">
          Hands-on experiments with React hooks and URL search parameters.
        </p>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">1. useState Counter</h2>
        <CounterDemo />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">2. Controlled Input</h2>
        <ControlledInputDemo />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">3. useEffect Timer</h2>
        <TimerDemo />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">4. Open API Calling</h2>
        <ApiDemo />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">5. Search Parameters</h2>
        <Suspense fallback={<p className="text-sm text-gray-400">Loading...</p>}>
          <SearchParamDemo />
        </Suspense>
      </section>
    </div>
  );
}