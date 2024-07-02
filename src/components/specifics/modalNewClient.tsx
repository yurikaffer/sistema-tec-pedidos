import { useClients } from '@/contexts/ClientsContext';
import { createClient } from '@/services/clienteServices';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';

const initialFormState = {
    codigo: '',
    nome: '',
    email: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: 0,
    cnpjOuCPF: 0,
    inscricaoEstadual: 0,
    telefone: 0,
};

export function ModalNewClient() {
    const [isOpen, setIsOpen] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    const { clients, setClients } = useClients();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const clearForm = () => {
        setFormState(initialFormState);
        setIsOpen(false);
    };

    const handleAddClient = async () => {
        try {
            const response = await createClient(formState);
            setClients([...clients, response]);
            clearForm();
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
        }
    };

    const onOpen = () => setIsOpen(true);

    return (
        <div className="flex flex-col gap-2">
            <div className="ml-auto">
                <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
                    + Novo Cliente
                </Button>
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={setIsOpen} size="5xl">
                <ModalContent>
                    <ModalHeader className="flex self-center font-bold text-[34px] pt-10 text-gray-800 dark:text-gray-200">
                        Cadastro de Cliente
                    </ModalHeader>
                    <ModalBody>
                        <ClientForm formState={formState} handleChange={handleChange} />
                        <Button color="primary" onClick={handleAddClient}>
                            Adicionar Cliente
                        </Button>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </div>
    );
}

function ClientForm({ formState, handleChange }: { formState: typeof initialFormState, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <>
            <div className="flex gap-4 justify-between">
                <Input
                    type="text"
                    label="Código"
                    name="codigo"
                    value={formState.codigo}
                    onChange={handleChange}
                    className="max-w-32"
                />
                <Input
                    type="text"
                    label="Nome/Razão Social"
                    name="nome"
                    value={formState.nome}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label="E-mail"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label="Endereço"
                    name="endereco"
                    value={formState.endereco}
                    onChange={handleChange}
                />
            </div>
            <div className="flex gap-4 justify-between">
                <Input
                    type="text"
                    label="Bairro"
                    name="bairro"
                    value={formState.bairro}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label="Cidade"
                    name="cidade"
                    value={formState.cidade}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label="UF"
                    name="uf"
                    value={formState.uf}
                    onChange={handleChange}
                    className="max-w-16"
                />
                <Input
                    type="number"
                    label="CEP"
                    name="cep"
                    value={String(formState.cep)}
                    onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'cep', value: e.target.value }})}
                />
            </div>
            <div className="flex gap-4 justify-between">
                <Input
                    type="number"
                    label="CNPJ/CPF"
                    name="cnpjOuCPF"
                    value={String(formState.cnpjOuCPF)}
                    onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'cnpjOuCPF', value: e.target.value }})}
                />
                <Input
                    type="number"
                    label="Inscrição Estadual"
                    name="inscricaoEstadual"
                    value={String(formState.inscricaoEstadual)}
                    onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'inscricaoEstadual', value: e.target.value }})}
                />
                <Input
                    type="number"
                    label="Telefone"
                    name="telefone"
                    value={String(formState.telefone)}
                    onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'telefone', value: e.target.value }})}
                />
            </div>
        </>
    );
}
