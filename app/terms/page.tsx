import type { Metadata } from "next";

export const metadata: Metadata = { title: "الشروط والأحكام" };

export default function TermsPage() {
  return (
    <div className="section py-12 max-w-2xl mx-auto prose-sm leading-7 text-ink/90">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">الشروط والأحكام</h1>
      <p>
        المحتوى المعروض في هذا الموقع لأغراض إعلامية ومقارنة فقط، ولا يشكل نصيحة استثمارية أو مالية.
        الأسعار والمعلومات تقريبية وقد تتغير دون إشعار مسبق.
      </p>
    </div>
  );
}
