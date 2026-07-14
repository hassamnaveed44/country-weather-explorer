// components/CountryCard.tsx
import Link from "next/link";
import type { Country } from "@/types/country";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/countries/${country.iso2Code}`}
      className="block rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <p className="font-semibold text-gray-900">
        {country.name}{" "}
        <span className="text-xs font-normal text-gray-400">
          ({country.iso2Code})
        </span>
      </p>
      <p className="text-sm text-gray-500">{country.region.value}</p>
      <p className="mt-2 text-sm text-gray-600">
        Capital: {country.capitalCity || "N/A"}
      </p>
      <p className="text-xs text-gray-400">{country.incomeLevel.value}</p>
    </Link>
  );
}