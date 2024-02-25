"use client";

import React from 'react'
import ProductCard from "@/components/ui/productCard";
import { Product } from '@/types';
import NoResults from './ui/noResults';
import { useSearchProvider } from '@/hooks/useSearch';

interface ProductListProps {
  items: Product[];
}

const filteredBooks: React.FC<ProductListProps> = ({ items }) => {
  const { inputValue } = useSearchProvider();

  // Verifica se inputValue é uma string vazia, nula ou indefinida
  if (!inputValue) {
    return null;
  }

  // Filtra os itens com base no inputValue
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="space-y-4 min-h-screen">
      <h3 className="font-bold text-3xl w-full text-center mt-20">Livros encontrados</h3>
      {filteredItems.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div key={item.id}>
            <ProductCard key={item.id} data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default filteredBooks;
