import type { Metadata } from "next";
import { goldPriceConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "مصادر أسعار الذهب" };

export default function GoldPriceSourcesPage() {
  return (
    <div className="section py-12 max-w-2xl mx-auto prose-sm leading-7 text-ink/90">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">مصادر أسعار الذهب</h1>
      <p>
        نعرض في هذا الموقع سعر جرام الذهب لأعيرة 24 و22 و21 و18 اعتمادًا على مصدر بيانات خارجي، مع توضيح
        وقت آخر تحديث في كل مرة.
      </p>
      <p className="mt-4">
        حالة الربط الحالية:{" "}
        <strong>{goldPriceConfig.isLive ? "مصدر بيانات مباشر مفعّل" : "لم يتم ربط مصدر بيانات مباشر بعد"}</strong>.
      </p>
      <p className="mt-4">
        السعر المعروض هو سعر الذهب الخام تقريبًا، وقد يختلف عن السعر النهائي لدى المتجر بسبب:
      </p>
      <ul className="list-disc pr-5 mt-2 space-y-1">
        <li>المصنعية</li>
        <li>الضريبة المضافة</li>
        <li>هامش ربح المتجر</li>
      </ul>
      <p className="mt-4">لذلك لا يجب اعتبار السعر المعروض هنا ضمانًا لسعر البيع أو الشراء النهائي.</p>
    </div>
  );
}
