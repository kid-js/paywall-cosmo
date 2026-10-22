# Космоклуб — мобильный paywall

Экран paywall детской игры. Пользователь выбирает один из двух тарифов, нажимает кнопку подписки и видит экран успешной покупки. Платёжного SDK и реальных денег нет, покупка тестовая, запись о ней сохраняется в БД.

- **Figma:** [Ссылка на макет](https://www.figma.com/design/j7pmbv9BPRpQzK5t2D3WME/Amaya?node-id=0-1&t=qLTnqBUERtPKJDAY-1)
- **Демо:** [paywall-cosmo.onrender.com](https://paywall-cosmo.onrender.com/) (Возможно потребуется VPN для пользователей из РФ)

## Технологии

Nuxt 4, Vue 3, TypeScript, `@libsql/client` (БД Turso), самохостящийся шрифт Noto Sans SC (`@fontsource`). Нужен Node `^22.22.3` или `^24.15.0`.

## Запуск локально

1. Создайте бесплатную базу на [turso.tech](https://turso.tech) и получите адрес и токен:
   ```bash
   turso db create paywall
   turso db show paywall --url
   turso db tokens create paywall
   ```
2. Скопируйте `.env.example` в `.env` и вставьте значения `NUXT_DATABASE_URL` и `NUXT_DATABASE_AUTH_TOKEN`. Локальной БД нет, проект всегда работает с Turso. Таблица `purchases` создаётся сама при первой покупке.
3. Установите зависимости и запустите:
   ```bash
   npm install
   npm run dev          # http://localhost:3000
   ```
   Прод-сборка: `npm run build`, затем `node .output/server/index.mjs`.

## Где что лежит

- **Frontend:** `app/` — экран в `components/PaywallScreen.vue`, состояние и запросы в `composables/usePaywall.ts`, стили и токены в `assets/css/main.css`.
- **Server routes:** `server/api/offers.get.ts` (`GET /api/offers`) и `server/api/purchase.post.ts` (`POST /api/purchase`).
- **БД:** `server/utils/db.ts` — клиент Turso и создание таблицы. Тарифы — `server/utils/offers.ts`.
- **Общие типы** фронта и сервера: `shared/types/`.

## Особенности проекта

- **Тарифы грузятся с сервера:** страница запрашивает `GET /api/offers` через `useFetch`. В БД они не хранятся, лежат в `server/utils/offers.ts`: БД нужна только для покупок.
- **Покупка:** кнопка отправляет `POST /api/purchase` с `{ userId, offerId }`. Сервер проверяет, что тариф существует и `userId` — целое число ≥ 1, затем создаёт запись (`id` = `purchaseId`, `user_id`, `offer_id`, `created_at`) и возвращает `purchaseId`, `userId`, `offerId`, `createdAt`. Каждая покупка — новая запись.
- **Состояния:** загрузка тарифов (спиннер), покупка в процессе (спиннер в кнопке, блокировка кнопки и выбора тарифа), ошибка покупки (сообщение под кнопкой, можно повторить), экран успеха с названием купленного тарифа.
- **Mobile-first:** вёрстка рассчитана на 360–430 px, учтены safe-area и `viewport-fit=cover` для webview.
- **Доступность:** тарифы — `radio`-кнопки в `fieldset` (работает клавиатура), видимый фокус, зоны нажатия не меньше 44 px, учитывается `prefers-reduced-motion`.
- **Шрифты:** файлы Noto Sans SC (кириллица и латиница) подгружаются через `preload`.

## Деплой

**Render** (Web Service, Node, бесплатный план) + **Turso**. Render запускает Nuxt как обычный Node-сервер, поэтому работают server routes. Turso: SQLite-совместимая, подключается одним клиентом.

Настройки сервиса: Build — `npm ci && npm run build`, Start — `node .output/server/index.mjs`. Переменные: `NUXT_DATABASE_URL`, `NUXT_DATABASE_AUTH_TOKEN`, `NODE_VERSION=24`, `NITRO_PRESET=render_com`.

> Бесплатный сервис Render засыпает при простое, первый запрос после паузы может занять до минуты.

## Что упрощено и не сделано

- Кнопки "Восстановить покупки" и "Начать приключение" - только интерфейс.
- `userId` всегда 155: авторизации нет.
- Нет отдельного экрана ошибки при сбое загрузки тарифов.

## Что сделал бы ещё за 2 часа

1. Тесты: проверка валидации `POST /api/purchase` и e2e-сценарий покупки.
2. Экран ошибки загрузки тарифов с кнопкой "Повторить".
3. Защита от дублей покупки и ограничение частоты запросов.
4. Рефакторинг и улучшенная типизация.
5. Вынес бы SVG-иконки в отдельные компоненты, чтобы они вставлялись инлайн-кодом.
6. Вынес бы шапку в отдельный компонент (layout).
7. Вынес бы экран успешной покупки в отдельный компонент.
8. Вынес бы стили из компонентов в отдельный файл.
9. Оптимизировал бы SVG и изображения.
