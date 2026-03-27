import { NextRequest, NextResponse } from "next/server";
import { getBookedSlots } from "@/lib/excel";

export const dynamic = "force-dynamic";

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

    const bookedSlots = getBookedSlots(quest, date);

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
