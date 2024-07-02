'use client'
import { ClientsProvider } from "@/contexts/ClientsContext"
import { ProdutosProvider } from "@/contexts/ProductsContext"
import { ProductsRequestsProvider } from "@/contexts/ProductsRequestsContext"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark' themes={['ligth', 'dark']} >
          <ProdutosProvider>
            <ClientsProvider>
              <ProductsRequestsProvider>
                {children}
              </ProductsRequestsProvider>
            </ClientsProvider>
          </ProdutosProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}