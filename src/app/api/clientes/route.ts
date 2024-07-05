import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface PaginationDataProps {
  page: number;
  limit: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

async function getPaginationData({ limit, page }: PaginationDataProps) {
  const total = await prisma.cliente.count();
  const clientes = await prisma.cliente.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return { clientes, total, page, limit };
}

function createErrorResponse(message: string, status = 500) {
  return new NextResponse(
    JSON.stringify({ error: message }),
    { status, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);
  const limit = parseInt(searchParams.get('limit') || `${DEFAULT_LIMIT}`, 10);

  try {
    if (isNaN(page) || isNaN(limit)) {
      const response = await prisma.cliente.findMany();
      return new NextResponse(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await getPaginationData({ page, limit });
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return createErrorResponse('Erro ao buscar clientes');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newClient = {
      codigo: body.codigo,
      nome: body.nome,
      email: body.email,
      inscricaoEstadual: body.inscricaoEstadual,
      endereco: body.endereco,
      bairro: body.bairro,
      cidade: body.cidade,
      uf: body.uf,
      cep: body.cep,
      cnpjOuCPF: body.cnpjOuCPF,
      telefone: body.telefone,
    };

    const cliente = await prisma.cliente.create({ data: newClient });
    return new NextResponse(JSON.stringify(cliente), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return createErrorResponse('Erro no processamento da solicitação');
  }
}
