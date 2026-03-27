import { google, sheets_v4 } from "googleapis";

export interface Booking {
  id: string;
  createdAt: string;
  questName: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  participants: number;
  comment: string;
  status: string;
}

const DEFAULT_SHEET_NAME = "Bookings";
const DEFAULT_SLOTS_SHEET_NAME = "BookedSlots";
const SLOT_CACHE_TTL_MS = 15_000;
const SLOT_INDEX_CACHE_TTL_MS = 60_000;

const HEADERS: (keyof Booking)[] = [
  "id",
  "createdAt",
  "questName",
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
  createdAt: "Created At",
  questName: "Quest Name",
  date: "Booking Date",
  timeSlot: "Time Slot",
  name: "Customer Name",
  phone: "Phone",
  participants: "Participants",
  comment: "Comment",
  status: "Status",
};

type SlotRow = {
  bookingId: string;
  questName: string;
  date: string;
  timeSlot: string;
  status: string;
  updatedAt: string;
};

const SLOT_HEADERS: (keyof SlotRow)[] = [
  "bookingId",
  "questName",
  "date",
  "timeSlot",
  "status",
  "updatedAt",
];

const SLOT_HEADER_LABELS: Record<keyof SlotRow, string> = {
  bookingId: "Booking ID",
  questName: "Quest Name",
  date: "Booking Date",
  timeSlot: "Time Slot",
  status: "Status",
  updatedAt: "Updated At",
};

const slotCache = new Map<string, { expiresAt: number; slots: string[] }>();
let slotIndexCache: { expiresAt: number; rows: SlotRow[] } | null = null;
let sheetSetupPromise: Promise<void> | null = null;
let sheetsClientPromise: Promise<sheets_v4.Sheets> | null = null;

function getSpreadsheetId() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEETS_SPREADSHEET_ID");
  }

  return spreadsheetId;
}

function getSheetName() {
  return process.env.GOOGLE_SHEETS_SHEET_NAME || DEFAULT_SHEET_NAME;
}

function getSlotsSheetName() {
  return process.env.GOOGLE_SHEETS_SLOTS_SHEET_NAME || DEFAULT_SLOTS_SHEET_NAME;
}

function getPrivateKey() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("Missing GOOGLE_SHEETS_PRIVATE_KEY");
  }

  return privateKey.replace(/\\n/g, "\n");
}

async function getSheetsClient() {
  if (!sheetsClientPromise) {
    sheetsClientPromise = (async () => {
      const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

      if (!clientEmail) {
        throw new Error("Missing GOOGLE_SHEETS_CLIENT_EMAIL");
      }

      const auth = new google.auth.JWT({
        email: clientEmail,
        key: getPrivateKey(),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      return google.sheets({
        version: "v4",
        auth,
      });
    })().catch((error) => {
      sheetsClientPromise = null;
      throw error;
    });
  }

  return sheetsClientPromise;
}

async function ensureSheetHeaders(
  sheets: sheets_v4.Sheets,
  sheetName: string,
  headers: string[]
) {
  const spreadsheetId = getSpreadsheetId();
  const headerRange = `${sheetName}!A1:${columnLetterFromIndex(headers.length)}1`;
  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  const currentHeaders = headerResponse.data.values?.[0]?.map(String) ?? [];

  const missingHeaders =
    currentHeaders.length !== headers.length ||
    headers.some((header, index) => currentHeaders[index] !== header);

  if (missingHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [headers],
      },
    });
  }
}

async function ensureSheetsSetup() {
  if (!sheetSetupPromise) {
    sheetSetupPromise = (async () => {
      const sheets = await getSheetsClient();
      const spreadsheetId = getSpreadsheetId();
      const bookingSheetName = getSheetName();
      const slotsSheetName = getSlotsSheetName();

      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: "sheets.properties",
      });

      const existingSheetNames = new Set(
        spreadsheet.data.sheets
          ?.map((sheet) => sheet.properties?.title)
          .filter((title): title is string => Boolean(title)) ?? []
      );

      const missingSheets = [bookingSheetName, slotsSheetName].filter(
        (sheetName) => !existingSheetNames.has(sheetName)
      );

      if (missingSheets.length > 0) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: missingSheets.map((sheetName) => ({
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            })),
          },
        });
      }

      await ensureSheetHeaders(
        sheets,
        bookingSheetName,
        HEADERS.map((header) => HEADER_LABELS[header])
      );
      await ensureSheetHeaders(
        sheets,
        slotsSheetName,
        SLOT_HEADERS.map((header) => SLOT_HEADER_LABELS[header])
      );
    })().catch((error) => {
      sheetSetupPromise = null;
      throw error;
    });
  }

  await sheetSetupPromise;
}

function columnLetterFromIndex(index: number) {
  let dividend = index;
  let columnName = "";

  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnName;
}

function normalizeBooking(row: string[]): Booking {
  return {
    id: row[0] ?? "",
    createdAt: row[1] ?? "",
    questName: row[2] ?? "",
    date: row[3] ?? "",
    timeSlot: row[4] ?? "",
    name: row[5] ?? "",
    phone: row[6] ?? "",
    participants: Number(row[7] ?? 0),
    comment: row[8] ?? "",
    status: row[9] ?? "",
  };
}

function normalizeSlotRow(row: string[]): SlotRow {
  return {
    bookingId: row[0] ?? "",
    questName: row[1] ?? "",
    date: row[2] ?? "",
    timeSlot: row[3] ?? "",
    status: row[4] ?? "",
    updatedAt: row[5] ?? "",
  };
}

