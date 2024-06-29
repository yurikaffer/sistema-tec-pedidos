'use client'
import RequestsList from '@/components/requestsList/requestsList';
import { ClientsProvider } from '@/contexts/ClientsContext';
import { ProdutosProvider } from '@/contexts/ProductsContext';
import { ProductsRequestsProvider } from '@/contexts/ProductsRequestsContext';

export default function Pedidos() {
    return (
        <main className='flex flex-col items-center pt-10'>
            <div className='w-full h-full max-w-[95%] '>
                <ProdutosProvider>
                    <ClientsProvider>
                        <ProductsRequestsProvider>
                            <RequestsList />
                        </ProductsRequestsProvider>
                    </ClientsProvider>
                </ProdutosProvider>
            </div>
        </main>
    )
}

