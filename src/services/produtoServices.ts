
import { CreateProductDto, ProductDto } from "@/dto/productDto";
import axios from "axios";

export const getAllProducts = async (): Promise<ProductDto[]> => {
    const res = await axios.get('/api/produtos')
    console.log('res.data: ', res.data)
    return res.data.produtos as ProductDto[];
}

export const createProduct = async (data: CreateProductDto ): Promise<ProductDto> => {
    const res = await axios.post('/api/produtos', data);
    return res.data;
  };