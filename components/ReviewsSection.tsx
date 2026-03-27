"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const REVIEWS = [
  {
    name: "Айгерим К.",
    rating: 5,
    text: "Лучший квест в городе! Гравити Фолс просто потряс нас — декорации, актёры, загадки — всё на высшем уровне! Придём ещё раз!",
    quest: "Gravity Falls",
  },
  {
    name: "Максим Д.",
    rating: 5,
    text: "Франкенштейн — это было страшно и круто одновременно! Профессиональные актёры, атмосфера — 10/10. Советую всем любителям хоррора!",
    quest: "Франкенштейн",
  },
  {
    name: "Диана Ч.",
    rating: 5,
    text: "Отмечали день рождения дочки в квесте Гравити Фолс. Дети были в восторге! Аниматоры — настоящие профессионалы своего дела.",
    quest: "Gravity Falls",
  },
  {
    name: "Руслан Б.",
    rating: 5,
    text: "Ходили корпоративом на Франкенштейна. Все в шоке! Такого уровня декораций и атмосферы я не видел ни в одном другом квесте Бишкека.",
    quest: "Франкенштейн",
  },
  {
    name: "Асель М.",
    rating: 5,
    text: "Уникальный опыт! Гравити Фолс — это целый мир, в который веришь с первых секунд. Обязательно вернёмся с друзьями!",
    quest: "Gravity Falls",
  },
  {
    name: "Тимур Н.",
    rating: 5,
    text: "Квест хаус ИМП — это топ! Делали квест на двоих, провели незабываемый вечер. Обслуживание — высший класс, спасибо команде!",
    quest: "Франкенштейн",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          style={{
            color: i < rating ? "#f59e0b" : "#333",
            fill: i < rating ? "#f59e0b" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.1) 0%, transparent 60%)",
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
            Что говорят наши гости
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ОТЗЫВЫ
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #f59e0b, #dc2626)" }}
          />

          {/* Social proof stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                2900+
              </span>
              <span className="text-[#71717a] text-xs tracking-wide mt-1">отзывов ⭐</span>
            </div>
            <div className="w-px bg-white/10 hidden sm:block" />
            <div className="flex flex-col items-center">
              <InstagramIcon className="w-6 h-6 text-pink-400 mb-2" />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                26K+
              </span>
              <span className="text-[#71717a] text-xs tracking-wide mt-1">подписчиков</span>
            </div>
            <div className="w-px bg-white/10 hidden sm:block" />
            <div className="flex flex-col items-center">
              <MessageCircle className="w-6 h-6 text-green-400 mb-2" />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                100%
              </span>
              <span className="text-[#71717a] text-xs tracking-wide mt-1">довольных гостей</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-5 rounded-xl relative group hover:border-yellow-500/30 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: i % 2 === 0
                          ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                          : "linear-gradient(135deg, #dc2626, #991b1b)",
                      }}
                    >
                      {review.name[0]}
                    </div>
                    <span className="text-white text-sm font-medium">{review.name}</span>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full shrink-0 ml-2"
                  style={{
                    background: review.quest === "Gravity Falls"
                      ? "rgba(124,58,237,0.15)"
                      : "rgba(220,38,38,0.15)",
                    color: review.quest === "Gravity Falls" ? "#7c3aed" : "#dc2626",
                  }}
                >
                  {review.quest}
                </span>
              </div>
              <p className="text-[#a1a1aa] text-sm leading-relaxed italic">
                «{review.text}»
              </p>
            </motion.div>
          ))}
        </div>

        {/* Instagram link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/questhouse_imp.kg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
              color: "white",
            }}
          >
            <InstagramIcon className="w-4 h-4" />
            @questhouse_imp.kg — ещё больше отзывов
          </a>
        </motion.div>
      </div>
    </section>
  );
}
