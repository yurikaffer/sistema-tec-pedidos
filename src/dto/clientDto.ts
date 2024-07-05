export interface ClientDto {
    id: number;
    codigo: string;
    nome: string;
    email: string;
    inscricaoEstadual: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    cnpjOuCPF: string;
    telefone: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateClientDto {
    codigo: string;
    nome: string;
    email: string;
    inscricaoEstadual: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    cnpjOuCPF: string;
    telefone: string;
}

