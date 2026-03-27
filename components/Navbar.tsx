"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/#about", label: "О нас" },
  { href: "/#quests", label: "Квесты" },
  { href: "/#contact", label: "Контакты" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10,10,10,0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #7c3aed)",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                ИМП
              </div>
              <span
                className="font-bold text-white text-lg tracking-wide hidden sm:block"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Квест Хаус ИМП
              </span>
              <span
                className="font-bold text-white text-sm tracking-wide sm:hidden"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Квест Хаус ИМП
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#a1a1aa] hover:text-white text-sm font-medium transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+996555118119"
                className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                0555 118 119
              </a>
              <Link
                href="/booking"
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #7c3aed)",
                  boxShadow: "0 2px 12px rgba(220,38,38,0.3)",
                }}
              >
                Забронировать
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Открыть меню"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(10,10,10,0.98)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-3 text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/08 mt-1 flex flex-col gap-2">
                <a
                  href="tel:+996555118119"
                  className="flex items-center gap-2 py-3 px-3 text-[#a1a1aa] hover:text-white text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +996 555 118 119
                </a>
                <Link
                  href="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 text-center text-sm font-bold text-white rounded-xl"
                  style={{ background: "linear-gradient(135deg, #dc2626, #7c3aed)" }}
                >
                  Забронировать
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
