import Link from "next/link";
import { getGoldPrice } from "@/lib/goldPrice";
import { getAllStores } from "@/lib/stores";
import GoldPriceCard from "@/components/GoldPriceCard";
import StoreCard from "@/components/StoreCard";

export default async function HomePage() {
  const price = await getGoldPrice();
  const stores = getAllStores();

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="section pt-14 pb-10 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight max-w-3xl mx-auto">
          أسعار الذهب اليوم ومقارنة أفضل متاجر الذهب في السعودية
        </h1>
        <p className="text-muted mt-4 max-w-xl mx-auto">
          تابع أسعار الذهب، احسب قيمة الذهب، وقارن بين أشهر متاجر الذهب والمجوهرات في السعودية.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link href="/#price" className="btn-primary">أسعار الذهب اليوم</Link>
          <Link href="/gold-calculator" className="btn-secondary">حاسبة الذهب</Link>
        </div>
      </section>

      {/* Price card */}
      <section id="price" className="section mb-14">
        <GoldPriceCard data={price} />
      </section>

      {/* Quick actions */}
      <section className="section grid sm:grid-cols-3 gap-4 mb-16">
        <Link href="/compare" className="card p-5 text-center hover:border-gold transition-colors">
          <p className="font-medium text-ink">مقارنة المتاجر</p>
          <p className="text-xs text-muted mt-1">قارن المميزات والمنتجات</p>
        </Link>
        <Link href="/near-me" className="card p-5 text-center hover:border-gold transition-colors">
          <p className="font-medium text-ink">أقرب متجر</p>
          <p className="text-xs text-muted mt-1">اعثر على فرع قريب منك</p>
        </Link>
        <Link href="/gold-calculator" className="card p-5 text-center hover:border-gold transition-colors">
          <p className="font-medium text-ink">حاسبة الذهب</p>
          <p className="text-xs text-muted mt-1">احسب قيمة الذهب بدقة</p>
        </Link>
      </section>

      {/* Stores preview */}
      <section className="section">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold text-ink">متاجر الذهب والمجوهرات</h2>
          <Link href="/compare" className="text-sm text-gold-dark hover:underline">مقارنة الكل</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {stores.slice(0, 4).map((s) => (
            <StoreCard key={s.slug} store={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
