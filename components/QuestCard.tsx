"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { Clock, Users, Zap, ChevronRight, Brain, Skull } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const QUEST_IDS = ["gravity-falls", "frankenstein"] as const;
const TYPES = ["logical", "horror"] as const;
const EMOJIS = ["🌀", "👹"];
const ACCENT = ["#7c3aed", "#dc2626"] as const;
const ACCENT_DARK = ["#4f46e5", "#991b1b"] as const;

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);
  const spring = { stiffness: 300, damping: 30 };
  const sRotateX = useSpring(rotateX, spring);
  const sRotateY = useSpring(rotateY, spring);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: sRotateX, rotateY: sRotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export default function QuestsSection() {
  const { t } = useLanguage();
  const q = t.quests;

  return (
    <section id="quests" className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">{q.tag}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>{q.heading}</h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #dc2626, #7c3aed)" }} />
          <p className="text-[#a1a1aa] mt-5 max-w-xl mx-auto text-sm sm:text-base">{q.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {q.items.map((quest, idx) => {
            const accentColor = ACCENT[idx];
            const accentDark = ACCENT_DARK[idx];
            const isLogical = TYPES[idx] === "logical";

            return (
              <TiltCard key={idx}>
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-2xl overflow-hidden h-full"
                  style={{ background: "linear-gradient(135deg, #111111 0%, #0d0d0d 100%)", border: `1px solid ${accentColor}40` }}
                  whileHover={{ boxShadow: `0 0 40px ${accentColor}30, 0 0 80px ${accentColor}15`, borderColor: `${accentColor}80` }}
                >
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accentDark}, ${accentColor})` }} />
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: accentColor }} />

                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{EMOJIS[idx]}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>{quest.name}</h3>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                          style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
                        >
                          {isLogical ? <Brain className="w-3 h-3" /> : <Skull className="w-3 h-3" />}
                          {quest.typeLabel}
                        </span>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm shrink-0" style={{ background: `${accentColor}20`, border: `2px solid ${accentColor}60`, color: accentColor, fontFamily: "'Cinzel', serif" }}>
                        {quest.ageRating}
                      </div>
                    </div>

                    <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">{quest.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                        <Clock className="w-4 h-4" style={{ color: accentColor }} />
                        <span>{quest.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                        <Users className="w-4 h-4" style={{ color: accentColor }} />
                        <span>{quest.audience}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-8">
                      {quest.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                          <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accentColor }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/booking?quest=${QUEST_IDS[idx]}`}
                      className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      style={{ background: `linear-gradient(135deg, ${accentDark}, ${accentColor})`, boxShadow: `0 4px 20px ${accentColor}30` }}
                    >
                      {q.book}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
