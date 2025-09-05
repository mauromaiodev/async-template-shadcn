"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/forms/product-form";
import { ProductList } from "@/components/product-list";
import { productApi } from "@/lib/api";
import { Product } from "@/types/product";
import { ProductFormData } from "@/lib/validations/product";
import { Plus, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDialogOpen(false);
      toast({
        title: "Produto criado",
        description: "O produto foi criado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o produto.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: productApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      setIsDialogOpen(false);
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o produto.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateMutation.mutate({ ...data, id: editingProduct.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Gerenciamento de Produtos
                </h1>
                <p className="text-gray-600">
                  Template completo com CRUD, formulários e validação
                </p>
              </div>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingProduct(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Editar" : "Novo"} Produto
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct 
                      ? "Atualize as informações do produto abaixo."
                      : "Preencha as informações do novo produto abaixo."
                    }
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  product={editingProduct || undefined}
                  onSubmit={handleSubmit}
                  isLoading={createMutation.isPending || updateMutation.isPending}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Lista de Produtos
          </h2>
          <p className="text-gray-600">
            Gerencie seus produtos cadastrados
          </p>
        </div>
        
        <ProductList onEditProduct={handleEditProduct} />
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Template criado com Next.js, TanStack Query, React Hook Form, Zod e shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}