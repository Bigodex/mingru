// lib/mongodb.ts
import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI as string
const dbName = process.env.MONGODB_DB || "mingruDB"

if (!uri) {
  throw new Error("⚠️ Defina a variável MONGODB_URI no arquivo .env")
}

const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Tipagem do cache global em dev para evitar múltiplas conexões por HMR
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

/** Retorna a conexão (promessa) do MongoClient */
export default clientPromise

/** Helper para obter a instância do banco já conectada */
export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db(dbName)
}
