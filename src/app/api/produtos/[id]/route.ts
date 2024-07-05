import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);
        const body = await req.json();
        const { codigo, descriminacao, medida } = body;

        const updatedProduto = await prisma.produto.update({
            where: { id },
            data: { codigo, descriminacao, medida }
        });

        return new NextResponse(JSON.stringify(updatedProduto), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);

        const deletedProduct = await prisma.produto.delete({
            where: { id },
        });

        if (!deletedProduct) {
            return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        return NextResponse.json(
            { error: 'Erro ao deletar produto' },
            { status: 500 }
        );
    }
}