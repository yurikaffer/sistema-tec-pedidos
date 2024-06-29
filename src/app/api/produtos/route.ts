import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  try {
    if (!page && !limit) {
      const response = await prisma.produto.findMany()

      return new NextResponse(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
      });
  }

    const response = await getPaginationData({page, limit})

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao buscar produtos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { codigo, descriminacao, medida } = body;

    //if (!nome || !peso_un || !preco_un) {
    //  return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    //}

    const produto = await prisma.produto.create({
      data: { codigo, descriminacao, medida }
    })

    return new NextResponse(JSON.stringify(produto), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no processamento da solicitação' }, { status: 500 });
  }
}

interface PaginationDataProps {
  page: number
  limit: number
}

async function getPaginationData({limit, page}: PaginationDataProps) {
  const total = await prisma.produto.count();
  const produtos = await prisma.produto.findMany({
      skip: (page - 1) * limit,
      take: limit,
  });

  const response = {
      produtos,
      total,
      page,
      limit,
  };

  return response
}
