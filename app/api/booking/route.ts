import { NextRequest, NextResponse } from "next/server";
import { appendBooking, isSlotTaken } from "@/lib/google-sheets";
import { sendTelegramBookingNotification } from "@/lib/telegram";
import { randomUUID } from "crypto";

export interface BookingRequest {
  quest: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  participants: number;
  comment?: string;
}

const VALID_QUESTS = ["gravity-falls", "frankenstein"];
const VALID_SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

function getBishkekNowParts() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bishkek",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

function isSlotTooSoon(date: string, timeSlot: string) {
  const now = getBishkekNowParts();
  if (date !== now.date) {
    return false;
  }

  const [slotHour, slotMinute] = timeSlot.split(":").map(Number);
  const slotTotalMinutes = slotHour * 60 + slotMinute;
  const nowTotalMinutes = now.hour * 60 + now.minute;

  return slotTotalMinutes - nowTotalMinutes < 120;
}

function getQuestName(quest: string) {
  return quest === "gravity-falls" ? "Gravity Falls" : "Франкенштейн";
}

function formatBookingDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bishkek",
  }).format(new Date(`${date}T00:00:00+06:00`));
}

function validateDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    const { quest, date, timeSlot, name, phone, participants, comment } = body;

    // Validate required fields
    if (!quest || !date || !timeSlot || !name || !phone || !participants) {
      return NextResponse.json(
        { success: false, error: "Все обязательные поля должны быть заполнены" },
        { status: 400 }
      );
    }

    // Validate quest
    if (!VALID_QUESTS.includes(quest)) {
      return NextResponse.json(
        { success: false, error: "Выбран неверный квест" },
        { status: 400 }
      );
    }

    // Validate date
    if (!validateDate(date)) {
      return NextResponse.json(
        { success: false, error: "Выберите корректную дату (не в прошлом)" },
        { status: 400 }
      );
    }

    // Validate time slot
    if (!VALID_SLOTS.includes(timeSlot)) {
      return NextResponse.json(
        { success: false, error: "Выбран неверный временной слот" },
        { status: 400 }
      );
    }

    if (isSlotTooSoon(date, timeSlot)) {
      return NextResponse.json(
        {
          success: false,
          error: "Этот слот недоступен менее чем за 2 часа до начала. Выберите более позднее время.",
        },
        { status: 400 }
      );
    }

    // Validate participants
    const participantsNum = Number(participants);
    if (isNaN(participantsNum) || participantsNum < 4 || participantsNum > 10) {
      return NextResponse.json(
        { success: false, error: "Количество участников должно быть от 4 до 10" },
        { status: 400 }
      );
    }

    // Validate phone (basic)
    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 9) {
      return NextResponse.json(
        { success: false, error: "Введите корректный номер телефона" },
        { status: 400 }
      );
    }

    // Check double booking
    const questName = getQuestName(quest);
    const formattedDate = formatBookingDate(date);

    if (await isSlotTaken(questName, formattedDate, timeSlot)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Этот временной слот уже занят. Пожалуйста, выберите другое время.",
        },
        { status: 409 }
      );
    }

    // Generate booking ID
    const bookingId = `QH-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`;
    const now = new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Bishkek",
    });

    await appendBooking({
      id: bookingId,
      createdAt: now,
      questName,
      date: formattedDate,
      timeSlot,
      name: name.trim(),
      phone: phone.trim(),
      participants: participantsNum,
      comment: comment?.trim() ?? "",
      status: false,
    });

    try {
      await sendTelegramBookingNotification({
        bookingId,
        createdAt: now,
        questName,
        date: formattedDate,
        timeSlot,
        name: name.trim(),
        phone: phone.trim(),
        participants: participantsNum,
        comment: comment?.trim() ?? "",
      });
    } catch (telegramError) {
      console.error("Telegram notification error:", telegramError);
    }

    return NextResponse.json({
      success: true,
      message: "Бронирование подтверждено!",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Произошла ошибка при бронировании. Пожалуйста, попробуйте ещё раз.",
      },
      { status: 500 }
    );
  }
}