function getSlotCacheKey(questName: string, date: string) {
  return `${questName}::${date}`;
}

function readSlotCache(questName: string, date: string) {
  const key = getSlotCacheKey(questName, date);
  const cached = slotCache.get(key);

  if (!cached) {
    return null;
  }

  if (cached.expiresAt <= Date.now()) {
    slotCache.delete(key);
    return null;
  }

  return cached.slots;
}

function writeSlotCache(questName: string, date: string, slots: string[]) {
  slotCache.set(getSlotCacheKey(questName, date), {
    slots,
    expiresAt: Date.now() + SLOT_CACHE_TTL_MS,
  });
}

function invalidateSlotCache(questName: string, date: string) {
  slotCache.delete(getSlotCacheKey(questName, date));
}

function readSlotIndexCache() {
  if (!slotIndexCache) {
    return null;
  }

  if (slotIndexCache.expiresAt <= Date.now()) {
    slotIndexCache = null;
    return null;
  }

  return slotIndexCache.rows;
}

function writeSlotIndexCache(rows: SlotRow[]) {
  slotIndexCache = {
    rows,
    expiresAt: Date.now() + SLOT_INDEX_CACHE_TTL_MS,
  };
}

export async function readAllBookings(): Promise<Booking[]> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const sheetName = getSheetName();

  await ensureSheetsSetup();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A2:${columnLetterFromIndex(HEADERS.length)}`,
  });

  const rows = response.data.values ?? [];
  return rows
    .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
    .map((row) => normalizeBooking(row.map((cell) => String(cell ?? ""))));
}

export async function appendBooking(booking: Booking): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const sheetName = getSheetName();
  const slotsSheetName = getSlotsSheetName();

  await ensureSheetsSetup();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:${columnLetterFromIndex(HEADERS.length)}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        HEADERS.map((header) => {
          const value = booking[header];
          return typeof value === "number" ? value : String(value);
        }),
      ],
    },
  });

  const nextSlotRow: SlotRow = {
    bookingId: booking.id,
    questName: booking.questName,
    date: booking.date,
    timeSlot: booking.timeSlot,
    status: booking.status,
    updatedAt: booking.createdAt,
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${slotsSheetName}!A:${columnLetterFromIndex(SLOT_HEADERS.length)}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          nextSlotRow.bookingId,
          nextSlotRow.questName,
          nextSlotRow.date,
          nextSlotRow.timeSlot,
          nextSlotRow.status,
          nextSlotRow.updatedAt,
        ],
      ],
    },
  });

  invalidateSlotCache(booking.questName, booking.date);
  const cachedRows = readSlotIndexCache();
  if (cachedRows) {
    writeSlotIndexCache([...cachedRows, nextSlotRow]);
  }
}

async function readSlotRows(): Promise<SlotRow[]> {
  const cachedRows = readSlotIndexCache();
  if (cachedRows) {
    return cachedRows;
  }

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const slotsSheetName = getSlotsSheetName();

  await ensureSheetsSetup();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${slotsSheetName}!A2:${columnLetterFromIndex(SLOT_HEADERS.length)}`,
  });

  const rows = response.data.values ?? [];
  const normalizedRows = rows
    .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
    .map((row) => normalizeSlotRow(row.map((cell) => String(cell ?? ""))));
  writeSlotIndexCache(normalizedRows);
  return normalizedRows;
}

async function rebuildSlotsIndexFromBookings(bookings: Booking[]) {
  const activeBookings = bookings.filter((booking) => booking.status !== "cancelled");

  if (activeBookings.length === 0) {
    return;
  }

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const slotsSheetName = getSlotsSheetName();

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${slotsSheetName}!A2`,
    valueInputOption: "RAW",
    requestBody: {
      values: activeBookings.map((booking) => [
        booking.id,
        booking.questName,
        booking.date,
        booking.timeSlot,
        booking.status,
        booking.createdAt,
      ]),
    },
  });

  writeSlotIndexCache(
    activeBookings.map((booking) => ({
      bookingId: booking.id,
      questName: booking.questName,
      date: booking.date,
      timeSlot: booking.timeSlot,
      status: booking.status,
      updatedAt: booking.createdAt,
    }))
  );
}

export async function isSlotTaken(
  questName: string,
  date: string,
  timeSlot: string
): Promise<boolean> {
  const bookedSlots = await getBookedSlots(questName, date);
  return bookedSlots.includes(timeSlot);
}

export async function getBookedSlots(
  questName: string,
  date: string
): Promise<string[]> {
  const cachedSlots = readSlotCache(questName, date);
  if (cachedSlots) {
    return cachedSlots;
  }

  let slotRows = await readSlotRows();

  if (slotRows.length === 0) {
    const bookings = await readAllBookings();
    await rebuildSlotsIndexFromBookings(bookings);
    slotRows = bookings
      .filter((booking) => booking.status !== "cancelled")
      .map((booking) => ({
        bookingId: booking.id,
        questName: booking.questName,
        date: booking.date,
        timeSlot: booking.timeSlot,
        status: booking.status,
        updatedAt: booking.createdAt,
      }));
  }

  const slots = slotRows
    .filter(
      (slot) =>
        slot.questName === questName &&
        slot.date === date &&
        slot.status !== "cancelled"
    )
    .map((slot) => slot.timeSlot);

  writeSlotCache(questName, date, slots);
  return slots;
}
