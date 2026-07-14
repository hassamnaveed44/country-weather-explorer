// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-gradient-to-r from-indigo-100 via-gray-200 to-sky-200">
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 py-10 text-sm sm:flex-row sm:justify-between sm:gap-3 sm:py-12">
        <p className="text-center text-gray-600 sm:text-left">
          <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text font-semibold text-transparent">
            © {new Date().getFullYear()} Country Weather Explorer
          </span>{" "}
          · Built with Next.js
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-500 transition-colors hover:text-indigo-600"
          >
            Next.js Docs
          </Link>
          <Link
            href="https://api.worldbank.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-600 transition-colors hover:text-emerald-800"
          >
            World Bank API
          </Link>
          <Link
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sky-600 transition-colors hover:text-sky-800"
          >
            Open-Meteo API
          </Link>
        </div>
      </div>
    </footer>
  );
}