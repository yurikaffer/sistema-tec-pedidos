import { useClients } from "@/contexts/ClientsContext";
import { getAllClients } from "@/services/clienteServices";
import { Autocomplete, AutocompleteItem, CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";

const SearchClientInput = () => {
    const {clients, setClients, setClient} = useClients()

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

    const onSelectionChange = (key: React.Key | null) => {
        const client = clients?.find(client => client.id === Number(key));
        setClient(client);
      };

    if (!clients || !clients.length) return <CircularProgress />

    return (
        <div className="w-full max-w-[15rem]">
            <Autocomplete
                label="Selecione o cliente"
                className="max-w-xs"
                onSelectionChange={onSelectionChange}
            >
                {clients?.map((client) => (
                    <AutocompleteItem key={client.id} value={client.id}>
                        {client.nome}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    )
}

export default SearchClientInput