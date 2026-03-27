import { NextRequest, NextResponse } from "next/server";
import { appendBooking, isSlotTaken } from "@/lib/excel";
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

    // Validate participants
    const participantsNum = Number(participants);
    if (isNaN(participantsNum) || participantsNum < 2 || participantsNum > 10) {
      return NextResponse.json(
        { success: false, error: "Количество участников должно быть от 2 до 10" },
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
    if (isSlotTaken(quest, date, timeSlot)) {
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

    const questName = quest === "gravity-falls" ? "Gravity Falls" : "Франкенштейн";

    // Save to Excel
    appendBooking({
      id: bookingId,
      createdAt: now,
      quest: questName,
      date,
      timeSlot,
      name: name.trim(),
      phone: phone.trim(),
      participants: participantsNum,
      comment: comment?.trim() ?? "",
      status: "confirmed",
    });

    return NextResponse.json({
      success: true,
      bookingId,
      message: `Бронирование подтверждено! Ваш номер: ${bookingId}`,
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
