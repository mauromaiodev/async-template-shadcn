import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  price: z.number().min(0.01, "Preço deve ser maior que 0"),
  category: z.string().min(1, "Categoria é obrigatória"),
  inStock: z.boolean(),
  tags: z.array(z.string()).min(1, "Selecione pelo menos uma tag"),
  rating: z.number().min(1).max(5, "Avaliação deve ser entre 1 e 5"),
  releaseDate: z.string().min(1, "Data de lançamento é obrigatória"),
  color: z.string().min(1, "Cor é obrigatória"),
  size: z.string().min(1, "Tamanho é obrigatório"),
  weight: z.number().min(0.01, "Peso deve ser maior que 0"),
  isFragile: z.boolean(),
  priority: z.string().min(1, "Prioridade é obrigatória"),
  supplier: z.string().min(1, "Fornecedor é obrigatório"),
  notes: z.string().optional(),
  images: z.array(z.string()).optional(),
  discount: z.number().min(0).max(100, "Desconto deve ser entre 0 e 100"),
  featured: z.boolean(),
  status: z.string().min(1, "Status é obrigatório"),
});

export type ProductFormData = z.infer<typeof productSchema>;