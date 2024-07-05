import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const pedidoSchema = z.object({
    codigo: z.string(),
    data: z.string().transform(str => new Date(str)),
    clienteId: z.number(),
    total: z.number(),
});

type PedidoInput = z.infer<typeof pedidoSchema>;

async function getPaginatedPedidos(page: number, limit: number) {
    const [pedidos, total] = await Promise.all([
        prisma.pedido.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                cliente: true,
                produtos: { include: { produto: true } },
            },
        }),
        prisma.pedido.count(),
    ]);

    return { pedidos, total, page, limit };
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    try {
        const response = await getPaginatedPedidos(page, limit);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const pedidoData: PedidoInput = pedidoSchema.parse(body);

        const pedido = await prisma.pedido.create({ 
            data: {
                codigo: pedidoData.codigo,
                data: pedidoData.data,
                clienteId: pedidoData.clienteId,
                total: pedidoData.total,
            } 
        });
        return NextResponse.json(pedido, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 });
        }
        console.error('Erro ao criar pedido:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
