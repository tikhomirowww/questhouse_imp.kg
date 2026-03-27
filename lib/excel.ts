import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const EXCEL_PATH = path.join(DATA_DIR, "bookings.xlsx");

export interface Booking {
  id: string;
  createdAt: string;
  quest: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  participants: number;
  comment: string;
  status: string;
}

const HEADERS: (keyof Booking)[] = [
  "id",
  "createdAt",
  "quest",
  "date",
  "timeSlot",
  "name",
  "phone",
  "participants",
  "comment",
  "status",
];

const HEADER_LABELS: Record<keyof Booking, string> = {
  id: "ID",
  createdAt: "Дата создания",
  quest: "Квест",
  date: "Дата сеанса",
  timeSlot: "Время",
  name: "Имя",
  phone: "Телефон",
  participants: "Кол-во участников",
  comment: "Комментарий",
  status: "Статус",
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function initWorkbook(): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  const headerRow = HEADERS.map((h) => HEADER_LABELS[h]);
  const ws = XLSX.utils.aoa_to_sheet([headerRow]);

  // Style column widths
  ws["!cols"] = [
    { wch: 20 }, // ID
    { wch: 20 }, // Дата создания
    { wch: 20 }, // Квест
    { wch: 15 }, // Дата сеанса
    { wch: 10 }, // Время
    { wch: 20 }, // Имя
    { wch: 18 }, // Телефон
    { wch: 18 }, // Кол-во участников
    { wch: 40 }, // Комментарий
    { wch: 15 }, // Статус
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Бронирования");
  return wb;
}

export function readAllBookings(): Booking[] {
  ensureDataDir();

  if (!fs.existsSync(EXCEL_PATH)) {
    const wb = initWorkbook();
    XLSX.writeFile(wb, EXCEL_PATH);
    return [];
  }

  try {
    const wb = XLSX.readFile(EXCEL_PATH);
    const ws = wb.Sheets["Бронирования"];
    if (!ws) return [];

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
      header: HEADERS,
      range: 1, // skip header row
    });

    return rows.map((row) => ({
      id: String(row.id ?? ""),
      createdAt: String(row.createdAt ?? ""),
      quest: String(row.quest ?? ""),
      date: String(row.date ?? ""),
      timeSlot: String(row.timeSlot ?? ""),
      name: String(row.name ?? ""),
      phone: String(row.phone ?? ""),
      participants: Number(row.participants ?? 0),
      comment: String(row.comment ?? ""),
      status: String(row.status ?? ""),
    }));
  } catch {
    return [];
  }
}

export function appendBooking(booking: Booking): void {
  ensureDataDir();

  let wb: XLSX.WorkBook;
  let ws: XLSX.WorkSheet;

  if (!fs.existsSync(EXCEL_PATH)) {
    wb = initWorkbook();
    ws = wb.Sheets["Бронирования"];
  } else {
    wb = XLSX.readFile(EXCEL_PATH);
    ws = wb.Sheets["Бронирования"];
    if (!ws) {
      wb = initWorkbook();
      ws = wb.Sheets["Бронирования"];
    }
  }

  const newRow = HEADERS.map((h) => booking[h]);
  XLSX.utils.sheet_add_aoa(ws, [newRow], { origin: -1 });

  XLSX.writeFile(wb, EXCEL_PATH);
}

export function isSlotTaken(
  quest: string,
  date: string,
  timeSlot: string
): boolean {
  const bookings = readAllBookings();
  return bookings.some(
    (b) =>
      b.quest === quest &&
      b.date === date &&
      b.timeSlot === timeSlot &&
      b.status !== "cancelled"
  );
}

export function getBookedSlots(quest: string, date: string): string[] {
  const bookings = readAllBookings();
  return bookings
    .filter(
      (b) =>
        b.quest === quest &&
        b.date === date &&
        b.status !== "cancelled"
    )
    .map((b) => b.timeSlot);
}
