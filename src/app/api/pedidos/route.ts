import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    try {
        if (!page && !limit) {
            const response = await prisma.pedido.findMany()

            return new NextResponse(JSON.stringify(response), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await getPaginationData({ page, limit })

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Erro ao buscar pedidos' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { codigo, data, clienteId, total } = body;

        const pedido = await prisma.pedido.create({
            data: { codigo, data, clienteId, total }
        })

        return new NextResponse(JSON.stringify(pedido), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return NextResponse.json({ error: 'Erro no processamento da solicitação' }, { status: 500 });
    }
}

interface PaginationDataProps {
    page: number
    limit: number
}

async function getPaginationData({ limit, page }: PaginationDataProps) {
    const total = await prisma.pedido.count();
    const pedidos = await prisma.pedido.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    const response = {
        pedidos,
        total,
        page,
        limit,
    };

    return response
}
