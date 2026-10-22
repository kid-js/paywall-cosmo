export default defineEventHandler(async (event): Promise<PurchaseResponse> => {
  const body = await readBody<Partial<PurchaseRequest> | undefined>(event)
  const offerId = body?.offerId
  const userId = body?.userId

  if (typeof offerId !== 'string' || !OFFERS.some((offer) => offer.id === offerId)) {
    throw createError({ statusCode: 400, statusMessage: 'Неизвестный тариф' })
  }

  if (typeof userId !== 'number' || !Number.isInteger(userId) || userId < 1) {
    throw createError({ statusCode: 400, statusMessage: 'Некорректный userId' })
  }

  const createdAt = new Date().toISOString()

  try {
    const db = await getDb()

    const result = await db.execute({
      sql: 'INSERT INTO purchases (user_id, offer_id, created_at) VALUES (?, ?, ?)',
      args: [userId, offerId, createdAt],
    })

    return { purchaseId: Number(result.lastInsertRowid), userId, offerId, createdAt }
  }
  catch (error) {
    console.error('Не удалось сохранить покупку', error)
    throw createError({ statusCode: 500, statusMessage: 'Не удалось сохранить покупку' })
  }
})
