"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Users,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
} from "lucide-react";
import DatePicker from "@/components/DatePicker";
import { useLanguage } from "@/contexts/LanguageContext";

const QUEST_IDS = ["gravity-falls", "frankenstein"];
const QUEST_COLORS = ["#7c3aed", "#dc2626"];

const TIME_SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

interface FormData {
  quest: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  participants: number;
  comment: string;
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export default function BookingForm() {
  const { t } = useLanguage();
  const f = t.form;
  const searchParams = useSearchParams();
  const preSelectedQuest = searchParams.get("quest") ?? "";

  const QUESTS = QUEST_IDS.map((id, i) => ({
    id,
    label: f.questOptions[i],
    color: QUEST_COLORS[i],
  }));

  const [form, setForm] = useState<FormData>({
    quest: QUEST_IDS.includes(preSelectedQuest) ? preSelectedQuest : "",
    date: "",
    timeSlot: "",
    name: "",
    phone: "",
    participants: 2,
    comment: "",
  });

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Fetch booked slots when quest and date change
  const fetchSlots = useCallback(async (quest: string, date: string) => {
    if (!quest || !date) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/slots?quest=${quest}&date=${date}`);
      const data = await res.json();
      if (data.success) {
        setBookedSlots(data.bookedSlots ?? []);
      }
    } catch {
      // silently ignore
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots(form.quest, form.date);
    // Reset time slot if the current one becomes booked
  }, [form.quest, form.date, fetchSlots]);

  // Reset time slot when quest/date change
  useEffect(() => {
    if (bookedSlots.includes(form.timeSlot)) {
      setForm((prev) => ({ ...prev, timeSlot: "" }));
    }
  }, [bookedSlots]);

  function validateForm(): boolean {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!form.quest) errors.quest = f.errors.quest;
    if (!form.date) errors.date = f.errors.date;
    if (!form.timeSlot) errors.timeSlot = f.errors.time;
    if (!form.name.trim()) errors.name = f.errors.name;
    if (!form.phone.trim()) errors.phone = f.errors.phone;
    if (form.participants < 2 || form.participants > 10)
      errors.participants = f.errors.participants;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message ?? f.successTitle);
        setForm({
          quest: "",
          date: "",
          timeSlot: "",
          name: "",
          phone: "",
          participants: 2,
          comment: "",
        });
        setBookedSlots([]);
      } else {
        setError(data.error ?? "Произошла ошибка. Попробуйте ещё раз.");
      }
    } catch {
      setError("Не удалось подключиться к серверу. Проверьте интернет-соединение.");
    } finally {
      setSubmitting(false);
    }
  }

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setError(null);
  }

  const selectedQuest = QUESTS.find((q) => q.id === form.quest);
  const accentColor = selectedQuest?.color ?? "#7c3aed";

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <motion.div
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(16,185,129,0.15)", border: "2px solid #10b981" }}
        >
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </motion.div>
        <h3
          className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {f.successTitle}
        </h3>
        <p className="text-[#a1a1aa] mb-2">{success}</p>
        <p className="text-[#71717a] text-sm mb-8">
          {f.successNote}{" "}
          <a href="tel:+996555118119" className="text-white hover:underline">
            +996 555 118 119
          </a>
        </p>
        <button
          onClick={() => setSuccess(null)}
          className="px-6 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #dc2626, #7c3aed)" }}
        >
          {f.newBooking}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Global error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl text-sm"
            style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
            }}
          >
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <span className="text-red-400">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quest selection */}
      <div>
        <label className="block text-sm font-medium text-[#a1a1aa] mb-3">
          {f.questLabel} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUESTS.map((quest) => {
            const isSelected = form.quest === quest.id;
            return (
              <button
                key={quest.id}
                type="button"
                onClick={() => setField("quest", quest.id)}
                className="p-4 rounded-xl text-left transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: isSelected ? `${quest.color}15` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected ? quest.color + "80" : "rgba(255,255,255,0.1)"}`,
                  boxShadow: isSelected ? `0 0 20px ${quest.color}20` : "none",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: isSelected ? quest.color : "#a1a1aa" }}
                >
                  {quest.label}
                </span>
              </button>
            );
          })}
        </div>
        {fieldErrors.quest && (
          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.quest}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#a1a1aa] mb-2">
          <Calendar className="w-4 h-4" style={{ color: accentColor }} />
          {f.dateLabel} <span className="text-red-500">*</span>
        </label>
        <DatePicker
          value={form.date}
          onChange={(val) => setField("date", val)}
          minDate={getTodayDate()}
          accentColor={accentColor}
          error={!!fieldErrors.date}
        />
        {fieldErrors.date && (
          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.date}</p>
        )}
      </div>

      {/* Time slots */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#a1a1aa] mb-3">
          <Clock className="w-4 h-4" style={{ color: accentColor }} />
          {f.timeLabel} <span className="text-red-500">*</span>
          {loadingSlots && (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#71717a]" />
          )}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {TIME_SLOTS.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = form.timeSlot === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={isBooked || !form.date || !form.quest}
                onClick={() => !isBooked && setField("timeSlot", slot)}
                className="py-2.5 px-2 rounded-xl text-sm font-medium transition-all duration-200 relative"
                style={{
                  background: isBooked
                    ? "rgba(255,255,255,0.03)"
                    : isSelected
                    ? `${accentColor}20`
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${
                    isBooked
                      ? "rgba(255,255,255,0.05)"
                      : isSelected
                      ? `${accentColor}80`
                      : "rgba(255,255,255,0.1)"
                  }`,
                  color: isBooked
                    ? "#3f3f46"
                    : isSelected
                    ? accentColor
                    : "#a1a1aa",
                  cursor: isBooked ? "not-allowed" : !form.date || !form.quest ? "not-allowed" : "pointer",
                  opacity: !form.date || !form.quest ? 0.5 : 1,
                }}
                title={isBooked ? f.slotTaken : undefined}
              >
                {slot}
                {isBooked && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black" />
                )}
              </button>
            );
          })}
        </div>
        {!form.date || !form.quest ? (
          <p className="mt-2 text-xs text-[#71717a]">{f.selectQuestFirst}</p>
        ) : null}
        {fieldErrors.timeSlot && (
          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.timeSlot}</p>
        )}
        {bookedSlots.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#71717a]">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
            {f.bookedSlots}
          </div>
        )}
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="flex items-center gap-2 text-sm font-medium text-[#a1a1aa] mb-2"
        >
          <User className="w-4 h-4" style={{ color: accentColor }} />
          {f.nameLabel} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder={f.namePlaceholder}
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-[#3f3f46] transition-all duration-200 focus:outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${fieldErrors.name ? "#dc2626" : "rgba(255,255,255,0.1)"}`,
          }}
          onFocus={(e) =>
            (e.target.style.border = `1px solid ${accentColor}80`)
          }
          onBlur={(e) =>
            (e.target.style.border = `1px solid ${fieldErrors.name ? "#dc2626" : "rgba(255,255,255,0.1)"}`)
          }
        />
        {fieldErrors.name && (
          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="flex items-center gap-2 text-sm font-medium text-[#a1a1aa] mb-2"
        >
          <Phone className="w-4 h-4" style={{ color: accentColor }} />
          {f.phoneLabel} <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+996 555 000 000"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-[#3f3f46] transition-all duration-200 focus:outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${fieldErrors.phone ? "#dc2626" : "rgba(255,255,255,0.1)"}`,
          }}
          onFocus={(e) =>
            (e.target.style.border = `1px solid ${accentColor}80`)
          }
          onBlur={(e) =>
            (e.target.style.border = `1px solid ${fieldErrors.phone ? "#dc2626" : "rgba(255,255,255,0.1)"}`)
          }
        />
        {fieldErrors.phone && (
          <p className="mt-1.5 text-xs text-red-400">{fieldErrors.phone}</p>
        )}
      </div>

      {/* Participants */}
      <div>
        <label
          htmlFor="participants"
          className="flex items-center gap-2 text-sm font-medium text-[#a1a1aa] mb-2"
        >
          <Users className="w-4 h-4" style={{ color: accentColor }} />
          {f.participantsLabel} <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setField("participants", Math.max(2, form.participants - 1))}
            className="w-10 h-10 rounded-lg text-white font-bold text-lg flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            −
          </button>
          <input
            id="participants"
            type="text"
            inputMode="numeric"
            value={form.participants}
            onChange={(e) => {
              const n = parseInt(e.target.value);
              if (!isNaN(n)) setField("participants", Math.min(10, Math.max(2, n)));
            }}
            className="flex-1 px-4 py-3 rounded-xl text-white text-sm text-center font-bold focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${fieldErrors.participants ? "#dc2626" : `${accentColor}40`}`,
            }}
          />
          <button
            type="button"
            onClick={() => setField("participants", Math.min(10, form.participants + 1))}
            className="w-10 h-10 rounded-lg text-white font-bold text-lg flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            +
          </button>
        </div>
        <p className="mt-1.5 text-xs text-[#71717a]">{f.participantsHint}</p>
        {fieldErrors.participants && (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.participants}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label
          htmlFor="comment"
          className="flex items-center gap-2 text-sm font-medium text-[#a1a1aa] mb-2"
        >
          <MessageSquare className="w-4 h-4" style={{ color: accentColor }} />
          {f.commentLabel}
          <span className="text-[#71717a] text-xs">{f.commentOptional}</span>
        </label>
        <textarea
          id="comment"
          placeholder={f.commentPlaceholder}
          value={form.comment}
          onChange={(e) => setField("comment", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-[#3f3f46] resize-none transition-all duration-200 focus:outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onFocus={(e) =>
            (e.target.style.border = `1px solid ${accentColor}80`)
          }
          onBlur={(e) =>
            (e.target.style.border = "1px solid rgba(255,255,255,0.1)")
          }
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: `linear-gradient(135deg, ${accentColor === "#dc2626" ? "#991b1b" : "#4f46e5"}, ${accentColor})`,
          boxShadow: `0 4px 24px ${accentColor}30`,
        }}
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {f.submitting}
          </>
        ) : (
          <>
            {f.submit}
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#71717a]">{f.submitNote}</p>
    </form>
  );
}
