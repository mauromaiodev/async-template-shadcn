import { products } from "@/lib/data";
import { CreateProductData, Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateProductData = await request.json();

    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 400 }
    );
  }
}
