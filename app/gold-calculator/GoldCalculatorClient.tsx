"use client";

import { useMemo, useState, useEffect } from "react";

const karats = [24, 22, 21, 18] as const;

export default function GoldCalculatorClient() {
  const [karat, setKarat] = useState<number>(21);
  const [weight, setWeight] = useState<string>("");
  const [pricePerGram, setPricePerGram] = useState<string>("");
  const [making, setMaking] = useState<string>("0");
  const [autoFilled, setAutoFilled] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(true);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("/api/gold-price");
        const data = await res.json();
        if (data.available) {
          const match = data.prices.find((p: any) => p.karat === karat);
          if (match) {
            setPricePerGram(match.pricePerGram.toFixed(2));
            setAutoFilled(true);
          }
        }
      } catch {
        // تجاهل الخطأ، يبقى الحقل قابل للتعديل اليدوي
      } finally {
        setLoadingPrice(false);
      }
    }
    fetchPrice();
  }, [karat]);

  const result = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const p = parseFloat(pricePerGram) || 0;
    const m = parseFloat(making) || 0;
    const rawGold = w * p;
    const finalPrice = rawGold + m;
    return { rawGold, finalPrice };
  }, [weight, pricePerGram, making]);

  return (
    <div className="card p-6 space-y-5">
      <div>
        <label className="text-sm font-medium text-ink block mb-2">عيار الذهب</label>
        <div className="flex gap-2">
          {karats.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKarat(k)}
              className={`flex-1 rounded-full border px-3 py-2 text-sm transition-colors ${
                karat === k ? "bg-ink text-paper border-ink" : "border-line text-ink/70"
              }`}
            >
              عيار {k}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-2">وزن الذهب (بالجرام)</label>
        <input
          type="number"
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="مثال: 10"
          className="w-full rounded-card border border-line px-4 py-3 text-ink"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-2">
          سعر جرام الذهب (عيار {karat}) بالريال
        </label>
        <input
          type="number"
          inputMode="decimal"
          value={pricePerGram}
          onChange={(e) => {
            setPricePerGram(e.target.value);
            setAutoFilled(false);
          }}
          placeholder={loadingPrice ? "جاري جلب السعر..." : "أدخل السعر الحالي"}
          className="w-full rounded-card border border-line px-4 py-3 text-ink"
        />
        <p className="text-xs text-muted mt-1">
          {autoFilled
            ? "تم تعبئة السعر تلقائيًا من أسعار اليوم، ويمكنك تعديله يدويًا."
            : "يمكنك تعديل السعر يدويًا إذا كان لديك سعر أدق."}
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-ink block mb-2">المصنعية (اختياري، بالريال)</label>
        <input
          type="number"
          inputMode="decimal"
          value={making}
          onChange={(e) => setMaking(e.target.value)}
          placeholder="0"
          className="w-full rounded-card border border-line px-4 py-3 text-ink"
        />
      </div>

      <div className="rounded-card bg-gold/10 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted">قيمة الذهب الخام</span>
          <span className="font-medium text-ink">{result.rawGold.toLocaleString("ar-SA")} ر.س</span>
        </div>
        <div className="flex justify-between text-base font-bold">
          <span className="text-ink">السعر التقريبي النهائي</span>
          <span className="text-gold-dark">{result.finalPrice.toLocaleString("ar-SA")} ر.س</span>
        </div>
      </div>
      <p className="text-xs text-muted">
        هذا السعر تقريبي ولا يشمل الضريبة المضافة، وقد يختلف السعر النهائي حسب المتجر.
      </p>
    </div>
  );
}