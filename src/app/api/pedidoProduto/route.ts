import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

//export async function GET(req: NextRequest) {
//    const { searchParams } = new URL(req.url);
//    const page = parseInt(searchParams.get('page') || '1', 10);
//    const limit = parseInt(searchParams.get('limit') || '10', 10);
//
//    try {
//        if (!page && !limit) {
//            const response = await prisma.pedido.findMany()
//
//            return new NextResponse(JSON.stringify(response), {
//                status: 200,
//                headers: { 'Content-Type': 'application/json' },
//            });
//        }
//
//        const response = await getPaginationData({page, limit})
//
//        return new NextResponse(JSON.stringify(response), {
//            status: 200,
//            headers: { 'Content-Type': 'application/json' },
//        });
//    } catch (error) {
//        return new NextResponse(
//            JSON.stringify({ error: 'Erro ao buscar pedidos' }),
//            { status: 500, headers: { 'Content-Type': 'application/json' } }
//        );
//    }
//}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { pedidoId, quantidade, produtoId, unidade, total } = body;

        const productReq = await prisma.produtoPedido.create({
            data: { pedidoId, quantidade, produtoId, unidade, total }
        })

        return new NextResponse(JSON.stringify(productReq), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return NextResponse.json({ error: 'Erro no processamento da solicitação' }, { status: 500 });
    }
}
