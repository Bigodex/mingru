import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(); // ✅ sem authOptions
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("mingruDB");

  const profile = await db.collection("profiles").findOne({
    email: session.user.email,
  });

  return NextResponse.json(profile || {});
}

export async function POST(req: Request) {
  const session = await getServerSession(); // ✅ sem authOptions
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const data = await req.json();

  const client = await clientPromise;
  const db = client.db("mingruDB");

  // salva ou atualiza (upsert)
  await db.collection("profiles").updateOne(
    { email: session.user.email },
    { $set: { ...data, email: session.user.email } },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
