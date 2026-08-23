import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const links = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
  { href: "/gold-price-sources", label: "مصادر أسعار الذهب" },
  { href: "/affiliate-disclosure", label: "إفصاح الشراكة" },
  { href: "/privacy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "الشروط والأحكام" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-20 bg-white">
      <div className="section py-10 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-display font-bold text-ink mb-2">{siteConfig.name}</p>
          <p className="text-sm text-muted leading-6">
            منصة معلومات ومقارنة مستقلة لأسعار الذهب ومتاجر المجوهرات في السعودية والخليج.
            الموقع لا يبيع الذهب مباشرة، والأسعار تقريبية وقد تختلف عن السعر النهائي لدى المتاجر.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70 sm:justify-end sm:items-start">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gold-dark">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
