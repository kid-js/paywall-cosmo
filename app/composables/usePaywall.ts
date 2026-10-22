// Пока пользователь всегда один и тот же
const USER_ID = 155

export function usePaywall() {
  const { data: offers, status } = useFetch<Offer[]>('/api/offers', {
    default: () => [],
  })

  const purchase = ref<PurchaseResponse | null>(null)
  const chosenOfferId = ref<string | null>(null)
  const purchaseError = ref<string | null>(null)
  const isPurchasing = ref(false)

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

  async function buy() {
    if (!selectedOffer.value || isPurchasing.value) {
      return
    }

    isPurchasing.value = true
    purchaseError.value = null

    try {
      purchase.value = await $fetch<PurchaseResponse>('/api/purchase', {
        method: 'POST',
        body: {
          userId: USER_ID,
          offerId: selectedOffer.value.id,
        } satisfies PurchaseRequest,
      })
    }
    catch (error) {
      console.error(error)
      purchaseError.value = 'Не удалось оформить покупку. Попробуйте ещё раз'
    }
    finally {
      isPurchasing.value = false
    }
  }

  return {
    offers,
    isLoading,
    selectedOffer,
    selectedOfferId,
    purchaseError,
    isPurchasing,
    purchase,
    buy,
  }
}
