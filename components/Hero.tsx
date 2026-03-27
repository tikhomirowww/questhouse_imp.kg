"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Star, Users, Award } from "lucide-react";
import { useEffect, useRef } from "react";

// Particle component
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
    color: i % 3 === 0 ? "#dc2626" : i % 3 === 1 ? "#7c3aed" : "#f59e0b",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 30%, #0a0514 60%, #150a0a 100%)",
      }}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(220,38,38,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm"
        >
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium tracking-wide">
            ТОП КВЕСТ БИШКЕКА 2024
          </span>
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 leading-tight tracking-wide"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            КВЕСТ ХАУС
          </span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #dc2626 0%, #7c3aed 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ИМП
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg sm:text-xl md:text-2xl text-[#a1a1aa] mb-3 font-light tracking-widest uppercase"
        >
          Перевернём Ваше представление о квестах
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-[#71717a] mb-10 tracking-wider"
        >
          г. Бишкек, ул. Байтик Баатыра 36/1
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/booking"
            className="group relative px-8 py-4 text-lg font-bold text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #dc2626, #7c3aed)",
              boxShadow: "0 0 30px rgba(220,38,38,0.4)",
            }}
          >
            <span className="relative z-10 tracking-wider">
              ЗАБРОНИРОВАТЬ СЕЙЧАС
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #7c3aed, #dc2626)" }}
            />
          </Link>

          <a
            href="#quests"
            className="px-8 py-4 text-lg font-medium text-white rounded-lg border border-white/20 backdrop-blur-sm hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Наши квесты
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {[
            { icon: Star, value: "2900+", label: "Отзывов", color: "#f59e0b" },
            { icon: Users, value: "26K+", label: "Подписчиков", color: "#7c3aed" },
            { icon: Award, value: "ТОП #1", label: "Квест в Бишкеке", color: "#dc2626" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon
                className="w-6 h-6 mx-auto mb-1"
                style={{ color: stat.color }}
              />
              <div
                className="text-2xl sm:text-3xl font-bold font-cinzel"
                style={{ color: stat.color, fontFamily: "'Cinzel', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#71717a] tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#71717a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs tracking-widest uppercase">Прокрутить</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
