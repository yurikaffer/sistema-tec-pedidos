import { useClients } from '@/contexts/ClientsContext';
import { createClient } from '@/services/clienteServices';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

import { useState } from 'react';

export function ModalNewClient() {
    const [isOpen, setIsOpen] = useState(false);

    const { clients, setClients } = useClients();

    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [endereco, setEndereco] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [cep, setCep] = useState(0)
    const [cnpjOuCPF, setCnpjOuCPF] = useState(0)
    const [inscricaoEstadual, setInscricaoEstadual] = useState(0)
    const [telefone, setTelefone] = useState(0)

    function clearForm() {
        setCodigo('');
        setNome('');
        setEmail('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setUf('');
        setCep(0);
        setCnpjOuCPF(0);
        setInscricaoEstadual(0);
        setTelefone(0);
        setIsOpen(false);
    }

    const handleAddClient = async () => {
        try {
            const newClient = {
                codigo,
                nome,
                email,
                inscricaoEstadual,
                endereco,
                bairro,
                cidade,
                uf,
                cep,
                cnpjOuCPF,
                telefone,
            };
            const response = await createClient(newClient);
            setClients([...clients, response]);
            clearForm()
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    const onOpen = () => setIsOpen(true);

    return (
        <div className="flex flex-col gap-2">
            <div className='ml-auto'>
                <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
                    + Novo Cliente
                </Button>
            </div>

            <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen} size='5xl'>  {/* TA CERTO ESSE onOpenChange={setIsOpen}?*/}
                <ModalContent>
                    <ModalHeader className="flex self-center font-bold text-[34px] pt-10 text-gray-800 dark:text-gray-200">
                        Cadastro de Cliente
                    </ModalHeader>
                    <ModalBody>
                        <div className='flex gap-4 justify-between'>
                            <Input
                                type="text"
                                label="Código"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                className='max-w-32'
                            />
                            <Input
                                type="text"
                                label="Nome/Razão Social"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Input
                                type="text"
                                label="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="text"
                                label="Endereço"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                            />
                        </div>
                        <div className='flex gap-4 justify-between'>
                            <Input
                                type="text"
                                label="Bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                            <Input
                                type="text"
                                label="Cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            />
                            <Input
                                type="text"
                                label="UF"
                                value={uf}
                                onChange={(e) => setUf(e.target.value)}
                                className='max-w-16'
                            />
                            <Input
                                type="number"
                                label="CEP"
                                value={String(cep)}
                                onChange={(e) => setCep(Number(e.target.value))}
                            />
                        </div>
                        <div className='flex gap-4 justify-between'>
                            <Input
                                type="number"
                                label="CNPJ/CPF"
                                value={String(cnpjOuCPF)}
                                onChange={(e) => setCnpjOuCPF(Number(e.target.value))}
                            />
                            <Input
                                type="number"
                                label="Inscrição Estadual"
                                value={String(inscricaoEstadual)}
                                onChange={(e) => setInscricaoEstadual(Number(e.target.value))}
                            />
                            <Input
                                type="number"
                                label="Telefone"
                                value={String(telefone)}
                                onChange={(e) => setTelefone(Number(e.target.value))}
                            />
                        </div>
                        <Button color='primary' onClick={handleAddClient}>Adicionar Cliente</Button>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </div>
    );
}