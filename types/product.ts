export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
  rating: number;
  releaseDate: string;
  color: string;
  size: string;
  weight: number;
  isFragile: boolean;
  priority: string;
  supplier: string;
  notes: string;
  images: string[];
  discount: number;
  featured: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
  rating: number;
  releaseDate: string;
  color: string;
  size: string;
  weight: number;
  isFragile: boolean;
  priority: string;
  supplier: string;
  notes: string;
  images: string[];
  discount: number;
  featured: boolean;
  status: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}