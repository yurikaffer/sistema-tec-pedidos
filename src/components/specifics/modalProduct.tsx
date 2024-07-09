import { useProdutos } from '@/contexts/ProductsContext';
import { ProductDto } from '@/dto/productDto';
import { createProduct, updateProduct } from '@/services/produtoServices';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const productSchema = z.object({
    codigo: z.string().min(1, 'O código é obrigatório'),
    descriminacao: z.string().min(1, 'A descriminação é obrigatória'),
    medida: z.string().min(1, 'A medida é obrigatória'),
});

type FormSchema = z.infer<typeof productSchema>;

export interface ModalProductProps {
    product?: ProductDto;
    isOpen: boolean;
    onClose: () => void;
}

export function ModalProduct({ product, isOpen, onClose }: ModalProductProps) {
    const { produtos, setProdutos } = useProdutos();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        setValue,
        setError,
    } = useForm<FormSchema>({
        resolver: zodResolver(productSchema),
    });

    useEffect(() => {
        if (product) {
            console.log('product', product);
            setValue('codigo', product.codigo);
            setValue('descriminacao', product.descriminacao);
            setValue('medida', product.medida);
        } else {
            reset();
        }
    }, [product, reset, setValue]);

    const onSubmit = async (data: FormSchema) => {
        try {
            if (product) {
                const updatedProduct = await updateProduct(product.id, data);
                setProdutos(produtos.map(p => p.id === product.id ? updatedProduct : p)); //
            } else {
                setProdutos([...produtos, await createProduct(data)]);
            }

            onCloseModal();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    };

    const onCloseModal = () => {
        clearErrors();
        onClose();
        reset();
    }

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onCloseModal}>
                <ModalContent>
                    <ModalHeader className="flex justify-center text-2xl font-bold">
                        {product ? 'Editar Produto' : 'Cadastro de Produto'}
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <Input
                                label="Código"
                                {...register('codigo')}
                                errorMessage={errors.codigo?.message}
                                isInvalid={errors.codigo ? true : false}
                                isDisabled={product ? true : false}
                            />
                            <Input
                                label="Descriminação"
                                {...register('descriminacao')}
                                errorMessage={errors.descriminacao?.message}
                                isInvalid={errors.descriminacao ? true : false}
                            />
                            <Input
                                label="Medidas"
                                {...register('medida')}
                                errorMessage={errors.medida?.message}
                                isInvalid={errors.medida ? true : false}
                            />
                            <div className='flex gap-4 pb-2 justify-end'>
                                <Button color="danger" variant="light" onPress={onCloseModal}>
                                    Cancelar
                                </Button>
                                <Button color="primary" type="submit">
                                    {product ? 'Atualizar' : 'Adicionar'} Produto
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
