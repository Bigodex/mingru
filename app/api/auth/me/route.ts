import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-trocar"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return NextResponse.json({ user: decoded })
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 })
  }
}
