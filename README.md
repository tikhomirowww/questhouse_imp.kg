# Квест Хаус ИМП — Официальный сайт

Полнофункциональный веб-сайт для квест-хауса **ИМП** в Бишкеке (Кыргызстан) с онлайн-бронированием и сохранением заявок в Excel.

## Стек технологий

- **Next.js 14** (App Router, SSR/SSG)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — анимации
- **SheetJS (xlsx)** — запись бронирований в Excel
- **Lucide React** — иконки

---

## Быстрый старт

### 1. Установить зависимости

```bash
npm install
```

### 2. Инициализировать Excel-файл (опционально)

```bash
npx tsx scripts/init-excel.ts
```

Создаёт файл `data/bookings.xlsx` с заголовками. Файл также создаётся автоматически при первом бронировании.

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
│   └── excel.ts            # Утилиты чтения/записи Excel (SheetJS)
├── data/
│   └── bookings.xlsx       # Файл с бронированиями (создаётся автоматически)
├── scripts/
│   └── init-excel.ts       # Скрипт инициализации Excel
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
- Успешное бронирование сохраняется в `data/bookings.xlsx`

### Excel (data/bookings.xlsx)

Каждое бронирование содержит колонки:

| Колонка | Описание |
|---|---|
| ID | Уникальный ID (QH-...) |
| Дата создания | Дата/время создания заявки |
| Квест | Gravity Falls / Франкенштейн |
| Дата сеанса | Дата квеста |
| Время | Временной слот |
| Имя | Имя клиента |
| Телефон | Номер телефона |
| Кол-во участников | 2–10 |
| Комментарий | Пожелания |
| Статус | confirmed / cancelled |

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

### Self-hosted (VPS)

```bash
npm run build
pm2 start npm --name questhouse -- start
```

Excel-файл сохраняется на сервере в папке `data/`.
