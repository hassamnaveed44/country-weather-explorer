// components/CountryGrid.tsx
import type { Country } from "@/types/country";
import CountryCard from "./CountryCard";

export default function CountryGrid({ countries }: { countries: Country[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {countries.map((country) => (
        <CountryCard key={country.id} country={country} />
      ))}
    </div>
  );
}