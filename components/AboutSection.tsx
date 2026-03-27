"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Heart, Trophy } from "lucide-react";

const FEATURES = [
  {
    icon: Trophy,
    title: "ТОП #1 в Бишкеке",
    description: "Единственный в своём роде квест-хаус с профессиональными актёрами и уникальными декорациями.",
    color: "#f59e0b",
  },
  {
    icon: Zap,
    title: "Уникальные механизмы",
    description: "Передовая электроника и механизмы, которых нет ни в одном другом квест-хаусе Бишкека.",
    color: "#7c3aed",
  },
  {
    icon: Heart,
    title: "Для всей семьи",
    description: "Квест Gravity Falls подходит для детей от 6 лет с аниматорами, Франкенштейн — для взрослых.",
    color: "#dc2626",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Профессиональная команда обеспечивает полную безопасность и незабываемые впечатления.",
    color: "#10b981",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#111111] relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">
              О нас
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ПОЧЕМУ МЫ
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #dc2626, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ЛУЧШИЕ?
              </span>
            </h2>

            <p className="text-[#a1a1aa] text-base leading-relaxed mb-5">
              Квест Хаус ИМП — это место, где реальность смешивается с
              фантазией. Мы создали два совершенно разных мира: тайный и
              загадочный Гравити Фолс и мрачный хоррор Франкенштейн.
            </p>
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-8">
              Каждый квест разработан с особым вниманием к деталям —
              уникальные декорации, профессиональные актёры и передовые
              технологии создают полное погружение в другой мир.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "2900+", label: "Отзывов" },
                { value: "26K+", label: "Подписчиков" },
                { value: "2", label: "Уникальных квеста" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="text-xl sm:text-2xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b, #dc2626)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#71717a] mt-1 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 rounded-xl hover:scale-[1.02] transition-transform duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${feature.color}20`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${feature.color}15` }}
                >
                  <feature.icon
                    className="w-5 h-5"
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-[#71717a] text-xs leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
