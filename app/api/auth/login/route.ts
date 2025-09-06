import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-trocar"

export async function POST(req: Request) {
  try {
    const client = await clientPromise
    const db = client.db("Mingru")
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Preencha todos os campos" }, { status: 400 })
    }

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, nome: user.nome },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    return NextResponse.json({ token, user: { id: user._id, nome: user.nome, email: user.email } })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
