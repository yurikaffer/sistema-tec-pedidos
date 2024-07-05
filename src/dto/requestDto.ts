import { ClientDto } from "./clientDto";
import { ProductRequestDto } from "./productRequestDto";

export interface RequestDto {
    id: number;
    codigo: string;
    data: Date;
    cliente: ClientDto; 
    produtos: ProductRequestDto[];
    total: number;
    pago: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateRequestDto {
    codigo: string;
    data: Date;
    clienteId: number; 
    total: number;
    pago: string;
}