"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Lang } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const options: { value: Lang; label: string }[] = [
    { value: "ru", label: "RU" },
    { value: "ky", label: "KG" },
  ];

  return (
    <div
      className="flex items-center rounded-lg overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
    >
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          className="px-2.5 py-1 text-xs font-semibold tracking-wider transition-all duration-200"
          style={{
            background: lang === opt.value
              ? "linear-gradient(135deg, #dc2626, #7c3aed)"
              : "transparent",
            color: lang === opt.value ? "#fff" : "#71717a",
            borderRight: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
