// components/playground/ApiDemo.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import type { Country, WorldBankCountryResponse } from "@/types/country";
import type { OpenMeteoResponse } from "@/types/weather";
import { getWeatherLabel } from "@/lib/weather";

type FetchStatus = "idle" | "loading" | "success" | "empty" | "error";

const COUNTRIES_API_URL =
  "https://api.worldbank.org/v2/country?format=json&per_page=20";

// Demo coordinates: Islamabad, Pakistan — swap for any lat/long you like.
const WEATHER_API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=33.6844&longitude=73.0479&current_weather=true";

export default function ApiDemo() {
  // --- Independent state machine #1: World Bank countries ---
  const [countryStatus, setCountryStatus] = useState<FetchStatus>("idle");
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryRefreshIndex, setCountryRefreshIndex] = useState(0);

  const retryCountries = useCallback(() => {
    setCountryRefreshIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchCountries = async () => {
      setCountryStatus("loading");
      try {
        const res = await fetch(COUNTRIES_API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

        const json: WorldBankCountryResponse = await res.json();
        const data = json[1];

        if (ignore) return;

        if (!data || data.length === 0) {
          setCountryStatus("empty");
          setCountries([]);
          return;
        }

        const realCountries = data.filter((c) => c.region.value !== "Aggregates");
        setCountries(realCountries);
        setCountryStatus(realCountries.length === 0 ? "empty" : "success");
      } catch (err) {
        if (ignore) return;
        console.error("Failed to fetch countries:", err);
        setCountryStatus("error");
      }
    };

    fetchCountries();
    return () => {
      ignore = true;
    };
  }, [countryRefreshIndex]);

  // --- Independent state machine #2: Open-Meteo weather ---
  const [weatherStatus, setWeatherStatus] = useState<FetchStatus>("idle");
  const [weather, setWeather] = useState<OpenMeteoResponse | null>(null);
  const [weatherRefreshIndex, setWeatherRefreshIndex] = useState(0);

  const retryWeather = useCallback(() => {
    setWeatherRefreshIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchWeather = async () => {
      setWeatherStatus("loading");
      try {
        const res = await fetch(WEATHER_API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

        const data: OpenMeteoResponse = await res.json();

        if (ignore) return;

        if (!data?.current_weather) {
          setWeatherStatus("empty");
          setWeather(null);
          return;
        }

        setWeather(data);
        setWeatherStatus("success");
      } catch (err) {
        if (ignore) return;
        console.error("Failed to fetch weather:", err);
        setWeatherStatus("error");
      }
    };

    fetchWeather();
    return () => {
      ignore = true;
    };
  }, [weatherRefreshIndex]);

  return (
    <div className="space-y-8">
      {/* --- Countries block (World Bank) --- */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          World Bank — Countries
        </h3>

        {countryStatus === "loading" && (
          <LoadingState
            message="Fetching countries from World Bank..."
            variant="skeleton-grid"
            count={3}
          />
        )}
        {countryStatus === "error" && <ErrorState onRetry={retryCountries} />}
        {countryStatus === "empty" && <EmptyState title="No countries found" />}
        {countryStatus === "success" && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {countries.slice(0, 6).map((country) => (
                <div key={country.id} className="rounded-xl border bg-white p-4 shadow-sm">
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
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={retryCountries} className="mt-3">
              Refresh Countries
            </Button>
          </>
        )}
      </div>

      {/* --- Weather block (Open-Meteo) --- */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Open-Meteo — Live Weather (Islamabad)
        </h3>

        {weatherStatus === "loading" && (
          <LoadingState message="Fetching current weather..." />
        )}
        {weatherStatus === "error" && <ErrorState onRetry={retryWeather} />}
        {weatherStatus === "empty" && <EmptyState title="No weather data available" />}
        {weatherStatus === "success" && weather && (
          <div className="max-w-xs rounded-xl border bg-blue-50 p-4 shadow-sm">
            <p className="text-3xl font-bold text-blue-700">
              {weather.current_weather.temperature}°C
            </p>
            <p className="text-sm text-gray-600">
              {getWeatherLabel(weather.current_weather.weathercode)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Wind: {weather.current_weather.windspeed} km/h
            </p>
            <p className="text-xs text-gray-500">
              {weather.current_weather.is_day ? "☀️ Daytime" : "🌙 Nighttime"}
            </p>
            <Button variant="outline" onClick={retryWeather} className="mt-3">
              Refresh Weather
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}