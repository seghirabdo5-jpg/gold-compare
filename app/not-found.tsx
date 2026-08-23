import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-ink mb-3">
        عذرًا، الصفحة التي تبحث عنها غير موجودة.
      </h1>
      <div className="flex justify-center gap-3 mt-6">
        <Link href="/" className="btn-primary">العودة للرئيسية</Link>
        <Link href="/#price" className="btn-secondary">أسعار الذهب</Link>
      </div>
    </div>
  );
}
