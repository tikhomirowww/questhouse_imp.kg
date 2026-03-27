"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#111111] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(220,38,38,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">
            Мы здесь
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            КАК НАС НАЙТИ
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #dc2626, #7c3aed)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Address */}
            <div
              className="flex gap-4 p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(220,38,38,0.15)" }}
              >
                <MapPin className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-[#71717a] text-xs uppercase tracking-wider mb-1">Адрес</p>
                <p className="text-white font-medium">г. Бишкек, ул. Байтик Баатыра 36/1</p>
                <p className="text-[#a1a1aa] text-sm">Квест Хаус ИМП</p>
              </div>
            </div>

            {/* Phone */}
            <div
              className="flex gap-4 p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(124,58,237,0.15)" }}
              >
                <Phone className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-[#71717a] text-xs uppercase tracking-wider mb-1">Телефон / WhatsApp</p>
                <a
                  href="tel:+996555118119"
                  className="text-white font-medium hover:text-purple-400 transition-colors block"
                >
                  +996 555 118 119
                </a>
                <a
                  href="tel:+996707118119"
                  className="text-[#a1a1aa] text-sm hover:text-purple-400 transition-colors block"
                >
                  +996 707 118 119
                </a>
              </div>
            </div>

            {/* Hours */}
            <div
              className="flex gap-4 p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(245,158,11,0.15)" }}
              >
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-[#71717a] text-xs uppercase tracking-wider mb-1">Время работы</p>
                <p className="text-white font-medium">Ежедневно: 10:00 — 22:00</p>
                <p className="text-[#a1a1aa] text-sm">Предварительное бронирование обязательно</p>
              </div>
            </div>

            {/* Social buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/996555118119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/questhouse_imp.kg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
                style={{
                  background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                }}
              >
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </motion.div>

          {/* Right: map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.1)", minHeight: 380 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.4!2d74.589!3d42.870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0JHQsNC50YLQuNC6INCRQNCw0LDRgtGL0YAgMzYvMSwg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Квест Хаус ИМП на карте — ул. Байтик Баатыра 36/1, Бишкек"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
