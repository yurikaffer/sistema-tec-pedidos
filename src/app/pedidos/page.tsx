'use client'
import RequestsList from '@/components/specifics/requestsList';

export default function Pedidos() {
    return (
        <main className='flex flex-col items-center pt-10'>
            <div className='w-full h-full max-w-[95%] '>
                <RequestsList />
            </div>
        </main>
    )
}

