import { useClients } from '@/contexts/ClientsContext';
import { ClientDto } from '@/dto/clientDto';
import { createClient, updateClient } from '@/services/clienteServices';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const clientSchema = z.object({
    codigo: z.string().min(1, 'O código é obrigatório'),
    nome: z.string().min(1, 'O Nome/Razão Social é obrigatório'),
    email: z.string().min(1, 'O email é obrigatório'),
    endereco: z.string().min(1, 'O endereço é obrigatório'),
    bairro: z.string().min(1, 'O bairro é obrigatório'),
    cidade: z.string().min(1, 'A cidade é obrigatória'),
    uf: z.string().min(1, 'O uf é obrigatório'),
    cep: z.string().min(1, 'O cep é obrigatório'),
    cnpjOuCPF: z.string().min(1, 'O CNPJ/CPF é obrigatório'),
    inscricaoEstadual: z.string().min(1, 'A inscrição estadual é obrigatória'),
    telefone: z.string().min(1, 'O telefone é obrigatório'),
});

type FormSchema = z.infer<typeof clientSchema>;

export interface ModalClientProps {
    item?: ClientDto;
    isOpen: boolean;
    onClose: () => void;
    moreDetails?: boolean;
}

export function ModalClient({ item, isOpen, onClose, moreDetails }: ModalClientProps) {
    const { clients, setClients } = useClients();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        setValue,
        setError,
    } = useForm<FormSchema>({
        resolver: zodResolver(clientSchema),
    });

    useEffect(() => {
        if (item) {
            setValue('codigo', item.codigo);
            setValue('nome', item.nome);
            setValue('email', item.email);
            setValue('endereco', item.endereco);
            setValue('bairro', item.bairro);
            setValue('cidade', item.cidade);
            setValue('uf', item.uf);
            setValue('cep', item.cep);
            setValue('cnpjOuCPF', item.cnpjOuCPF);
            setValue('inscricaoEstadual', item.inscricaoEstadual);
            setValue('telefone', item.telefone);
        } else {
            reset();
        }
    }, [item, reset, setValue]);

    const onSubmit = async (data: FormSchema) => {
        try {
            if (item) {
                const updatedClient = await updateClient(item.id, data);
                setClients(clients.map(p => p.id === item.id ? updatedClient : p)); //
            } else {
                setClients([...clients || [], await createClient(data)]); //ENTENDER ESSA LINHA, PODE DAR BO
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
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onClose} size="5xl">
            <ModalContent>
                <ModalHeader className="flex self-center font-bold text-[34px] pt-10 text-gray-800 dark:text-gray-200">
                    Cadastro de Cliente
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <div className="flex gap-4 justify-between">
                            <Input
                                type="text"
                                label="Código"
                                className="max-w-32"
                                errorMessage={errors.codigo?.message}
                                isInvalid={errors.codigo ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('codigo')}
                            />
                            <Input
                                type="text"
                                label="Nome/Razão Social"
                                errorMessage={errors.nome?.message}
                                isInvalid={errors.nome ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('nome')}
                            />
                            <Input
                                type="text"
                                label="E-mail"
                                errorMessage={errors.email?.message}
                                isInvalid={errors.email ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('email')}
                            />
                            <Input
                                type="text"
                                label="Endereço"
                                errorMessage={errors.endereco?.message}
                                isInvalid={errors.endereco ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('endereco')}
                            />
                        </div>
                        <div className="flex gap-4 justify-between">
                            <Input
                                type="text"
                                label="Bairro"
                                errorMessage={errors.bairro?.message}
                                isInvalid={errors.bairro ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('bairro')}
                            />
                            <Input
                                type="text"
                                label="Cidade"
                                errorMessage={errors.cidade?.message}
                                isInvalid={errors.cidade ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('cidade')}
                            />
                            <Input
                                type="text"
                                label="UF"
                                errorMessage={errors.uf?.message}
                                isInvalid={errors.uf ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('uf')}
                            />
                            <Input
                                type="number"
                                label="CEP"
                                errorMessage={errors.cep?.message}
                                isInvalid={errors.cep ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('cep')}
                            />
                        </div>
                        <div className="flex gap-4 justify-between">
                            <Input
                                type="number"
                                label="CNPJ/CPF"
                                errorMessage={errors.cnpjOuCPF?.message}
                                isInvalid={errors.cnpjOuCPF ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('cnpjOuCPF')}
                            />
                            <Input
                                type="number"
                                label="Inscrição Estadual"
                                errorMessage={errors.inscricaoEstadual?.message}
                                isInvalid={errors.inscricaoEstadual ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('inscricaoEstadual')}
                            />
                            <Input
                                type="number"
                                label="Telefone"
                                errorMessage={errors.telefone?.message}
                                isInvalid={errors.telefone ? true : false}
                                isDisabled={item || moreDetails ? true : false}
                                {...register('telefone')}
                            />
                        </div>
                        <div className='flex gap-2 pb-2 justify-end'>
                            <Button color="danger" variant="light" onPress={onCloseModal}>
                                Cancelar
                            </Button>
                            {!moreDetails &&
                                <Button color="primary" type="submit">
                                    {item ? 'Atualizar' : 'Adicionar'} Cliente
                                </Button>
                            }
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}