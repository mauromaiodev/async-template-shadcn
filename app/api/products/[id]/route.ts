import { NextRequest, NextResponse } from "next/server";
import { Product, UpdateProductData } from "@/types/product";
import { products } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.id === params.id);
  
  if (!product) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data: UpdateProductData = await request.json();
    const productIndex = products.findIndex((p) => p.id === params.id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }
    
    products[productIndex] = {
      ...products[productIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(products[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar produto" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productIndex = products.findIndex((p) => p.id === params.id);
  
  if (productIndex === -1) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }
  
  products.splice(productIndex, 1);
  
  return NextResponse.json({ message: "Produto deletado com sucesso" });
}