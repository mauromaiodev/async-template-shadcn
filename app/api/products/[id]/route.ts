import { NextRequest, NextResponse } from "next/server";
import { Product, UpdateProductData } from "@/types/product";

// Simulação de banco de dados em memória
let products: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description: "Smartphone moderno com excelente desempenho e câmera de alta qualidade",
    price: 999.99,
    category: "Eletrônicos",
    inStock: true,
    tags: ["Novo", "Premium"],
    rating: 4,
    releaseDate: new Date().toISOString(),
    color: "black",
    size: "M",
    weight: 0.2,
    isFragile: true,
    priority: "high",
    supplier: "Fornecedor A",
    notes: "Produto de alta qualidade",
    images: ["https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"],
    discount: 10,
    featured: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Notebook Pro",
    description: "Notebook profissional para desenvolvimento e design",
    price: 2499.99,
    category: "Computadores",
    inStock: false,
    tags: ["Bestseller", "Profissional"],
    rating: 5,
    releaseDate: new Date().toISOString(),
    color: "gray",
    size: "G",
    weight: 2.5,
    isFragile: true,
    priority: "medium",
    supplier: "Fornecedor B",
    notes: "Ideal para profissionais",
    images: ["https://images.pexels.com/photos/18105/pexels-photo.jpg"],
    discount: 0,
    featured: false,
    status: "inactive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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