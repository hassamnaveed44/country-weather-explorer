// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gradient-to-r from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
        <p className="text-gray-600">
          <span className="font-semibold text-blue-600">
            © {new Date().getFullYear()} Country Weather Explorer
          </span>{" "}
          · Built with Next.js
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-500 transition-colors hover:text-black"
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