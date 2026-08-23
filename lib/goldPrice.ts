import { goldPriceConfig, siteConfig } from "@/config/site.config";
import type { GoldPriceData } from "./types";

/**
 * يجلب بيانات سعر الذهب.
 * حاليًا لا يوجد API حقيقي مربوط (goldPriceConfig.isLive = false)
 * لذلك تُرجع الدالة "available: false" بدل اختراع أرقام.
 *
 * عندما تحصل على API حقيقي:
 * 1. عدّل القيم في config/site.config.ts (apiUrl, apiKey, isLive = true)
 * 2. عدّل هذه الدالة لتنفيذ fetch حقيقي حسب توثيق مزود الـ API الذي اخترته
 */
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
    // مثال عام لمزود API — عدّله حسب شكل الاستجابة الفعلي لمزودك
    const res = await fetch(goldPriceConfig.apiUrl, {
      headers: goldPriceConfig.apiKey ? { "x-access-token": goldPriceConfig.apiKey } : {},
      next: { revalidate: goldPriceConfig.refreshMinutes * 60 },
    });
    if (!res.ok) throw new Error("Gold price API failed");
    const json = await res.json();

    // TODO: عدّل هذا التحويل ليطابق استجابة مزود الـ API الحقيقي
    return {
      available: true,
      updatedAt: new Date().toISOString(),
      source: "مزود API خارجي",
      currency: siteConfig.currency,
      ouncePrice: json.price_gram_24k ? json.price_gram_24k * 31.1035 : null,
      prices: [
        { karat: 24, pricePerGram: json.price_gram_24k ?? 0 },
        { karat: 22, pricePerGram: json.price_gram_22k ?? 0 },
        { karat: 21, pricePerGram: json.price_gram_21k ?? 0 },
        { karat: 18, pricePerGram: json.price_gram_18k ?? 0 },
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
