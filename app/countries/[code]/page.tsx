// app/countries/[code]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { fetchCountryByCode } from "@/lib/api/countries";
import { fetchCountryIndicators } from "@/lib/api/indicator";
import { fetchWeatherByCoords } from "@/lib/api/weather";
import { getWeatherLabel } from "@/lib/weather";
import type { Country } from "@/types/country";
import type { CountryIndicators } from "@/types/indicator";
import type { OpenMeteoResponse } from "@/types/weather";

type FetchStatus = "loading" | "success" | "empty" | "error";

export default function CountryDetailPage() {
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const code = params.code;

  // --- Independent state #1: country info ---
  const [country, setCountry] = useState<Country | null>(null);
  const [countryStatus, setCountryStatus] = useState<FetchStatus>("loading");
  const [countryRefresh, setCountryRefresh] = useState(0);

  // --- Independent state #2: population/GDP indicators ---
  const [indicators, setIndicators] = useState<CountryIndicators | null>(null);
  const [indicatorStatus, setIndicatorStatus] = useState<FetchStatus>("loading");
  const [indicatorRefresh, setIndicatorRefresh] = useState(0);

  // --- Independent state #3: weather ---
  const [weather, setWeather] = useState<OpenMeteoResponse | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<FetchStatus>("loading");
  const [weatherRefresh, setWeatherRefresh] = useState(0);

  // Fetch country info
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setCountryStatus("loading");
      try {
        const data = await fetchCountryByCode(code);
        if (ignore) return;

        if (!data) {
          setCountryStatus("empty");
          return;
        }

        setCountry(data);
        setCountryStatus("success");
      } catch (err) {
        if (ignore) return;
        console.error("Failed to fetch country:", err);
        setCountryStatus("error");
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [code, countryRefresh]);

  // Fetch population/GDP indicators
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setIndicatorStatus("loading");
      try {
        const data = await fetchCountryIndicators(code);
        if (ignore) return;

        setIndicators(data);
        setIndicatorStatus(
          data.population === null && data.gdp === null ? "empty" : "success"
        );
      } catch (err) {
        if (ignore) return;
        console.error("Failed to fetch indicators:", err);
        setIndicatorStatus("error");
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [code, indicatorRefresh]);

  // Fetch weather
  useEffect(() => {
    if (countryStatus !== "success" || !country) return;

    let ignore = false;
    const lat = parseFloat(country.latitude);
    const lon = parseFloat(country.longitude);

    if (isNaN(lat) || isNaN(lon)) {
      const timer = setTimeout(() => {
        if (!ignore) setWeatherStatus("empty");
      }, 0);
      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    }

    const load = async () => {
      setWeatherStatus("loading");
      try {
        const data = await fetchWeatherByCoords(lat, lon);
        if (ignore) return;

        if (!data?.current_weather) {
          setWeatherStatus("empty");
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

    load();
    return () => {
      ignore = true;
    };
  }, [country, countryStatus, weatherRefresh]);

  return (
    <div className="space-y-6 pb-20">
      <Button variant="outline" onClick={() => router.push("/countries")}>
        ← Back to Countries
      </Button>

      {/* Country info block */}
      {countryStatus === "loading" && <LoadingState message="Loading country..." />}
      {countryStatus === "error" && (
        <ErrorState onRetry={() => setCountryRefresh((p) => p + 1)} />
      )}
      {countryStatus === "empty" && <EmptyState title="Country not found" />}
      {countryStatus === "success" && country && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight">
            {country.name}{" "}
            <span className="text-lg font-normal text-gray-400">
              ({country.iso2Code})
            </span>
          </h1>
          <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <p><span className="text-gray-500">Region:</span> {country.region.value}</p>
            <p><span className="text-gray-500">Income Level:</span> {country.incomeLevel.value}</p>
            <p><span className="text-gray-500">Capital:</span> {country.capitalCity || "N/A"}</p>
            <p><span className="text-gray-500">Coordinates:</span> {country.latitude}, {country.longitude}</p>
          </div>
        </div>
      )}

      {/* Indicators block */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Population & GDP</h2>
          {indicatorStatus === "loading" && <LoadingState message="Loading indicators..." />}
          {indicatorStatus === "error" && (
            <ErrorState onRetry={() => setIndicatorRefresh((p) => p + 1)} />
          )}
          {indicatorStatus === "empty" && <EmptyState title="No indicator data available" />}
          {indicatorStatus === "success" && indicators && (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">
                  Population {indicators.populationYear ? `(${indicators.populationYear})` : ""}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {indicators.population?.toLocaleString() ?? "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  GDP {indicators.gdpYear ? `(${indicators.gdpYear})` : ""}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {indicators.gdp
                    ? `$${indicators.gdp.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Weather block */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Current Weather (Capital)</h2>
          {weatherStatus === "loading" && <LoadingState message="Loading weather..." />}
          {weatherStatus === "error" && (
            <ErrorState onRetry={() => setWeatherRefresh((p) => p + 1)} />
          )}
          {weatherStatus === "empty" && <EmptyState title="No weather data available" />}
          {weatherStatus === "success" && weather && (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">
                {weather.current_weather.temperature}°C
              </p>
              <p className="text-sm text-gray-600">
                {getWeatherLabel(weather.current_weather.weathercode)}
              </p>
              <p className="text-xs text-gray-500">
                Wind: {weather.current_weather.windspeed} km/h
              </p>
              <p className="text-xs text-gray-500">
                {weather.current_weather.is_day ? "☀️ Daytime" : "🌙 Nighttime"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}