// components/CountryCard.tsx
import Link from "next/link";
import type { Country } from "@/types/country";

const incomeColorMap: Record<string, string> = {
  "High income": "bg-emerald-50 text-emerald-700",
  "Upper middle income": "bg-sky-50 text-sky-700",
  "Lower middle income": "bg-amber-50 text-amber-700",
  "Low income": "bg-red-50 text-red-700",
};

export default function CountryCard({ country }: { country: Country }) {
  const incomeStyle =
    incomeColorMap[country.incomeLevel.value] ?? "bg-gray-50 text-gray-600";

  return (
    <Link
      href={`/countries/${country.iso2Code}`}
      className="group block rounded-xl border border-l-4 border-l-indigo-500 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-l-indigo-600 hover:shadow-lg"
    >
      <p className="font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
        {country.name}{" "}
        <span className="text-xs font-normal text-gray-400">
          ({country.iso2Code})
        </span>
      </p>
      <p className="text-sm font-medium text-sky-600">{country.region.value}</p>
      <p className="mt-2 text-sm text-gray-600">
        Capital: {country.capitalCity || "N/A"}
      </p>
      <span
        className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${incomeStyle}`}
      >
        {country.incomeLevel.value}
      </span>
    </Link>
  );
}