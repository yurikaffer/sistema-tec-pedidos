import { useProdutos } from "@/contexts/ProductsContext";
import { Autocomplete, AutocompleteItem, CircularProgress } from "@nextui-org/react";

export default function SearchProductsInput() {
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