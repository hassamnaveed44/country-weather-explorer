// lib/api/indicators.ts
import type {
  CountryIndicators,
  WorldBankIndicatorResponse,
} from "@/types/indicator";

const POPULATION_INDICATOR = "SP.POP.TOTL";
const GDP_INDICATOR = "NY.GDP.MKTP.CD";

/**
 * Fetches the most recent non-null population and GDP values for a country
 * from the World Bank Indicator API. mrv=5 grabs the last 5 years so we can
 * skip any recent years that have null values (common for the latest year).
 */
export async function fetchCountryIndicators(
  code: string
): Promise<CountryIndicators> {
  const [popRes, gdpRes] = await Promise.all([
    fetch(
      `https://api.worldbank.org/v2/country/${code}/indicator/${POPULATION_INDICATOR}?format=json&mrv=5`,
      { cache: "no-store" }
    ),
    fetch(
      `https://api.worldbank.org/v2/country/${code}/indicator/${GDP_INDICATOR}?format=json&mrv=5`,
      { cache: "no-store" }
    ),
  ]);

  if (!popRes.ok || !gdpRes.ok) {
    throw new Error("Failed to fetch indicator data");
  }

  const popJson: WorldBankIndicatorResponse = await popRes.json();
  const gdpJson: WorldBankIndicatorResponse = await gdpRes.json();

  const popData = popJson[1];
  const gdpData = gdpJson[1];

  // Find the most recent entry that actually has a value (skip nulls)
  const latestPop = popData?.find((d) => d.value !== null) ?? null;
  const latestGdp = gdpData?.find((d) => d.value !== null) ?? null;

  return {
    population: latestPop?.value ?? null,
    populationYear: latestPop?.date ?? null,
    gdp: latestGdp?.value ?? null,
    gdpYear: latestGdp?.date ?? null,
  };
}