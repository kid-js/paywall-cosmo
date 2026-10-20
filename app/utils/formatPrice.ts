/** Форматирование цены: 2990 → 2 990 ₽ */
export function formatPrice(value: number, currency = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}
