import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);
  const limit = parseInt(searchParams.get('limit') || `${DEFAULT_LIMIT}`, 10);
  const searchTerm = searchParams.get('searchTerm') || '';

  try {
    const { produtos, total } = await getProdutos({ page, limit, searchTerm });
    return NextResponse.json({ produtos, total, page, limit }, { status: 200 });
  } catch (error) {
    return createErrorResponse('Erro ao buscar produtos', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { codigo, descriminacao, medida } = await req.json();

    const produtoExistente = await prisma.produto.findUnique({ where: { codigo } });
    if (produtoExistente) {
      return createErrorResponse('Produto já cadastrado', 400);
    }

    const produto = await prisma.produto.create({ data: { codigo, descriminacao, medida } });
    return NextResponse.json(produto, { status: 201 });
  } catch (error) {
    return createErrorResponse('Erro no processamento da solicitação', 500);
  }
}

interface PaginationProps {
  page: number;
  limit: number;
  searchTerm?: string;
}

async function getProdutos({ page, limit, searchTerm }: PaginationProps) {
  if (searchTerm) {
    const produtos = await prisma.produto.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          { codigo: { contains: searchTerm } },
          { descriminacao: { contains: searchTerm } },
          { medida: { contains: searchTerm } },
        ],
      },
    });
    return { produtos, total: produtos.length };
  }

  const total = await prisma.produto.count();
  const produtos = await prisma.produto.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return { produtos, total };
}

function createErrorResponse(message: string, status: number) {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
