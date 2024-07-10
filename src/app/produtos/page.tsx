'use client'
import { ModalProduct, ModalProductProps } from "@/components/specifics/modalProduct";
import GenericTable from "@/components/ui/GenericList";
import { useProdutos } from "@/contexts/ProductsContext";
import { deleteProduct } from "@/services/produtoServices";

//export default function Produtos() {
//    return (
//        <main className='flex flex-col items-center pt-10'>
//            <div className='w-full h-full max-w-[95%] '>
//                <ProductsList />
//            </div>
//        </main>
//    )
//}

export default function Produtos() {
    const { produtos, setProdutos } = useProdutos();

    const renderModalComponent = (props: ModalProductProps) => (
        <ModalProduct {...props} />
    );

    const columns = [
        { key: 'codigo', label: 'Código' },
        { key: 'descriminacao', label: 'Discriminação' },
        { key: 'medida', label: 'Medidas' },
        { key: 'actions', label: 'Ações' },
    ];

    return (
        <main className='flex flex-col items-center pt-10'>
            <div className='w-full h-full max-w-[95%] '>
                <GenericTable
                    dataName="produtos"
                    endpoint="/produtos"
                    itemsTitle="Produtos"
                    itemName="Produto"
                    items={produtos}
                    setItens={setProdutos}
                    columns={columns}
                    ModalComponent={renderModalComponent}
                    deleteItem={deleteProduct}
                 />
            </div>
        </main>
    )
}