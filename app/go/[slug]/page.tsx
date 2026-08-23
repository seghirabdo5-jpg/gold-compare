import { redirect, notFound } from "next/navigation";
import { getStoreBySlug } from "@/lib/stores";
import { affiliateLinks } from "@/config/site.config";

/**
 * صفحة تحويل سريعة لحملات إعلانية أو روابط مختصرة.
 * مثال: /go/zomorod يحوّل مباشرة لرابط Affiliate إن وُجد، وإلا للموقع الرسمي.
 */
export default function GoRedirectPage({ params }: { params: { slug: string } }) {
  const store = getStoreBySlug(params.slug);
  if (!store) return notFound();

  const url = affiliateLinks[store.slug] || store.website;
  if (!url) return notFound();

  redirect(url);
}
