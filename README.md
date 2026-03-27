# Квест Хаус ИМП — Официальный сайт

Полнофункциональный веб-сайт для квест-хауса **ИМП** в Бишкеке (Кыргызстан) с онлайн-бронированием и сохранением заявок в Google Sheets.

## Стек технологий

- **Next.js 14** (App Router, SSR/SSG)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — анимации
- **Google Sheets API** — хранение бронирований и занятых слотов
- **Lucide React** — иконки

---

## Быстрый старт

### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить Google Sheets

Создайте `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполните переменные:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_SHEET_NAME=Bookings
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Что нужно сделать в Google Cloud:

1. Создать Service Account.
2. Включить Google Sheets API.
3. Скачать JSON-ключ и перенести `client_email` и `private_key` в `.env.local`.
4. Открыть нужную Google-таблицу и выдать доступ `Editor` на `GOOGLE_SHEETS_CLIENT_EMAIL`.

Лист `Bookings` создастся автоматически, если его ещё нет.

### 2.1. Настроить Telegram-уведомления

Опционально можно добавить уведомления админу в Telegram.

1. Создайте бота через `@BotFather`
2. Скопируйте токен бота в `TELEGRAM_BOT_TOKEN`
3. Добавьте бота в нужный чат или напишите ему в личку
4. Узнайте `chat_id` и запишите его в `TELEGRAM_CHAT_ID`

После каждой новой брони админ будет получать сообщение в Telegram. Если Telegram временно недоступен, сама бронь всё равно сохранится в Google Sheets.

### 3. Запустить в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### 4. Production-сборка

```bash
npm run build
npm start
```

---

## Структура проекта

```
questhouse-imp/
├── app/
│   ├── layout.tsx          # Корневой layout с метаданными и Google Fonts
│   ├── page.tsx            # Главная страница
│   ├── globals.css         # Глобальные стили + кастомные CSS-анимации
│   ├── booking/
│   │   └── page.tsx        # Страница бронирования
│   ├── api/
│   │   ├── booking/
│   │   │   └── route.ts    # POST /api/booking — создание бронирования
│   │   └── slots/
│   │       └── route.ts    # GET /api/slots — занятые слоты
│   ├── sitemap.ts          # /sitemap.xml
│   └── robots.ts           # /robots.txt
├── components/
│   ├── Navbar.tsx          # Навигация (sticky, mobile menu)
│   ├── Hero.tsx            # Герой-секция с частицами и CTA
│   ├── AboutSection.tsx    # О нас, преимущества
│   ├── QuestCard.tsx       # Карточки квестов (3D tilt hover)
│   ├── HowItWorks.tsx      # Как это работает — 3 шага
│   ├── ReviewsSection.tsx  # Отзывы и социальные доказательства
│   ├── ContactSection.tsx  # Контакты + Google Maps
│   ├── Footer.tsx          # Подвал сайта
│   ├── WhatsAppButton.tsx  # Плавающая кнопка WhatsApp
│   └── BookingForm.tsx     # Форма бронирования
├── lib/
│   └── google-sheets.ts    # Утилиты чтения/записи Google Sheets
├── tailwind.config.ts
└── next.config.ts
```

---

## Функциональность

### Бронирование
- Форма выбора квеста, даты, времени, имени, телефона и числа участников
- Реалтайм проверка занятых слотов (GET /api/slots)
- Защита от двойного бронирования на сервере
- Валидация всех полей с русскоязычными ошибками
- Успешное бронирование сохраняется в Google Sheets
- Опциональные уведомления админу в Telegram

### Google Sheets

Каждое бронирование содержит колонки:

| Колонка | Описание |
|---|---|
| ID | Уникальный ID (QH-...) |
| Created At | Дата/время создания заявки |
| Quest Slug | `gravity-falls` / `frankenstein` |
| Quest Name | Gravity Falls / Франкенштейн |
| Booking Date | Дата квеста |
| Time Slot | Временной слот |
| Customer Name | Имя клиента |
| Phone | Номер телефона |
| Participants | 2–10 |
| Comment | Пожелания |
| Status | confirmed / cancelled |

### SEO
- Полные метаданные (title, description, keywords)
- Open Graph + Twitter Card
- JSON-LD LocalBusiness schema
- sitemap.xml и robots.txt
- Семантическая HTML-разметка (main, section, article, h1-h3)

---

## Контакты

| | |
|---|---|
| Адрес | ул. Байтик Баатыра 36/1, Бишкек |
| Телефон 1 | +996 555 118 119 |
| Телефон 2 | +996 707 118 119 |
| Instagram | @questhouse_imp.kg |
| WhatsApp | https://wa.me/996555118119 |

---

## Деплой

### Vercel (рекомендуется)

```bash
npm i -g vercel
vercel
```

> **Важно:** при деплое на Vercel `data/bookings.xlsx` не сохраняется между деплоями (serverless). Для production используйте Vercel Blob Storage или замените на БД (Supabase, PlanetScale).
>
> Теперь заявки хранятся в Google Sheets, поэтому локальное файловое хранилище больше не используется. Главное: корректно задать env-переменные в Vercel и выдать сервисному аккаунту доступ к таблице.

### Self-hosted (VPS)

```bash
npm run build
pm2 start npm --name questhouse -- start
```

На сервере также нужно задать те же Google Sheets env-переменные.
