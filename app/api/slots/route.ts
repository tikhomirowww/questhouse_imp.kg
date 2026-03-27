import { NextRequest, NextResponse } from "next/server";
import { getBookedSlots } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quest = searchParams.get("quest");
    const date = searchParams.get("date");

    if (!quest || !date) {
      return NextResponse.json(
        { success: false, error: "Необходимо указать квест и дату" },
        { status: 400 }
      );
    }

    const bookedSlots = await getBookedSlots(
      getQuestName(quest),
      formatBookingDate(date)
    );

    return NextResponse.json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    console.error("Slots fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось загрузить доступные слоты",
        bookedSlots: [],
      },
      { status: 500 }
    );
  }
}
