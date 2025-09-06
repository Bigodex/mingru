import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mingru");
    const collections = await db.listCollections().toArray();

    return NextResponse.json({ ok: true, collections });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "An unknown error occurred" });
  }
}
