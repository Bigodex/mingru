import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mingruDB");
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      message: "✅ Conexão com MongoDB funcionando!",
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    console.error("Erro de conexão:", error);
    return NextResponse.json(
      { message: "❌ Erro ao conectar no banco", error },
      { status: 500 }
    );
  }
}
