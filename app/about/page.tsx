import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = { title: "من نحن" };

export default function AboutPage() {
  return (
    <div className="section py-12 max-w-2xl mx-auto prose-sm leading-7 text-ink/90">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">من نحن</h1>
      <p>
        {siteConfig.name} هو منصة معلومات ومقارنة مستقلة، هدفها مساعدتك على متابعة أسعار الذهب،
        استخدام حاسبة الذهب، والمقارنة بين متاجر الذهب والمجوهرات في السعودية والخليج.
      </p>
      <p className="mt-4">
        الموقع لا يبيع الذهب أو المجوهرات بشكل مباشر، ولا يمثل أي متجر بعينه. جميع الأسعار والمعلومات
        تقريبية لأغراض المقارنة، وننصح دائمًا بالتأكد من السعر النهائي مباشرة من المتجر قبل الشراء.
      </p>
    </div>
  );
}
