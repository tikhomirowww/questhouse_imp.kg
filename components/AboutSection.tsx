"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Heart, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [Trophy, Zap, Heart, Shield];
const COLORS = ["#f59e0b", "#7c3aed", "#dc2626", "#10b981"];

export default function AboutSection() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.1) 0%, transparent 50%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">{a.tag}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              {a.heading1}
              <br />
              <span style={{ background: "linear-gradient(135deg, #dc2626, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {a.heading2}
              </span>
            </h2>

            <p className="text-[#a1a1aa] text-base leading-relaxed mb-5">{a.p1}</p>
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-8">{a.p2}</p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "2900+", label: a.stats.reviews },
                { value: "26K+", label: a.stats.followers },
                { value: "2", label: a.stats.quests },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-xl sm:text-2xl font-bold" style={{ background: "linear-gradient(135deg, #f59e0b, #dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Cinzel', serif" }}>
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#71717a] mt-1 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {a.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 rounded-xl hover:scale-[1.02] transition-transform duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS[i]}20` }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${COLORS[i]}15` }}>
                  {(() => { const Icon = ICONS[i]; return <Icon className="w-5 h-5" style={{ color: COLORS[i] }} />; })()}
                </div>
                <h3 className="text-white font-semibold text-base mb-1.5">{feature.title}</h3>
                <p className="text-[#71717a] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
