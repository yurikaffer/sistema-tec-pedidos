export interface ClientDto {
    id: number;
    codigo: string;
    nome: string;
    email: string;
    inscricaoEstadual: number;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: number;
    cnpjOuCPF: number;
    telefone: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateClientDto {
    codigo: string;
    nome: string;
    email: string;
    inscricaoEstadual: number;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: number;
    cnpjOuCPF: number;
    telefone: number;
}

