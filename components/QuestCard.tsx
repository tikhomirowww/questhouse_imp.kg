"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  Users,
  Zap,
  Star,
  ChevronRight,
  Brain,
  Skull,
} from "lucide-react";
import { useRef } from "react";

export interface QuestCardProps {
  id: string;
  name: string;
  nameRu: string;
  type: "logical" | "horror";
  typeLabel: string;
  duration: string;
  ageRating: string;
  description: string;
  features: string[];
  audience: string;
  emoji: string;
}

const QUESTS: QuestCardProps[] = [
  {
    id: "gravity-falls",
    name: "Gravity Falls",
    nameRu: "Гравити Фолс",
    type: "logical",
    typeLabel: "Логический квест",
    duration: "1–1.5 часа",
    ageRating: "6+",
    description:
      "Погрузитесь в тайны вселенной Гравити Фолс! Уникальная электроника, незабываемые декорации, профессиональные аниматоры для детей и актёры для взрослых.",
    features: [
      "Уникальная электроника и механизмы",
      "Незабываемые декорации",
      "Профессиональные актёры",
      "Единственный такой квест в Бишкеке",
      "Подходит для детей от 6 лет",
      "Идеально для дней рождения",
    ],
    audience: "Дети от 6 лет и взрослые",
    emoji: "🌀",
  },
  {
    id: "frankenstein",
    name: "Франкенштейн",
    nameRu: "Франкенштейн",
    type: "horror",
    typeLabel: "Хоррор квест",
    duration: "~1 час",
    ageRating: "16+",
    description:
      "Атмосфера тёмного готического ужаса. Безграничная локация, оригинальные антиквариат и декорации, профессиональные актёры и множество загадок.",
    features: [
      "Безграничная локация",
      "Оригинальный антиквариат",
      "Профессиональные актёры",
      "Атмосфера настоящего хоррора",
      "Множество интересных головоломок",
      "Незабываемые впечатления",
    ],
    audience: "Взрослые и подростки 16+",
    emoji: "👹",
  },
];

function TiltCard({ children, accentColor }: { children: React.ReactNode; accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const springConfig = { stiffness: 300, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="cursor-default"
    >
      {children}
    </motion.div>
  );
}

function QuestCard({ quest }: { quest: QuestCardProps }) {
  const isLogical = quest.type === "logical";
  const accentColor = isLogical ? "#7c3aed" : "#dc2626";
  const accentColorDark = isLogical ? "#4f46e5" : "#991b1b";

  return (
    <TiltCard accentColor={accentColor}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: "linear-gradient(135deg, #111111 0%, #0d0d0d 100%)",
          border: `1px solid ${accentColor}40`,
        }}
        whileHover={{
          boxShadow: `0 0 40px ${accentColor}30, 0 0 80px ${accentColor}15`,
          borderColor: `${accentColor}80`,
        }}
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${accentColorDark}, ${accentColor})` }}
        />

        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none"
          style={{ background: accentColor }}
        />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{quest.emoji}</span>
                <div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-white"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {quest.name}
                  </h3>
                </div>
              </div>

              {/* Type badge */}
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                style={{
                  background: `${accentColor}20`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {isLogical ? (
                  <Brain className="w-3 h-3" />
                ) : (
                  <Skull className="w-3 h-3" />
                )}
                {quest.typeLabel}
              </span>
            </div>

            {/* Age rating */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm shrink-0"
              style={{
                background: `${accentColor}20`,
                border: `2px solid ${accentColor}60`,
                color: accentColor,
                fontFamily: "'Cinzel', serif",
              }}
            >
              {quest.ageRating}
            </div>
          </div>

          {/* Description */}
          <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
            {quest.description}
          </p>

          {/* Meta */}
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

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {quest.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                <Zap
                  className="w-3.5 h-3.5 mt-0.5 shrink-0"
                  style={{ color: accentColor }}
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/booking?quest=${quest.id}`}
            className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${accentColorDark}, ${accentColor})`,
              boxShadow: `0 4px 20px ${accentColor}30`,
            }}
          >
            Забронировать
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.article>
    </TiltCard>
  );
}

export default function QuestsSection() {
  return (
    <section id="quests" className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">
            Выберите приключение
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            НАШИ КВЕСТЫ
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: "linear-gradient(90deg, #dc2626, #7c3aed)",
            }}
          />
          <p className="text-[#a1a1aa] mt-5 max-w-xl mx-auto text-sm sm:text-base">
            Два совершенно разных мира — один полон тайн и загадок, другой
            погрузит вас в атмосферу настоящего ужаса
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {QUESTS.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  );
}
