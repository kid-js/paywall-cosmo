// Mock-данные, пока нет бэка
const OFFERS: Offer[] = [
  {
    id: 'yearly',
    title: 'На год',
    description: 'Бесплатно 7 дней',
    price: 2490,
    currency: 'RUB',
    periodLabel: 'в год',
    badge: 'Выгоднее на 58%',
    ctaLabel: 'Попробовать бесплатно',
    footnote: '7 дней бесплатно, отмена в любой момент',
    isDefault: true,
  },
  {
    id: 'monthly',
    title: 'На месяц',
    description: 'Оплата каждый месяц',
    price: 499,
    currency: 'RUB',
    periodLabel: 'в месяц',
    ctaLabel: 'Подписаться',
    footnote: 'Отмена в любой момент',
  },
]

// Имитация запроса. Позже заменится на запрос к GET /api/offers
async function fetchOffers(): Promise<Offer[]> {
  await new Promise((resolve) => setTimeout(resolve, 665))
  return OFFERS
}

export function usePaywall() {
  const { data: offers, status } = useAsyncData('offers', fetchOffers, {
    server: false,
    default: () => [],
  })

  const chosenOfferId = ref<string | null>(null)

  const isLoading = computed(() => status.value === 'idle' || status.value === 'pending')

  const selectedOffer = computed(() => {
    return offers.value.find((offer) => offer.id === chosenOfferId.value)
      ?? offers.value.find((offer) => offer.isDefault)
      ?? offers.value[0]
  })

  // Записываемый computed, чтобы работал v-model на radio-инпутах
  const selectedOfferId = computed({
    get: () => selectedOffer.value?.id ?? null,
    set: (id) => chosenOfferId.value = id,
  })

  return {
    selectedOfferId,
    selectedOffer,
    isLoading,
    offers,
  }
}
