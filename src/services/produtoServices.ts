import { CreateProductDto, ProductDto } from "@/dto/productDto";
import axios from "axios";

export const getAllProducts = async (): Promise<ProductDto[]> => {
    const res = await axios.get('/api/produtos')
    console.log('res.data: ', res.data)
    return res.data.produtos as ProductDto[];
}

export const createProduct = async (data: CreateProductDto): Promise<ProductDto> => {
    const res = await axios.post('/api/produtos', data);
    return res.data;
};

export const updateProduct = async (id: number, data: CreateProductDto): Promise<ProductDto> => {
    const res = await axios.put(`/api/produtos/${id}`, data);
    return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`/api/produtos/${id}`);
};