import { CreateProductRequestContextDto } from '@/dto/productRequestDto';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ProductsRequestsContextType {
  productsRequests: CreateProductRequestContextDto[];
  productRequest: CreateProductRequestContextDto | undefined;
  setProductsRequests: React.Dispatch<React.SetStateAction<CreateProductRequestContextDto[]>>;
  setProductRequest: React.Dispatch<React.SetStateAction<CreateProductRequestContextDto | undefined>>;
}

const ProductsRequestsContext = createContext<ProductsRequestsContextType | undefined>(undefined);

export const ProductsRequestsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productsRequests, setProductsRequests] = useState<CreateProductRequestContextDto[]>([]);
  const [productRequest, setProductRequest] = useState<CreateProductRequestContextDto>();

  return (
    <ProductsRequestsContext.Provider value={{ productsRequests, setProductsRequests, productRequest, setProductRequest }}>
      {children}
    </ProductsRequestsContext.Provider>
  );
};

export const useProductsRequests = () => {
  const context = useContext(ProductsRequestsContext);
  if (context === undefined) {
    throw new Error('useProductsRequests must be used within a ProductsRequestsProvider');
  }
  return context;
};
