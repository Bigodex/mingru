import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Product } from "@/lib/models";

// GET -> Listar todos os produtos
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mingruDB");
    const products = await db.collection<Product>("products").find().toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

// POST -> Criar novo produto
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("mingru");
    const body = await req.json();

    const newProduct: Product = {
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image,
    };

    const result = await db.collection<Product>("products").insertOne(newProduct);

    return NextResponse.json({ ...newProduct, _id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
