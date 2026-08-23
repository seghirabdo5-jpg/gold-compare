import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllStores, getStoreBySlug } from "@/lib/stores";
import { affiliateLinks, siteConfig } from "@/config/site.config";

export async function generateStaticParams() {
  return getAllStores().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const store = getStoreBySlug(params.slug);
  if (!store) return {};
  return {
    title: `${store.name} - الفروع والمنتجات والمميزات`,
    description: store.shortDescription,
  };
}

export default function StorePage({ params }: { params: { slug: string } }) {
  const store = getStoreBySlug(params.slug);
  if (!store) return notFound();

  const affiliateUrl = affiliateLinks[store.slug];
  const visitUrl = affiliateUrl || store.website;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "المتاجر", item: `${siteConfig.url}/compare` },
      { "@type": "ListItem", position: 3, name: store.name, item: `${siteConfig.url}/stores/${store.slug}` },
    ],
  };

  const localBusinessSchema =
    store.branches.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          name: store.name,
          url: store.website || undefined,
        }
      : null;

  return (
    <div className="section py-12 max-w-2xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {localBusinessSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      )}

      <h1 className="font-display text-2xl font-bold text-ink mb-2">{store.name}</h1>
      <p className="text-muted mb-6">{store.shortDescription}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="card p-5">
          <h2 className="font-medium text-ink mb-2">المنتجات المتوفرة</h2>
          <ul className="text-sm text-muted space-y-1">
            <li>الذهب: {store.products.gold ? "متوفر" : "غير متوفر حاليًا"}</li>
            <li>الألماس: {store.products.diamond ? "متوفر" : "غير متوفر حاليًا"}</li>
            <li>المجوهرات: {store.products.jewelry ? "متوفر" : "غير متوفر حاليًا"}</li>
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="font-medium text-ink mb-2">أبرز المميزات</h2>
          <p className="text-sm text-muted">
            {store.features.length > 0 ? store.features.join("، ") : "غير متوفر حاليًا"}
          </p>
        </div>
      </div>

      <div className="card p-5 mb-8">
        <h2 className="font-medium text-ink mb-2">المدن والفروع</h2>
        <p className="text-sm text-muted mb-3">
          {store.cities.length > 0 ? store.cities.join("، ") : "غير متوفر حاليًا"}
        </p>
        {store.branches.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {store.branches.map((b, i) => (
              <li key={i} className="flex justify-between border-t border-line pt-2">
                <span>{b.name} - {b.city}</span>
                {b.lat && b.lng && (
                  <a
                    className="text-gold-dark hover:underline"
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`}
                  >
                    الاتجاهات
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <a href="/near-me" className="text-sm text-gold-dark hover:underline">
            ابحث عن أقرب فرع →
          </a>
        )}
      </div>

      {visitUrl && (
        <a href={visitUrl} target="_blank" rel="noopener" className="btn-primary w-full sm:w-auto">
          زيارة المتجر
        </a>
      )}
    </div>
  );
}
