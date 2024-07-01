
import { CreateProductRequestDto, ProductRequestDto } from "@/dto/productRequestDto";
import axios from "axios";

//export const getAllRequests = async (): Promise<RequestDto[]> => {
//    const res = await axios.get('/api/pedidos')
//    return res.data as RequestDto[];
//}

export const createProductRequest = async (data: CreateProductRequestDto): Promise<ProductRequestDto> => {
    const res = await axios.post('/api/pedidoProduto', data);
    return res.data;
};