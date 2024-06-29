import { useProdutos } from "@/contexts/ProductsContext";
import { useProductsRequests } from "@/contexts/ProductsRequestsContext";
import { ProductRequestDto } from "@/dto/productRequestDto";
import { getAllProducts } from "@/services/produtoServices";
import { DateValue } from "@internationalized/date";
import { Autocomplete, AutocompleteItem, Button, CircularProgress, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ModalNewClient } from "../modalNewClient/modalNewClient";
import SearchClientInput from "../searchInput/searchClientInput";

export function ModalNewRequests() {
    const [isOpen, setIsOpen] = useState(false);
    const [codigo, setCodigo] = useState('')
    const [date, setDate] = useState<DateValue>()

    const handleAddRequests = async () => {
        try {
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
        }
    };

    const onOpen = () => setIsOpen(true);

    return (
        <div className="flex flex-col gap-2">
            <div className='p-4 ml-auto'>
                <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
                    + Novo Pedido
                </Button>
            </div>

            <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen} size='5xl'>
                <ModalContent>
                    <ModalHeader className="flex font-bold text-[34px] pt-10 text-gray-800 dark:text-gray-200">
                        Cadastro de Pedido
                    </ModalHeader>
                    <ModalBody>

                        <div className='flex gap-4 items-center'>
                            <Input
                                type="text"
                                label="Código"
                                value={codigo}
                                className="max-w-[8rem]"
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <DateInput className="max-w-[8rem]" granularity="day" label="Data" value={date} onChange={setDate} />
                            <SearchClientInput />
                            <ModalNewClient />
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex gap-2 items-center">
                                <ProductsRequestTable />
                            </div>
                        </div>

                        <Button color='primary' onClick={handleAddRequests}>Adicionar Pedido</Button>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </div>
    );
}

function ProductsRequestTable() {
    const { productsRequests } = useProductsRequests()
    
    return (
        <Table
            aria-label="Produtos do pedido"
            topContent={<TitleTable />}
        >
            <TableHeader>
                <TableColumn>Código</TableColumn>
                <TableColumn>Quantidade</TableColumn>
                <TableColumn>Medida</TableColumn>
                <TableColumn>Descriminação</TableColumn>
                <TableColumn>Unidade</TableColumn>
                <TableColumn>Total</TableColumn>
                <TableColumn>Ações</TableColumn>
            </TableHeader>
            <TableBody items={[]} >
                {(item: ProductRequestDto) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.produto?.codigo}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>{item.produto?.medida}</TableCell>
                        <TableCell>{item.produto?.descriminacao}</TableCell>
                        <TableCell>{item.unidade}</TableCell>
                        <TableCell>{item.total}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

function TitleTable() {
    const [isOpen, setIsOpen] = useState(false);


    const [quantidade, setQuantidade] = useState('')
    const [unidade, setUnidade] = useState('')
    const [total, setTotal] = useState('')

    const { produto } = useProdutos();

    const { productsRequests, setProductsRequests, productRequest, setProductRequest } = useProductsRequests();

    const onOpen = () => setIsOpen(!isOpen);

    const handleAddRequests = () => {


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
                        <SearchProductsInput/>
                        <Input
                            type="number"
                            label="Quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            className='max-w-32'
                        />
                        <Input
                            type="number"
                            label="Unidade"
                            value={unidade}
                            onChange={(e) => setUnidade(e.target.value)}
                            className='max-w-32'
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={handleAddRequests}>Adicionar Pedido</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

function SearchProductsInput() {
    const { produtos, setProdutos, setProduto } = useProdutos();

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

    const onSelectionChange = (key: React.Key | null) => {
        const product = produtos?.find(product => product.id === Number(key));
        setProduto(product);
    };

    if (!produtos || !produtos.length) return <CircularProgress />

    return (
        <div className="w-full max-w-[15rem]">
            <Autocomplete
                label="Selecione o cliente"
                className="max-w-xs"
                onSelectionChange={onSelectionChange}
            >
                {produtos?.map((product) => (
                    <AutocompleteItem key={product.id} value={product.id}>
                        {product.descriminacao}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    )
}