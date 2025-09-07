// app/api/ping/route.ts
import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export const runtime = "nodejs" // evita Edge (driver do Mongo requer Node)

export async function GET() {
  try {
    const db = await getDb()
    // opcional: consulta mínima
    const collections = await db.listCollections().toArray()
    return NextResponse.json({ ok: true, db: db.databaseName, collections: collections.map(c => c.name) })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ ok: false, error: e?.message ?? "Erro desconhecido" }, { status: 500 })
  }
}
