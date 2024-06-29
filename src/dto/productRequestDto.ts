import { ProductDto } from "./productDto";
import { RequestDto } from "./requestDto";

export interface ProductRequestDto {
    id: number;
    pedido?: RequestDto;
    quantidade: number;
    produto?: ProductDto;
    unidade: number;
    total: number; 
    created_at: Date;
    updated_at: Date;
}

export interface CreateProductRequestDto {
    pedido?: RequestDto;
    quantidade: number;
    produto?: ProductDto;
    unidade: number;
    total: number; 
}

export interface CreateProductRequestContextDto {
    quantidade: number;
    produto?: ProductDto;
    unidade: number;
    total: number; 
}