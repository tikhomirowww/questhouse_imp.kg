type TelegramBookingNotification = {
  bookingId: string;
  questName: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  participants: number;
  comment?: string;
  createdAt: string;
};

function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return null;
  }

  return { botToken, chatId };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildBookingMessage(data: TelegramBookingNotification) {
  const comment = data.comment?.trim()
    ? escapeHtml(data.comment.trim())
    : "Без комментария";

  return [
    "<b>Новая бронь</b>",
    "",
    `<b>Квест:</b> ${escapeHtml(data.questName)}`,
    `<b>Дата:</b> ${escapeHtml(data.date)}`,
    `<b>Время:</b> ${escapeHtml(data.timeSlot)}`,
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
    `<b>Участников:</b> ${String(data.participants)}`,
    `<b>Комментарий:</b> ${comment}`,
    "",
    `<b>ID:</b> ${escapeHtml(data.bookingId)}`,
    `<b>Создано:</b> ${escapeHtml(data.createdAt)}`,
  ].join("\n");
}

export async function sendTelegramBookingNotification(
  data: TelegramBookingNotification
) {
  const config = getTelegramConfig();

  if (!config) {
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${config.botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: buildBookingMessage(data),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Telegram send failed: ${response.status} ${response.statusText} ${responseText}`
    );
  }
}
