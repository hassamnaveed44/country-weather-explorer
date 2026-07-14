// app/playground/page.tsx
import { Suspense } from "react";
import CounterDemo from "@/app/playground/CounterDemo";
import ControlledInputDemo from "@/app/playground/ControlledInputDemo";
import TimerDemo from "@/app/playground/TimerDemo";
import ApiDemo from "@/app/playground/ApiDemo";
import SearchParamDemo from "@/app/playground/SearchParamDemo";

const sections = [
  { num: 1, title: "useState Counter", accent: "indigo" },
  { num: 2, title: "Controlled Input", accent: "sky" },
  { num: 3, title: "useEffect Timer", accent: "emerald" },
  { num: 4, title: "Open API Calling", accent: "amber" },
  { num: 5, title: "Search Parameters", accent: "rose" },
] as const;

const accentStyles: Record<(typeof sections)[number]["accent"], { border: string; badge: string }> = {
  indigo: { border: "border-l-indigo-500", badge: "bg-indigo-100 text-indigo-700" },
  sky: { border: "border-l-sky-500", badge: "bg-sky-100 text-sky-700" },
  emerald: { border: "border-l-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  amber: { border: "border-l-amber-500", badge: "bg-amber-100 text-amber-700" },
  rose: { border: "border-l-rose-500", badge: "bg-rose-100 text-rose-700" },
};

export default function PlaygroundPage() {
  return (
    <div className="space-y-8 pb-20 sm:space-y-10">
      <div>
        <h1 className="bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Playground
        </h1>
        <p className="mt-1 text-gray-600">
          Hands-on experiments with React hooks and URL search parameters.
        </p>
      </div>

      <section
        className={`rounded-xl border border-l-4 ${accentStyles.indigo.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6`}
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${accentStyles.indigo.badge}`}>
            {sections[0].num}
          </span>
          {sections[0].title}
        </h2>
        <CounterDemo />
      </section>

      <section
        className={`rounded-xl border border-l-4 ${accentStyles.sky.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6`}
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${accentStyles.sky.badge}`}>
            {sections[1].num}
          </span>
          {sections[1].title}
        </h2>
        <ControlledInputDemo />
      </section>

      <section
        className={`rounded-xl border border-l-4 ${accentStyles.emerald.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6`}
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${accentStyles.emerald.badge}`}>
            {sections[2].num}
          </span>
          {sections[2].title}
        </h2>
        <TimerDemo />
      </section>

      <section
        className={`rounded-xl border border-l-4 ${accentStyles.amber.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6`}
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${accentStyles.amber.badge}`}>
            {sections[3].num}
          </span>
          {sections[3].title}
        </h2>
        <ApiDemo />
      </section>

      <section
        className={`rounded-xl border border-l-4 ${accentStyles.rose.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6`}
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${accentStyles.rose.badge}`}>
            {sections[4].num}
          </span>
          {sections[4].title}
        </h2>
        <Suspense fallback={<p className="text-sm text-gray-400">Loading...</p>}>
          <SearchParamDemo />
        </Suspense>
      </section>
    </div>
  );
}