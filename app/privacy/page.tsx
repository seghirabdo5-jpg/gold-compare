import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية" };

export default function PrivacyPage() {
  return (
    <div className="section py-12 max-w-2xl mx-auto prose-sm leading-7 text-ink/90">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">سياسة الخصوصية</h1>
      <p>
        نحترم خصوصيتك. عند استخدامك لميزة "أقرب متجر"، يتم استخدام موقعك الجغرافي محليًا داخل متصفحك فقط
        لحساب أقرب فرع، ولا نقوم بجمعه أو تخزينه على خوادمنا.
      </p>
      <p className="mt-4">
        قد نستخدم أدوات تحليلية مثل Google Analytics لفهم كيفية استخدام الزوار للموقع بشكل عام وغير شخصي.
      </p>
    </div>
  );
}
