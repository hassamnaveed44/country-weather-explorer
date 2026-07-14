// lib/api/countries.ts
import type { Country, WorldBankCountryResponse } from "@/types/country";

/**
 * Fetches the full country list from the World Bank Country API in one call
 * (per_page=300 covers all ~296 entries) and filters out aggregate "regions"
 * (e.g. "World", "Arab World") that aren't real countries.
 */
export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(
    "https://api.worldbank.org/v2/country?format=json&per_page=300",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const json: WorldBankCountryResponse = await res.json();
  const data = json[1];

  if (!data) return [];

  return data.filter((c) => c.region.value !== "Aggregates" && c.capitalCity);
}

/**
 * Fetches a single country by its ISO2 code (e.g. "PK", "AW")
 * directly from the World Bank Country API.
 */
export async function fetchCountryByCode(code: string): Promise<Country | null> {
  const res = await fetch(
    `https://api.worldbank.org/v2/country/${code}?format=json`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const json: WorldBankCountryResponse = await res.json();
  const data = json[1];

  if (!data || data.length === 0) return null;

  return data[0];
}