import type { Metadata } from "next";
import { getAllStores } from "@/lib/stores";
import NearMeClient from "./NearMeClient";

export const metadata: Metadata = {
  title: "ابحث عن أقرب متجر ذهب",
  description: "اعثر على أقرب متجر أو فرع ذهب ومجوهرات بالقرب منك في السعودية.",
};

export default function NearMePage() {
  const stores = getAllStores();
  return (
    <div className="section py-12 max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-ink mb-2 text-center">ابحث عن أقرب متجر ذهب</h1>
      <p className="text-muted text-sm text-center mb-8">
        اسمح بالوصول لموقعك لعرض أقرب الفروع، أو اختر مدينتك يدويًا.
      </p>
      <NearMeClient stores={stores} />
    </div>
  );
}
