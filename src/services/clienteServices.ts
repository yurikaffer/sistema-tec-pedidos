
import { ClientDto, CreateClientDto } from "@/dto/clientDto";
import axios from "axios";

export const getAllClients = async (): Promise<ClientDto[]> => {
    const res = await axios.get('/api/clientes')
    return res.data.clientes as ClientDto[];
}

export const createClient = async (data: CreateClientDto ): Promise<ClientDto> => {
    const res = await axios.post('/api/clientes', data);
    return res.data;
  };