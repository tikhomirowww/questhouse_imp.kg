"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Star, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSection } from "@/components/HashScrollHandler";

function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const nextSeed = ((i + 1) * 9301 + 49297) % 233280;
    const thirdSeed = ((i + 2) * 9301 + 49297) % 233280;
    const fourthSeed = ((i + 3) * 9301 + 49297) % 233280;

    return {
      id: i,
      size: (seed / 233280) * 3 + 1,
      x: (nextSeed / 233280) * 100,
      y: (thirdSeed / 233280) * 100,
      duration: (fourthSeed / 233280) * 8 + 4,
      delay: (((i + 4) * 9301 + 49297) % 233280 / 233280) * 4,
      color: i % 3 === 0 ? "#dc2626" : i % 3 === 1 ? "#7c3aed" : "#f59e0b",
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 30%, #0a0514 60%, #150a0a 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(220,38,38,0.15) 0%, transparent 50%)" }}
      />
      <Particles />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-20 sm:pt-28 sm:pb-24 max-w-5xl mx-auto w-full">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm"
        >
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 text-xs sm:text-sm font-medium tracking-wide">{h.badge}</span>
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-black leading-tight tracking-wide mb-3 sm:mb-4"
          style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem, 10vw, 5rem)" }}
        >
          <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {h.heading1}
          </span>
          <br />
          <span style={{ background: "linear-gradient(135deg, #dc2626 0%, #7c3aed 50%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {h.heading2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-sm sm:text-xl md:text-2xl text-[#a1a1aa] mb-1.5 sm:mb-2 font-light tracking-widest uppercase px-2"
        >
          {h.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-base text-[#71717a] mb-7 sm:mb-10 tracking-wider"
        >
          {h.address}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-14 w-full max-w-sm sm:max-w-none"
        >
          <Link
            href="/booking"
            className="group relative w-full sm:w-auto px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            style={{ background: "linear-gradient(135deg, #dc2626, #7c3aed)", boxShadow: "0 0 24px rgba(220,38,38,0.4)" }}
          >
            <span className="relative z-10 tracking-wider">{h.cta}</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #7c3aed, #dc2626)" }} />
          </Link>

          <a
            href="#quests"
            onClick={(event) => {
              event.preventDefault();
              window.history.replaceState(null, "", "#quests");
              scrollToSection("#quests", true);
            }}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-white rounded-xl border border-white/20 backdrop-blur-sm hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-center"
          >
            {h.ourQuests}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="grid grid-cols-3 gap-4 sm:gap-10 w-full max-w-sm sm:max-w-none"
        >
          {[
            { icon: Star, value: "2900+", label: h.stats.reviews, color: "#f59e0b" },
            { icon: Users, value: "26K+", label: h.stats.followers, color: "#7c3aed" },
            { icon: Award, value: "ТОП #1", label: h.stats.topIn, color: "#dc2626" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" style={{ color: stat.color }} />
              <div className="text-lg sm:text-3xl font-bold" style={{ color: stat.color, fontFamily: "'Cinzel', serif" }}>
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-[#71717a] tracking-wider uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-[#71717a] hidden sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="text-xs tracking-widest uppercase">{h.scroll}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
