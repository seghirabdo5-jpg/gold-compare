import type { Metadata } from "next";
import GoldCalculatorClient from "./GoldCalculatorClient";

export const metadata: Metadata = {
  title: "حاسبة الذهب - احسب قيمة الذهب بدقة",
  description: "احسب قيمة الذهب حسب العيار والوزن وسعر الجرام، مع إمكانية إضافة المصنعية.",
};

export default function GoldCalculatorPage() {
  return (
    <div className="section py-12 max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-ink mb-2 text-center">حاسبة الذهب</h1>
      <p className="text-muted text-sm text-center mb-8">
        اختر العيار، أدخل الوزن والسعر، واحصل على القيمة التقريبية فورًا.
      </p>
      <GoldCalculatorClient />
    </div>
  );
}
