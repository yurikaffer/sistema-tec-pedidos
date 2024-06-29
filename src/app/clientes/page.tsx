'use client'
import ClientList from '@/components/clientsList/clientsList';

export default function Produtos() {
    return (
        <main className='flex flex-col items-center pt-10'>
            <div className='w-full h-full max-w-[95%] '>
                <ClientList />
            </div>
        </main>
    )
}

