
import { CreateRequestDto, RequestDto } from "@/dto/requestDto";
import axios from "axios";

export const getAllRequests = async (): Promise<RequestDto[]> => {
    const res = await axios.get('/api/pedidos')
    return res.data as RequestDto[];
}

export const createRequests = async (data: CreateRequestDto): Promise<CreateRequestDto> => {
    const res = await axios.post('/api/pedidos', data);
    return res.data;
};