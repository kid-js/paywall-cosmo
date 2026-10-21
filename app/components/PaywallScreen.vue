<script setup lang="ts">
const {
  offers,
  isLoading,
  selectedOffer,
  selectedOfferId,
} = usePaywall()
</script>

<template>
  <div v-if="isLoading" class="loader" role="status">
    <span class="sr-only">Загрузка…</span>
  </div>

  <main v-else class="paywall">
    <header class="paywall__header">
      <div class="brand">
        <span class="brand__icon" aria-hidden="true">
          <img src="/icons/rocket.svg" width="20" height="20" alt="">
        </span>
        <span class="brand__name">Космоклуб</span>
      </div>
    </header>

    <section class="paywall__intro">
      <div class="hero">
        <img class="hero__image" src="/images/hero-astronaut.png" width="76" height="76" alt="">
      </div>
      <h1 class="paywall__title">Открой всю галактику!</h1>
      <p class="paywall__subtitle">Космические истории, игры и планеты для маленьких исследователей.</p>
    </section>

    <fieldset class="offers">
      <legend class="sr-only">Выберите тариф</legend>

      <label
        v-for="offer in offers"
        :key="offer.id"
        class="offer"
        :class="{
          'offer--selected': offer.id === selectedOfferId,
          'offer--with-badge': offer.badge,
        }"
      >
        <input
          v-model="selectedOfferId"
          class="offer__input sr-only"
          type="radio"
          name="offer"
          :value="offer.id"
        >
        <span class="offer__radio" aria-hidden="true" />

        <span class="offer__info">
          <span class="offer__title">{{ offer.title }}</span>
          <span class="offer__description">{{ offer.description }}</span>
        </span>

        <span class="offer__price">
          <span class="offer__amount">{{ formatPrice(offer.price, offer.currency) }}</span>
          <span class="offer__period">{{ offer.periodLabel }}</span>
        </span>

        <span v-if="offer.badge" class="offer__badge">{{ offer.badge }}</span>
      </label>
    </fieldset>

    <ul class="features">
      <li class="features__item">Все истории и космические миры</li>
      <li class="features__item">Новые приключения каждую неделю</li>
    </ul>

    <div class="paywall__actions">
      <button class="cta" type="button" :disabled="!selectedOffer">
        <span>{{ selectedOffer?.ctaLabel || 'Подписаться' }}</span>
        <img src="/icons/arrow-right.svg" width="16" height="16" alt="" aria-hidden="true">
      </button>

      <p class="paywall__note">{{ selectedOffer?.footnote }}</p>

      <button class="restore-link" type="button">Восстановить покупки</button>
    </div>
  </main>
</template>

<style scoped>
/* ---------- Общие стили ---------- */
.paywall {
  width: 100%;
  max-width: var(--page-max-width);
  min-height: 100svh;
  margin-inline: auto;
  padding: calc(14px + env(safe-area-inset-top, 0px)) var(--page-gutter)
    calc(14px + env(safe-area-inset-bottom, 0px));
}

/* ---------- Шапка ---------- */
.paywall__header {
  padding-inline: 4px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand__icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-brand-bg);
}

.brand__name {
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
}

/* ---------- Вступление ---------- */
.paywall__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 38px;
}

.hero {
  width: 76px;
  height: 76px;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.paywall__title {
  margin-top: 10px;
  font-size: 27px;
  font-weight: 700;
  line-height: 38px;
  text-wrap: balance;
}

.paywall__subtitle {
  max-width: 300px;
  margin-top: 18px;
  font-size: 15px;
  line-height: 23px;
  text-wrap: balance;
  color: var(--color-text-muted);
}

/* ---------- Тарифы ---------- */
.offers {
  display: grid;
  gap: 14px;
  margin-top: 17px;
}

.offer {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  column-gap: 12px;
  padding: 14px;
  border: 2px solid var(--color-border);
  border-radius: 20px;
  cursor: pointer;
  background: var(--color-surface);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.offer--with-badge {
  padding: 16px 14px 14px;
}

.offer--selected {
  border-color: var(--color-success-border);
  background: var(--color-success-bg);
}

.offer:has(.offer__input:focus-visible) {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

.offer__radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-radio-border);
  border-radius: 50%;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.offer--selected .offer__radio {
  border-color: var(--color-success);
  background: var(--color-success) url('/icons/radio-check.svg') center / 20px 20px no-repeat;
}

.offer__info,
.offer__price {
  display: flex;
  flex-direction: column;
}

.offer__info {
  gap: 2px;
}

.offer__price {
  align-items: flex-end;
  gap: 4px;
}

.offer__title {
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
}

.offer__amount {
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0.01rem;
  white-space: nowrap;
}

.offer__description,
.offer__period {
  color: var(--color-text-muted);
  font-size: 12px;
}

.offer__description {
  line-height: 20px;
}

.offer__period {
  line-height: 18px;
}

.offer__badge {
  display: grid;
  grid-column: 1 / -1;
  place-items: center;
  min-height: 28px;
  margin-top: 8px;
  border-radius: 14px;
  background: var(--color-badge-bg);
  color: var(--color-badge-text);
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
}

/* ---------- Преимущества ---------- */
.features {
  display: grid;
  gap: 6px;
  margin-top: 12px;
  padding-inline: 10px;
}

.features__item {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--color-text-soft);
  font-size: 14px;
  line-height: 24px;
}

.features__item::before {
  content: "";
  flex: none;
  width: 12px;
  height: 12px;
  background: url("/icons/check.svg") center / contain no-repeat;
}

/* ---------- CTA ---------- */
.paywall__actions {
  margin-top: 16px;
  text-align: center;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 56px;
  border-radius: 18px;
  background: var(--color-accent);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  transition: background-color 0.15s ease, transform 0.1s ease;
}

.cta:active:not(:disabled) {
  background: var(--color-accent-active);
  transform: scale(0.99);
}

.cta:focus-visible,
.restore-link:focus-visible {
  outline: 3px solid var(--color-text);
  outline-offset: 2px;
}

.cta:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.paywall__note {
  margin-top: 9px;
  color: var(--color-text-muted);
  font-size: 12px;
  line-height: 20px;
}

.restore-link {
  min-height: 44px;
  padding-inline: 16px;
  color: var(--color-text-muted);
  font-size: 13px;
  line-height: 20px;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ---------- Loader ---------- */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #0000;
  border-right-color: color-mix(in srgb, var(--color-accent) 60%, transparent);
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  animation: loader 1s infinite linear;
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: inherit;
  animation: inherit;
  animation-duration: 2s;
}

.loader:after {
  animation-duration: 4s;
}

@keyframes loader {
  100% {
    transform: rotate(1turn)
  }
}
</style>
