// lib/api/weather.ts
import type { OpenMeteoResponse } from "@/types/weather";

/**
 * Fetches current weather conditions for a given latitude/longitude
 * from the Open-Meteo API (no API key required).
 */
export async function fetchWeatherByCoords(
  latitude: number,
  longitude: number
): Promise<OpenMeteoResponse> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}