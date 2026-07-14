// app/countries/page.tsx
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import SelectFilter from "@/components/SelectFilter";
import CountryGrid from "@/components/CountryGrid";
import { fetchCountries } from "@/lib/api/countries";
import type { Country } from "@/types/country";

type FetchStatus = "loading" | "success" | "error";

function CountriesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [region, setRegion] = useState(searchParams.get("region") ?? "");
  const [income, setIncome] = useState(searchParams.get("income") ?? "");

  const [countries, setCountries] = useState<Country[]>([]);
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setRegion(searchParams.get("region") ?? "");
    setIncome(searchParams.get("income") ?? "");
  }, [searchParams]);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setStatus("loading");
      try {
        const data = await fetchCountries();
        if (!ignore) {
          setCountries(data);
          setStatus("success");
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch countries:", err);
          setStatus("error");
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [refreshIndex]);

  // Same generic updateParam pattern established in Phase 4f — now handling 3 keys
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim() === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const regionOptions = useMemo(
    () => Array.from(new Set(countries.map((c) => c.region.value))).sort(),
    [countries]
  );
  const incomeOptions = useMemo(
    () => Array.from(new Set(countries.map((c) => c.incomeLevel.value))).sort(),
    [countries]
  );

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region ? c.region.value === region : true;
      const matchesIncome = income ? c.incomeLevel.value === income : true;
      return matchesSearch && matchesRegion && matchesIncome;
    });
  }, [countries, search, region, income]);

  if (status === "loading") {
    return <LoadingState message="Fetching countries..." variant="skeleton-grid" count={6} />;
  }

  if (status === "error") {
    return <ErrorState onRetry={() => setRefreshIndex((p) => p + 1)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-500">Search</label>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateParam("search", e.target.value);
            }}
            placeholder="Search country..."
            className="sm:max-w-xs"
          />
        </div>

        <SelectFilter
          label="Region"
          value={region}
          options={regionOptions}
          onChange={(val) => {
            setRegion(val);
            updateParam("region", val);
          }}
        />

        <SelectFilter
          label="Income Level"
          value={income}
          options={incomeOptions}
          onChange={(val) => {
            setIncome(val);
            updateParam("income", val);
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No countries match your filters" />
      ) : (
        <CountryGrid countries={filtered} />
      )}
    </div>
  );
}

export default function CountriesPage() {
  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
        <p className="mt-1 text-gray-600">
          Browse and filter countries from the World Bank API.
        </p>
      </div>

      <Suspense fallback={<LoadingState message="Loading..." />}>
        <CountriesContent />
      </Suspense>
    </div>
  );
}