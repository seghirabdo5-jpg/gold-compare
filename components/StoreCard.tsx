import Link from "next/link";
import type { Store } from "@/lib/types";
import { affiliateLinks } from "@/config/site.config";

export default function StoreCard({ store }: { store: Store }) {
  const affiliateUrl = affiliateLinks[store.slug];

  return (
    <div className="card p-6 flex flex-col gap-3">
      <h3 className="font-display font-bold text-lg text-ink">{store.name}</h3>
      <p className="text-sm text-muted">{store.shortDescription}</p>

      <div className="flex flex-wrap gap-2 text-xs">
        {store.products.gold && <span className="rounded-full bg-gold/10 text-gold-dark px-3 py-1">ذهب</span>}
        {store.products.diamond && <span className="rounded-full bg-gold/10 text-gold-dark px-3 py-1">ألماس</span>}
        {store.products.jewelry && <span className="rounded-full bg-gold/10 text-gold-dark px-3 py-1">مجوهرات</span>}
      </div>

      <p className="text-xs text-muted">
        المدن: {store.cities.length > 0 ? store.cities.join("، ") : "غير متوفر حاليًا"}
      </p>

      <div className="flex flex-wrap gap-3 mt-2">
        <Link href={`/stores/${store.slug}`} className="btn-secondary !px-4 !py-2 text-xs">
          عرض التفاصيل
        </Link>
        {affiliateUrl ? (
          <a href={affiliateUrl} target="_blank" rel="nofollow sponsored noopener" className="btn-primary !px-4 !py-2 text-xs">
            زيارة الموقع
          </a>
        ) : store.website ? (
          <a href={store.website} target="_blank" rel="noopener" className="btn-primary !px-4 !py-2 text-xs">
            زيارة الموقع
          </a>
        ) : null}
      </div>
    </div>
  );
}
