/**
 * ============================================================
 *  ملف الإعدادات المركزي للموقع
 *  عدّل القيم هنا فقط، ولا تحتاج لتعديل أي صفحة أخرى.
 * ============================================================
 */

export const siteConfig = {
  // اسم الموقع (يظهر في الشعار، العنوان، والـ SEO)
  name: "سعر الذهب اليوم",

  // وصف قصير للموقع يظهر في محركات البحث
  description:
    "تابع أسعار الذهب اليوم في السعودية، احسب قيمة الذهب، وقارن بين أفضل متاجر الذهب والمجوهرات.",

  // الدومين النهائي للموقع
  url: "https://gold-compare-zeta.vercel.app",

  // الدولة الأساسية المستهدفة الآن
  primaryCountry: "SA",

  // عملة الموقع الأساسية
  currency: "SAR",

  // رقم واتساب (اختياري) - اتركه فارغًا "" إن لم يتوفر
  whatsappNumber: "",

  // ---------------- تتبع وتحليلات ----------------
  // ضع معرف Google Analytics هنا (مثال: G-XXXXXXXXXX). اتركه فارغًا للتعطيل.
  googleAnalyticsId: "G-LH1LXDQV3K",

  // كود تحقق Google Search Console
  googleSiteVerification: "Nnls2UNbryAXYKdnYZHV-FVJS5-PvdTpJyBl2cZZYRE",

  // معرف تحويل Google Ads (اختياري، لاحقًا)
  googleAdsConversionId: "",
};

/**
 * ============================================================
 *  إعدادات مصدر أسعار الذهب
 * ============================================================
 */
export const goldPriceConfig = {
  isLive: true,
  apiUrl: "https://api.gold-api.com/price/XAU",
  apiKey: "",
  refreshMinutes: 15,
};

/**
 * ============================================================
 *  روابط Affiliate لكل متجر
 * ============================================================
 */
export const affiliateLinks: Record<string, string> = {
  zomorod: "https://zomorodjew.com/?a_aid=0xl4b7gu1x2zl&a_bid=6cbb7f02",
  alrabsh: "https://alarbashjew.com/?utm_source=linkaraby&utm_medium=referral&a_aid=0xl4b7gu1x2zl&a_bid=2e2f8972",
  "colin-cleef": "https://collenclive.com/?a_aid=0xl4b7gu1x2zl&a_bid=e463700d",
  alghunaim: "https://alghunaim-jewelry.com/category/BqDwYD?a_aid=0xl4b7gu1x2zl&a_bid=53c943a9",
  "onyx-rose": "https://onexrose.com/?a_aid=0xl4b7gu1x2zl&a_bid=47d0ce85",
};