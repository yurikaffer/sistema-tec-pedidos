'use client'
import { ModalClient, ModalClientProps } from "@/components/specifics/ModalClient";
import GenericTable from "@/components/ui/GenericList";
import { useClients } from "@/contexts/ClientsContext";
import { deleteClient } from "@/services/clienteServices";

export default function Clientes() {
    const { clients, setClients } = useClients();

    const renderModalComponent = (props: ModalClientProps) => (
        <ModalClient {...props} />
    );

    const columns = [
        { key: 'codigo', label: 'Código' },
        { key: 'nome', label: 'Nome/Razão Social' },
        { key: 'email', label: 'E-mail' },
        { key: 'endereco', label: 'Endereço' },
        { key: 'bairro', label: 'Bairro' },
        { key: 'cidade', label: 'Cidade' },
        { key: 'uf', label: 'UF' },
        { key: 'cep', label: 'Cep' },
        { key: 'cnpjOuCPF', label: 'CNPJ/CPF' },
        { key: 'inscricaoEstadual', label: 'IE' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'actions', label: 'Ações' },
    ];

    return (
        <main className='flex flex-col items-center pt-10'>
            <div className='w-full h-full max-w-[95%] '>
                <GenericTable
                    dataName="clients"
                    endpoint="/clientes"
                    itemsTitle="Clientes"
                    itemName="Cliente"
                    items={clients}
                    setItens={setClients}
                    columns={columns}
                    ModalComponent={renderModalComponent}
                    deleteItem={deleteClient}
                 />
            </div>
        </main>
    )

}