import { ProductDto } from '@/dto/productDto';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ProdutosContextType {
  produtos: ProductDto[];
  produto: ProductDto | undefined;
  setProdutos: React.Dispatch<React.SetStateAction<ProductDto[]>>;
  setProduto: React.Dispatch<React.SetStateAction<ProductDto | undefined>>;
}

const ProdutosContext = createContext<ProdutosContextType | undefined>(undefined);

export const ProdutosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [produtos, setProdutos] = useState<ProductDto[]>([]);
  const [produto, setProduto] = useState<ProductDto>();

  return (
    <ProdutosContext.Provider value={{ produtos, setProdutos, produto, setProduto }}>
      {children}
    </ProdutosContext.Provider>
  );
};

export const useProdutos = () => {
  const context = useContext(ProdutosContext);
  if (context === undefined) {
    throw new Error('useProdutos must be used within a ProdutosProvider');
  }
  return context;
};
