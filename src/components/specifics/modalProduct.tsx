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
    item?: ProductDto;
    isOpen: boolean;
    onClose: () => void;
    moreDetails?: boolean;
}

export function ModalProduct({ item, isOpen, onClose, moreDetails }: ModalProductProps) {
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
        if (item) {
            setValue('codigo', item.codigo);
            setValue('descriminacao', item.descriminacao);
            setValue('medida', item.medida);
        } else {
            reset();
        }
    }, [item, reset, setValue]);

    const onSubmit = async (data: FormSchema) => {
        try {
            if (item) {
                const updatedProduct = await updateProduct(item.id, data);
                setProdutos(produtos.map(p => p.id === item.id ? updatedProduct : p)); //
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
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onCloseModal}>
            <ModalContent>
                <ModalHeader className="flex justify-center text-2xl font-bold">
                    {moreDetails ? 'Detalhes do Produto' : item ? 'Editar Produto' : 'Cadastro de Produto'}
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <Input
                            label="Código"
                            {...register('codigo')}
                            errorMessage={errors.codigo?.message}
                            isInvalid={errors.codigo ? true : false}
                            isDisabled={item || moreDetails ? true : false}
                        />
                        <Input
                            label="Descriminação"
                            {...register('descriminacao')}
                            errorMessage={errors.descriminacao?.message}
                            isInvalid={errors.descriminacao ? true : false}
                            isDisabled={moreDetails ? true : false}
                        />
                        <Input
                            label="Medidas"
                            {...register('medida')}
                            errorMessage={errors.medida?.message}
                            isInvalid={errors.medida ? true : false}
                            isDisabled={moreDetails ? true : false}
                        />
                        <div className='flex gap-2 pb-2 justify-end'>
                            <Button color="danger" variant="light" onPress={onCloseModal}>
                                Cancelar
                            </Button>
                            {!moreDetails &&
                                <Button color="primary" type="submit">
                                    {item ? 'Atualizar' : 'Adicionar'} Produto
                                </Button>
                            }
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
