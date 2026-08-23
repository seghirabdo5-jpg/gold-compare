import type { Metadata } from "next";
import { getAllStores } from "@/lib/stores";
import StoreCard from "@/components/StoreCard";

export const metadata: Metadata = {
  title: "مقارنة متاجر الذهب في السعودية",
  description: "قارن بين أشهر متاجر الذهب والمجوهرات في السعودية من حيث المنتجات والمميزات والمدن.",
};

export default function ComparePage() {
  const stores = getAllStores();
  return (
    <div className="section py-12">
      <h1 className="font-display text-2xl font-bold text-ink mb-2 text-center">مقارنة متاجر الذهب</h1>
      <p className="text-muted text-sm text-center mb-8 max-w-lg mx-auto">
        اطّلع على أبرز متاجر الذهب والمجوهرات في السعودية، وقارن بينها قبل اتخاذ قرارك.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {stores.map((s) => (
          <StoreCard key={s.slug} store={s} />
        ))}
      </div>
    </div>
  );
}
