'use client'
import ProductsList from "@/components/specifics/productsList"

export default function Produtos() {
    return (
        <main className='flex flex-col items-center pt-10'>
            <div className='w-full h-full max-w-[95%] '>
                <ProductsList />
            </div>
        </main>
    )
}

