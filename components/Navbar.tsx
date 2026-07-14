// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/playground", label: "Playground" },
  { href: "/countries", label: "Countries" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-base font-bold tracking-tight sm:text-lg">
          🌍 Country
          <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Explorer
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors sm:px-3",
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[13px] left-1/2 hidden h-0.5 w-8 -translate-x-1/2 rounded-full bg-indigo-500 sm:block" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}