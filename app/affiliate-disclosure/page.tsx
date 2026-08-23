import type { Metadata } from "next";

export const metadata: Metadata = { title: "إفصاح الشراكة (Affiliate)" };

export default function AffiliateDisclosurePage() {
  return (
    <div className="section py-12 max-w-2xl mx-auto prose-sm leading-7 text-ink/90">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">إفصاح الشراكة</h1>
      <p>
        قد يحتوي هذا الموقع على روابط شراكة (Affiliate) لبعض المتاجر. في حال قمت بزيارة متجر عبر أحد هذه
        الروابط، قد يحصل الموقع على عمولة بسيطة دون أي تكلفة إضافية عليك. هذا لا يؤثر على حيادية المعلومات
        أو المقارنات المعروضة في الموقع.
      </p>
    </div>
  );
}
