// types/country.ts
export interface Country {
  id: string;
  iso2Code: string;
  name: string;
  region: {
    id: string;
    iso2code: string;
    value: string;
  };
  incomeLevel: {
    id: string;
    iso2code: string;
    value: string;
  };
  capitalCity: string;
  longitude: string;
  latitude: string;
}

export interface WorldBankMetadata {
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

// The World Bank API always returns [metadata, data[]]
export type WorldBankCountryResponse = [WorldBankMetadata, Country[] | null];