import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db("mingruDB")
  const products = await db.collection("products").find().toArray()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const client = await clientPromise
  const db = client.db("mingruDB")

  try {
    const data = await req.json()

    if (Array.isArray(data)) {
      // Se for um array → insere vários produtos
      const result = await db.collection("products").insertMany(
        data.map((item) => ({ ...item, createdAt: new Date() }))
      )
      return NextResponse.json({
        success: true,
        insertedCount: result.insertedCount,
        ids: result.insertedIds,
      })
    } else {
      // Se for objeto único → insere só 1
      const result = await db.collection("products").insertOne({
        ...data,
        createdAt: new Date(),
      })
      return NextResponse.json({
        success: true,
        id: result.insertedId,
      })
    }
  } catch (error) {
    console.error("Erro ao inserir produto(s):", error)
    return NextResponse.json({ success: false, error: "Erro ao inserir produto(s)" }, { status: 500 })
  }
}
