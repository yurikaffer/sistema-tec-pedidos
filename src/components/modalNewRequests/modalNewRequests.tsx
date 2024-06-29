import { useClients } from "@/contexts/ClientsContext";
import { useProdutos } from "@/contexts/ProductsContext";
import { useProductsRequests } from "@/contexts/ProductsRequestsContext";
import { CreateProductRequestContextDto } from "@/dto/productRequestDto";
import { getAllClients } from "@/services/clienteServices";
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
    const { setClients, setClient, client } = useClients()
    const { setProductsRequests, productsRequests } = useProductsRequests()

    function clearForm() {
        setCodigo('');
        setDate(undefined);
        setClient(undefined);
        setProductsRequests([]);
    }

    useEffect(() => {
        fetchClients()
    }, []);

    async function fetchClients() {
        try {
            const clients = await getAllClients();
            setClients(clients);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    }

    const handleAddRequests = async () => {
        try {
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
        }
    };

    const onOpen = () => {
        clearForm()
        setIsOpen(!isOpen);
    }
    
    return (
        <div className="flex flex-col gap-2">
            <div className='p-4 ml-auto'>
                <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
                    + Novo Pedido
                </Button>
            </div>

            <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpen} size='5xl'>
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

function TitleTable() {
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

function SearchProductsInput() {
    const { produtos, setProduto } = useProdutos();

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