"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(220,38,38,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.1) 0%, transparent 50%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">{c.tag}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>{c.heading}</h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #dc2626, #7c3aed)" }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {[
              {
                icon: MapPin, color: "#dc2626", bg: "rgba(220,38,38,0.15)",
                label: c.address, value: c.addressValue, sub: c.addressSub,
              },
              {
                icon: Phone, color: "#7c3aed", bg: "rgba(124,58,237,0.15)",
                label: c.phone, value: "+996 555 118 119", sub: "+996 707 118 119",
                href1: "tel:+996555118119", href2: "tel:+996707118119",
              },
              {
                icon: Clock, color: "#f59e0b", bg: "rgba(245,158,11,0.15)",
                label: c.hours, value: c.hoursValue, sub: c.hoursSub,
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-[#71717a] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href1 ? (
                    <>
                      <a href={item.href1} className="text-white font-medium hover:text-purple-400 transition-colors block">{item.value}</a>
                      <a href={item.href2} className="text-[#a1a1aa] text-sm hover:text-purple-400 transition-colors block">{item.sub}</a>
                    </>
                  ) : (
                    <>
                      <p className="text-white font-medium">{item.value}</p>
                      <p className="text-[#a1a1aa] text-sm">{item.sub}</p>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/996555118119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 text-sm"
                style={{ background: "#25D366" }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/questhouse_imp.kg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 text-sm"
                style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
              >
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.1)", minHeight: 380 }}
          >
            <iframe
              src="https://maps.google.com/maps?q=%D0%9A%D0%B2%D0%B5%D1%81%D1%82%20%D0%A5%D0%B0%D1%83%D1%81%20%D0%98%D0%9C%D0%9F%2C%20%D1%83%D0%BB.%20%D0%91%D0%B0%D0%B9%D1%82%D0%B8%D0%BA%20%D0%91%D0%B0%D0%B0%D1%82%D1%8B%D1%80%D0%B0%2036%2F1%2C%20%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={c.mapTitle}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
