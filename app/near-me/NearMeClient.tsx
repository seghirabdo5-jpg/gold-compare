"use client";

import { useState } from "react";
import type { Store } from "@/lib/types";

const cities = ["الرياض", "جدة", "الدمام", "مكة", "المدينة", "الخبر", "الدوحة", "دبي", "أبوظبي", "الكويت", "مسقط"];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function NearMeClient({ stores }: { stores: Store[] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "denied">("idle");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [results, setResults] = useState<{ storeName: string; branchName: string; city: string; distanceKm: number; lat: number; lng: number }[]>([]);

  const allBranches = stores.flatMap((s) =>
    s.branches.map((b) => ({ storeName: s.name, ...b }))
  );

  function requestLocation() {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const withDistance = allBranches
          .filter((b) => b.lat && b.lng)
          .map((b) => ({
            storeName: b.storeName,
            branchName: b.name,
            city: b.city,
            lat: b.lat as number,
            lng: b.lng as number,
            distanceKm: haversine(latitude, longitude, b.lat as number, b.lng as number),
          }))
          .sort((a, b) => a.distanceKm - b.distanceKm);
        setResults(withDistance);
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function filterByCity(city: string) {
    setSelectedCity(city);
    const filtered = allBranches
      .filter((b) => b.city === city && b.lat && b.lng)
      .map((b) => ({
        storeName: b.storeName,
        branchName: b.name,
        city: b.city,
        lat: b.lat as number,
        lng: b.lng as number,
        distanceKm: 0,
      }));
    setResults(filtered);
  }

  return (
    <div className="space-y-6">
      {status !== "granted" && (
        <div className="card p-6 text-center space-y-4">
          <button onClick={requestLocation} className="btn-primary w-full">
            {status === "loading" ? "جاري تحديد موقعك..." : "استخدم موقعي الحالي"}
          </button>
          <p className="text-xs text-muted">
            لا نقوم بتخزين موقعك على الخادم، يُستخدم فقط داخل متصفحك لحساب أقرب فرع.
          </p>
          {status === "denied" && (
            <div>
              <p className="text-sm text-ink mb-2">اختر مدينتك بدلًا من ذلك:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => filterByCity(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      selectedCity === c ? "bg-ink text-paper border-ink" : "border-line text-ink/70"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {results.length > 0 ? (
        <ul className="space-y-3">
          {results.map((r, i) => (
            <li key={i} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-ink">{r.storeName}</p>
                <p className="text-xs text-muted">
                  {r.branchName} - {r.city}
                  {r.distanceKm > 0 && ` • ${r.distanceKm.toFixed(1)} كم`}
                </p>
              </div>
              <a
                target="_blank"
                className="text-xs text-gold-dark hover:underline"
                href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
              >
                الاتجاهات
              </a>
            </li>
          ))}
        </ul>
      ) : (
        status !== "idle" &&
        status !== "loading" && (
          <p className="text-sm text-muted text-center">
            لا توجد بيانات فروع متوفرة حاليًا لهذه المنطقة. سيتم تحديثها قريبًا.
          </p>
        )
      )}
    </div>
  );
}
