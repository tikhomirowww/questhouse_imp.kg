/**
 * Run this script once to initialize the bookings.xlsx file with headers.
 * Usage: npx tsx scripts/init-excel.ts
 */
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const EXCEL_PATH = path.join(DATA_DIR, "bookings.xlsx");

const HEADER_LABELS = [
  "ID",
  "Дата создания",
  "Квест",
  "Дата сеанса",
  "Время",
  "Имя",
  "Телефон",
  "Кол-во участников",
  "Комментарий",
  "Статус",
];

function init() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log("✓ Created data/ directory");
  }

  if (fs.existsSync(EXCEL_PATH)) {
    console.log("ℹ bookings.xlsx already exists — skipping");
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([HEADER_LABELS]);

  ws["!cols"] = [
    { wch: 24 },
    { wch: 22 },
    { wch: 20 },
    { wch: 14 },
    { wch: 10 },
    { wch: 22 },
    { wch: 18 },
    { wch: 18 },
    { wch: 40 },
    { wch: 14 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Бронирования");
  XLSX.writeFile(wb, EXCEL_PATH);
  console.log(`✓ Created ${EXCEL_PATH}`);
}

init();
