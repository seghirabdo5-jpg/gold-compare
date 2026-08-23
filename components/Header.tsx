import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/gold-calculator", label: "حاسبة الذهب" },
  { href: "/compare", label: "مقارنة المتاجر" },
  { href: "/near-me", label: "أقرب متجر" },
  { href: "/blog", label: "مقالات" },
];

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-40">
      <div className="section flex items-center justify-between h-16">
        <Link href="/" className="font-display text-lg font-bold text-ink">
          {siteConfig.name}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-ink/80">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold-dark transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/gold-calculator" className="md:hidden btn-secondary !px-4 !py-2 text-xs">
          الحاسبة
        </Link>
      </div>
      {/* شريط تنقل مبسط للجوال */}
      <div className="md:hidden overflow-x-auto border-t border-line">
        <div className="flex gap-4 px-4 py-2 text-xs text-ink/70 whitespace-nowrap">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold-dark">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
