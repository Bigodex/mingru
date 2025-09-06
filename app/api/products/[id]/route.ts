import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { Product as BaseProduct } from "@/lib/models";

type Product = BaseProduct & { _id: string | ObjectId };

// GET -> Buscar produto por ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("mingru");
    const product = await db.collection<Product>("products").findOne({ id: typeof params.id === "string" ? new ObjectId(params.id) : params.id });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

// PUT -> Atualizar produto
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("mingru");
    const body = await req.json();

    const updated = await db.collection<Product>("products").updateOne(
      { id: new ObjectId(params.id) },
      { $set: body }
    );

    if (updated.matchedCount === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

// DELETE -> Excluir produto
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("mingru");

    const deleted = await db.collection<Product>("products").deleteOne({ id: new ObjectId(params.id) });

    if (deleted.deletedCount === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar produto" }, { status: 500 });
  }
}
