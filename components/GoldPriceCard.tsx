import type { GoldPriceData } from "@/lib/types";

const karatLabels: Record<number, string> = {
  24: "عيار 24",
  22: "عيار 22",
  21: "عيار 21",
  18: "عيار 18",
};

export default function GoldPriceCard({ data }: { data: GoldPriceData }) {
  if (!data.available) {
    return (
      <div className="card p-6 text-center">
        <p className="text-ink font-medium mb-1">أسعار الذهب اليوم</p>
        <p className="text-muted text-sm">
          سيتم تحديث الأسعار عند توفر مصدر البيانات.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-ink">أسعار الذهب اليوم</h2>
        <span className="text-xs text-muted">
          آخر تحديث: {data.updatedAt ? new Date(data.updatedAt).toLocaleString("ar-SA") : "—"}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.prices.map((p) => (
          <div key={p.karat} className="rounded-card border border-line p-4 text-center">
            <p className="text-xs text-muted mb-1">{karatLabels[p.karat]}</p>
            <p className="font-bold text-gold-dark">
              {p.pricePerGram.toLocaleString("ar-SA")} {data.currency}
            </p>
          </div>
        ))}
      </div>
      {data.ouncePrice && (
        <p className="text-sm text-muted mt-4">
          سعر الأونصة: {data.ouncePrice.toLocaleString("ar-SA")} {data.currency}
        </p>
      )}
      {data.source && <p className="text-xs text-muted mt-1">المصدر: {data.source}</p>}
    </div>
  );
}
