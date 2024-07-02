import { useProdutos } from "@/contexts/ProductsContext";
import { useProductsRequests } from "@/contexts/ProductsRequestsContext";
import { CreateProductRequestContextDto } from "@/dto/productRequestDto";
import { getAllProducts } from "@/services/produtoServices";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SearchProductsInput from "../ui/searchProductsInput";


export default function ProductsRequestTable() {
    const { productsRequests } = useProductsRequests()

    return (
        <Table
            aria-label="Produtos do pedido"
            topContent={<HeaderProductsRequestTable />}
        >
            <TableHeader>
                <TableColumn>Código</TableColumn>
                <TableColumn>Quantidade</TableColumn>
                <TableColumn>Medida</TableColumn>
                <TableColumn>Descriminação</TableColumn>
                <TableColumn>Unidade R$</TableColumn>
                <TableColumn>Total R$</TableColumn>
                <TableColumn>Ações</TableColumn>
            </TableHeader>
            <TableBody items={productsRequests ?? []} >
                {(item: CreateProductRequestContextDto) => (
                    <TableRow key={item.produto?.id}>
                        <TableCell>{item.produto?.codigo}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>{item.produto?.medida}</TableCell>
                        <TableCell>{item.produto?.descriminacao}</TableCell>
                        <TableCell>{item.unidade}</TableCell>
                        <TableCell>{item.total}</TableCell>
                        <TableCell>Teste</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

function HeaderProductsRequestTable() {
    const [isOpen, setIsOpen] = useState(false);
    const [quantidade, setQuantidade] = useState(0)
    const [unidade, setUnidade] = useState(0)

    const { productsRequests, setProductsRequests } = useProductsRequests();
    const { produto, setProdutos, setProduto } = useProdutos();

    function clearForm() {
        setUnidade(0);
        setQuantidade(0);
        setProduto(undefined);
    }

    const onOpen = () => setIsOpen(!isOpen);
    const handleAddRequests = () => {
        const total = quantidade * unidade;

        const newProductRequest = {
            quantidade,
            produto,
            unidade,
            total
        }

        setProductsRequests([...productsRequests, newProductRequest])
        clearForm()
        onOpen()
    }

    useEffect(() => {
        fetchProduct()
    }, []);

    async function fetchProduct() {
        try {
            const products = await getAllProducts();
            setProdutos(products);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-[22px] font-semibold'>Produtos Cadastrados</h1>
            <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
                + Adicionar Produto
            </Button>

            <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpen} size='3xl'>
                <ModalContent >
                    <ModalHeader className="flex font-bold text-[20px] pt-10 text-gray-800 dark:text-gray-200">
                        Adicionar Produto
                    </ModalHeader>
                    <ModalBody className="flex flex-row gap-4">
                        <SearchProductsInput />
                        <Input
                            type="number"
                            label="Quantidade"
                            value={String(quantidade)}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            className='max-w-32'
                        />
                        <Input
                            type="number"
                            label="Unidade"
                            value={String(unidade)}
                            onChange={(e) => setUnidade(Number(e.target.value))}
                            className='max-w-32'
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={handleAddRequests}>Adicionar Produto</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}