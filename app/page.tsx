// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        🌍 Country & Weather Explorer
      </h1>
      <p className="max-w-md text-gray-600">
        Explore countries around the world, their economic indicators, and
        live weather — built with Next.js, TypeScript, and Tailwind CSS.
      </p>
      <div className="flex gap-3">
        <Link href="/countries">
          <Button>Browse Countries</Button>
        </Link>
        <Link href="/playground">
          <Button variant="outline">View Playground</Button>
        </Link>
      </div>
    </div>
  );
}