import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const client = await clientPromise
    const db = client.db("Mingru")
    const body = await req.json()

    const { nome, email, password } = body

    // validações simples
    if (!nome || !email || !password) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    // checa se já existe usuário
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 })
    }

    // hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      nome,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    }

    const result = await db.collection("users").insertOne(newUser)

    return NextResponse.json({ _id: result.insertedId, nome, email })
  } catch (error) {
    console.error("Erro no cadastro:", error)
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}
