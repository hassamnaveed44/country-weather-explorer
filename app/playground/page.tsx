// app/playground/page.tsx
import CounterDemo from "@/app/playground/CounterDemo";

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
    </div>
  );
}