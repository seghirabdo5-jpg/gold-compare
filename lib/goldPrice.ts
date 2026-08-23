
import { goldPriceConfig, siteConfig } from "@/config/site.config";
import type { GoldPriceData } from "./types";

// الريال السعودي مربوط بسعر ثابت مع الدولار الأمريكي
const USD_TO_SAR = 3.75;
const GRAMS_PER_TROY_OUNCE = 31.1034768;

export async function getGoldPrice(): Promise<GoldPriceData> {
  if (!goldPriceConfig.isLive || !goldPriceConfig.apiUrl) {
    return {
      available: false,
      updatedAt: null,
      source: null,
      currency: siteConfig.currency,
      prices: [],
      ouncePrice: null,
    };
  }

  try {
    const res = await fetch(goldPriceConfig.apiUrl, {
      next: { revalidate: goldPriceConfig.refreshMinutes * 60 },
    });
    if (!res.ok) throw new Error("Gold price API failed");
    const json = await res.json();

    // المصدر يرجع السعر بالدولار للأونصة، نحوله يدويًا للريال
    const ounceUsd = json.price ?? json.rate ?? json.price_usd;
    if (!ounceUsd) throw new Error("Unexpected API response");

    const ounceSar = ounceUsd * USD_TO_SAR;
    const gram24k = ounceSar / GRAMS_PER_TROY_OUNCE;

    return {
      available: true,
      updatedAt: new Date().toISOString(),
      source: "gold-api.com (محول من الدولار للريال بسعر الصرف الثابت 3.75)",
      currency: siteConfig.currency,
      ouncePrice: ounceSar,
      prices: [
        { karat: 24, pricePerGram: gram24k },
        { karat: 22, pricePerGram: gram24k * (22 / 24) },
        { karat: 21, pricePerGram: gram24k * (21 / 24) },
        { karat: 18, pricePerGram: gram24k * (18 / 24) },
      ],
    };
  } catch {
    return {
      available: false,
      updatedAt: null,
      source: null,
      currency: siteConfig.currency,
      prices: [],
      ouncePrice: null,
    };
  }
}