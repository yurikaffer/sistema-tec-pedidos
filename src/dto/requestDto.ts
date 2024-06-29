import { ClientDto } from "./clientDto";
import { ProductRequestDto } from "./productRequestDto";

export interface RequestDto {
    id: number;
    codigo: string;
    dataEmissao: Date;
    cliente: ClientDto; 
    produtos: ProductRequestDto[];
    total: number
    created_at: Date;
    updated_at: Date;
}

export interface CreateRequestDto {
    codigo: string;
    dataEmissao: Date;
    cliente: ClientDto; 
    produtos: ProductRequestDto[];
}
