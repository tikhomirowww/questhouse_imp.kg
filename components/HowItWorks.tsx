"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Выберите квест",
    description:
      "Погрузитесь в тайны Гравити Фолс или ужасы Франкенштейна. Каждый квест — уникальное приключение.",
    color: "#7c3aed",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Забронируйте время",
    description:
      "Выберите удобную дату и временной слот. Предварительное бронирование обязательно.",
    color: "#f59e0b",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Приходите и получайте удовольствие",
    description:
      "Приходите по адресу ул. Байтик Баатыра 36/1 и погрузитесь в незабываемое приключение!",
    color: "#dc2626",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-[#111111] relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(220,38,38,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#f59e0b] tracking-[0.3em] uppercase font-medium mb-3 block">
            Просто и понятно
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            КАК ЭТО РАБОТАЕТ
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: "linear-gradient(90deg, #7c3aed, #dc2626)",
            }}
          />
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-px"
            style={{
              background:
                "linear-gradient(90deg, #7c3aed40, #f59e0b40, #dc262640)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center relative"
              >
                {/* Step number circle */}
                <div className="relative inline-flex mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                      border: `2px solid ${step.color}60`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </motion.div>

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${step.color}30` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />

                  {/* Number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step.color,
                      color: "#fff",
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Arrow between steps (mobile) */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <ArrowRight
                      className="w-5 h-5 rotate-90"
                      style={{ color: step.color }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #dc2626, #7c3aed)",
              boxShadow: "0 4px 30px rgba(124,58,237,0.3)",
            }}
          >
            Начать приключение
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
