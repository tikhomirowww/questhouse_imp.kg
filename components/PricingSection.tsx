"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PricingSection() {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <section className="py-20 sm:py-28 bg-[#0d0d0d] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">
            {p.tag}
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {p.heading}
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #dc2626, #7c3aed)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          {/* Base price */}
          <div
            className="flex items-center gap-5 p-6 rounded-2xl"
            style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.25)",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(124,58,237,0.15)" }}
            >
              <Users className="w-7 h-7" style={{ color: "#7c3aed" }} />
            </div>
            <div>
              <p className="text-[#a1a1aa] text-sm mb-1">{p.baseLabel}</p>
              <p
                className="text-3xl font-black"
                style={{ color: "#7c3aed", fontFamily: "'Cinzel', serif" }}
              >
                {p.base}
              </p>
            </div>
          </div>

          {/* Extra per person */}
          <div
            className="flex items-center gap-5 p-6 rounded-2xl"
            style={{
              background: "rgba(220,38,38,0.08)",
              border: "1px solid rgba(220,38,38,0.25)",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(220,38,38,0.15)" }}
            >
              <UserPlus className="w-7 h-7" style={{ color: "#dc2626" }} />
            </div>
            <div>
              <p className="text-[#a1a1aa] text-sm mb-1">{p.extraLabel}</p>
              <p
                className="text-3xl font-black"
                style={{ color: "#dc2626", fontFamily: "'Cinzel', serif" }}
              >
                {p.extra}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-[#71717a] text-sm">{p.note}</p>
          <Link
            href="/booking"
            className="px-10 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #dc2626, #7c3aed)",
              boxShadow: "0 0 24px rgba(124,58,237,0.3)",
            }}
          >
            {p.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
