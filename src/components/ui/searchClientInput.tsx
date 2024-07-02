import { useClients } from "@/contexts/ClientsContext";
import { Autocomplete, AutocompleteItem, CircularProgress } from "@nextui-org/react";

const SearchClientInput = () => {
    const {clients, setClient} = useClients()

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