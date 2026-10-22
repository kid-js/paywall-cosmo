import { createClient, type Client } from '@libsql/client/web'

let client: Client | undefined
let schemaReady: Promise<void> | undefined

function getClient(): Client {
  if (client) return client

  const config = useRuntimeConfig()
  if (!config.databaseUrl) {
    throw new Error('База данных не настроена: задайте переменную окружения NUXT_DATABASE_URL')
  }

  client = createClient({ url: config.databaseUrl, authToken: config.databaseAuthToken || undefined })
  return client
}

// Возвращает клиент БД и один раз за жизнь процесса создаёт таблицу, если её ещё нет
export async function getDb(): Promise<Client> {
  const db = getClient()

  schemaReady ??= db
    .execute(`
      CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        offer_id TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `)
    .then(() => undefined)
    .catch((error) => {
      // Сбрасываем, чтобы следующий запрос попробовал ещё раз
      schemaReady = undefined
      throw error
    })

  await schemaReady
  return db
}
