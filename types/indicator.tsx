// types/indicator.ts
export interface IndicatorDataPoint {
  countryiso3code: string;
  date: string;
  value: number | null;
  indicator: { id: string; value: string };
}

export interface IndicatorMetadata {
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

// World Bank Indicator API also returns [metadata, data[]]
export type WorldBankIndicatorResponse = [IndicatorMetadata, IndicatorDataPoint[] | null];

export interface CountryIndicators {
  population: number | null;
  populationYear: string | null;
  gdp: number | null;
  gdpYear: string | null;
}