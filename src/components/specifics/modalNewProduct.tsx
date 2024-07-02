import { ProductDto } from '@/dto/productDto';
import { createProduct, getAllProducts } from '@/services/produtoServices';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

import { useEffect, useState } from 'react';

//REFATORAR ESSE COMPONENTE
//REFATORAR ESSE COMPONENTE
//REFATORAR ESSE COMPONENTE
//REFATORAR ESSE COMPONENTE

export function ModalNewProduct() {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<ProductDto[]>([])
    const [codigo, setCodigo] = useState('')
    const [descriminacao, setDescriminacao] = useState('')
    const [medida, setMedida] = useState('')

    function clearForm() {
        setCodigo('')
        setDescriminacao('')
        setMedida('')
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts()
            setProducts(response);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error)
        }
    };

    const handleAddProduct = async () => { //DEPOIS QUE CRIA UM NOVO PRODUTO, NÃO TA LIMPANDO OS CAMPOS NEM FECHANDO A MODAL.
        try {
            const newProduct = { codigo, descriminacao, medida}
            const response = await createProduct(newProduct)
            setProducts([...products, response])
            clearForm();
            setIsOpen(false)
        } catch (error) {
            console.error('Erro ao adicionar produto:', error)
        }
    };

    const onOpen = () => setIsOpen(true);

    return (
        <div className="flex flex-col gap-2">
            <div className='p-4 ml-auto'>
                <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
                    + Novo Produto
                </Button>
            </div>

            <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen} >
                <ModalContent>
                    <ModalHeader className="flex self-center font-bold text-[34px] pt-10 text-gray-800 dark:text-gray-200">
                        Cadastro de Produto
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            placeholder="Código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Descriminação"
                            value={descriminacao}
                            onChange={(e) => setDescriminacao(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Medidas"
                            value={medida}
                            onChange={(e) => setMedida(e.target.value)}
                        />
                        <Button color='primary' onClick={handleAddProduct}>Adicionar Produto</Button>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </div>
    );
}