import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{ background: "#050505", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #7c3aed)",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                ИМП
              </div>
              <span
                className="font-bold text-white text-lg"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Квест Хаус ИМП
              </span>
            </div>
            <p className="text-[#71717a] text-sm leading-relaxed max-w-xs mb-4">
              Перевернём Ваше представление о квестах. ТОП квест в Бишкеке
              с профессиональными актёрами и уникальными декорациями.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/questhouse_imp.kg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Квест Хаус ИМП"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                }}
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://wa.me/996555118119"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Квест Хаус ИМП"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-4 tracking-wider uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Навигация
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Главная" },
                { href: "/#quests", label: "Квесты" },
                { href: "/#about", label: "О нас" },
                { href: "/#contact", label: "Контакты" },
                { href: "/booking", label: "Бронирование" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#71717a] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-4 tracking-wider uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Контакты
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span className="text-[#71717a] text-sm">
                  ул. Байтик Баатыра 36/1, Бишкек
                </span>
              </li>
              <li>
                <a
                  href="tel:+996555118119"
                  className="flex items-center gap-2 text-[#71717a] hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-purple-500" />
                  +996 555 118 119
                </a>
              </li>
              <li>
                <a
                  href="tel:+996707118119"
                  className="flex items-center gap-2 text-[#71717a] hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-purple-500" />
                  +996 707 118 119
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[#3f3f46] text-xs">
            © {currentYear} Квест Хаус ИМП. Все права защищены.
          </p>
          <p className="text-[#3f3f46] text-xs">
            г. Бишкек, Кыргызстан
          </p>
        </div>
      </div>
    </footer>
  );
}
