"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

function toYMD(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

function formatDisplay(ymd: string) {
  if (!ymd) return "";
  const [y, m, d] = ymd.split("-");
  return `${parseInt(d)} ${MONTHS_GENITIVE[parseInt(m) - 1]} ${y}`;
}

interface DatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  minDate?: string; // "YYYY-MM-DD"
  accentColor?: string;
  error?: boolean;
  disabled?: boolean;
  onDisabledClick?: () => void;
}

export default function DatePicker({
  value,
  onChange,
  minDate,
  accentColor = "#7c3aed",
  error = false,
  disabled = false,
  onDisabledClick,
}: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDateObject = minDate ? new Date(minDate + "T00:00:00") : today;

  const initialDate = value ? new Date(value + "T00:00:00") : today;
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isAtMinMonth =
    viewYear < minDateObject.getFullYear() ||
    (viewYear === minDateObject.getFullYear() &&
      viewMonth <= minDateObject.getMonth());

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  function getDays() {
    const firstDay = new Date(viewYear, viewMonth, 1);
    // Monday-based: 0=Mon … 6=Sun
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

    const cells: { day: number; month: "prev" | "cur" | "next"; date: Date }[] = [];

    // Leading days from previous month
    for (let i = startDow - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      cells.push({ day: d, month: "prev", date: new Date(viewYear, viewMonth - 1, d) });
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, month: "cur", date: new Date(viewYear, viewMonth, d) });
    }
    // Trailing days
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, month: "next", date: new Date(viewYear, viewMonth + 1, d) });
    }
    return cells;
  }

  function select(date: Date) {
    onChange(toYMD(date));
    setOpen(false);
  }

  function isDisabled(date: Date) {
    if (minDate) {
      const min = new Date(minDate + "T00:00:00");
      return date < min;
    }
    return date < today;
  }

  function isSelected(date: Date) {
    return value === toYMD(date);
  }

  function isToday(date: Date) {
    return toYMD(date) === toYMD(today);
  }

  const cells = getDays();

  return (
    <div ref={ref} className="relative">
      {/* Input trigger */}
      <button
        type="button"
        onClick={() => {
          if (disabled) {
            onDisabledClick?.();
            return;
          }
          setOpen((o) => !o);
        }}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 focus:outline-none"
        style={{
          background: disabled ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${open ? accentColor + "80" : error ? "#dc2626" : "rgba(255,255,255,0.1)"}`,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.72 : 1,
        }}
      >
        <span
          className={
            value
              ? "text-white text-sm"
              : disabled
              ? "text-[#5b5b66] text-sm"
              : "text-[#3f3f46] text-sm"
          }
        >
          {value ? formatDisplay(value) : "дд.мм.гггг"}
        </span>
        <Calendar
          className="w-4 h-4 shrink-0"
          style={{ color: disabled ? "#5b5b66" : accentColor }}
        />
      </button>

      {/* Calendar dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "#181818",
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}20`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                type="button"
                onClick={prevMonth}
                disabled={isAtMinMonth}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                style={{
                  color: isAtMinMonth ? "#3f3f46" : "#a1a1aa",
                  opacity: isAtMinMonth ? 0 : 1,
                  pointerEvents: isAtMinMonth ? "none" : "auto",
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span
                className="font-semibold text-sm text-white"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {MONTHS[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-[#a1a1aa] hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3">
              {/* Weekday labels */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map(wd => (
                  <div
                    key={wd}
                    className="text-center text-[10px] font-medium py-1"
                    style={{ color: wd === "Сб" || wd === "Вс" ? accentColor : "#71717a" }}
                  >
                    {wd}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {cells.map((cell, i) => {
                  const disabled = isDisabled(cell.date);
                  const selected = isSelected(cell.date);
                  const todayCell = isToday(cell.date);
                  const isOtherMonth = cell.month !== "cur";

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && select(cell.date)}
                      className="relative flex items-center justify-center h-8 w-full rounded-lg text-xs font-medium transition-all duration-150"
                      style={{
                        color: selected
                          ? "#fff"
                          : disabled
                          ? "#4a4a53"
                          : isOtherMonth
                          ? "#444"
                          : todayCell
                          ? accentColor
                          : "#d4d4d8",
                        background: selected ? accentColor : "transparent",
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.52 : 1,
                      }}
                      onMouseEnter={e => {
                        if (!disabled && !selected)
                          (e.currentTarget as HTMLButtonElement).style.background = `${accentColor}20`;
                      }}
                      onMouseLeave={e => {
                        if (!selected)
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      }}
                    >
                      {cell.day}
                      {/* Today dot */}
                      {todayCell && !selected && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: accentColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); }}
                className="text-xs text-[#71717a] hover:text-white transition-colors"
              >
                Очистить
              </button>
              <button
                type="button"
                onClick={() => { select(today); }}
                className="text-xs font-medium transition-colors"
                style={{ color: accentColor }}
              >
                Сегодня
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
