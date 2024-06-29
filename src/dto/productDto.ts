export interface ProductDto {
    id: number;
    codigo: string;
    descriminacao: string;
    medida: string;
    created_at: Date;
    updated_at: Date;
}

export type CreateProductDto = {
    codigo: string;
    descriminacao: string;
    medida: string;
}
