import { CreateProductData, Product, UpdateProductData } from "@/types/product";

const API_BASE = "/api";

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return response.json();
  },

  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar produto");
    return response.json();
  },

  create: async (data: CreateProductData): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar produto");
    return response.json();
  },

  update: async (data: UpdateProductData): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar produto");
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar produto");
  },
};