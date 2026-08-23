import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "تواصل معنا" };

export default function ContactPage() {
  return (
    <div className="section py-12 max-w-2xl mx-auto prose-sm leading-7 text-ink/90">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">تواصل معنا</h1>
      <p>لأي استفسار أو ملاحظة حول محتوى الموقع، يمكنك التواصل عبر البريد الإلكتروني التالي:</p>
      <p className="mt-2 font-medium">
        {/* عدّل البريد الإلكتروني هنا */}
        info@example.com
      </p>
      {siteConfig.whatsappNumber && (
        <p className="mt-2">واتساب: {siteConfig.whatsappNumber}</p>
      )}
    </div>
  );
}
