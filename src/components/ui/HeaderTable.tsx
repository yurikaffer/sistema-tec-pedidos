import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useCallback, useState } from "react";
import SearchInput from "../specifics/searchInput";
import { ChevronDownIcon } from "./icons";

interface HeaderTableProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    ModalComponent: React.ComponentType<any>;
    itemsTitle: string;
    itemName: string;
    setLimitPages: React.Dispatch<React.SetStateAction<number>>
    limitPages: number;
}

const itensPerPage = [10, 20, 30, 40, 50];

const HeaderTable = ({ searchTerm, setSearchTerm, ModalComponent, itemsTitle, itemName, setLimitPages, limitPages }: HeaderTableProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = useCallback(() => setIsModalOpen(prev => !prev), []);

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-[28px] font-semibold'>{itemsTitle} Cadastrados</h1>
            <div className='flex justify-between items-center gap-2'>
            
                
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={`Buscar ${itemsTitle.toLowerCase()}...`} />
                <ItensPerPageButton limitPages={limitPages} setLimitPages={setLimitPages} />
                <Button className="px-10" color="primary" onPress={handleModalToggle}>{`+ Novo ${itemName}`}</Button>
                <ModalComponent isOpen={isModalOpen} onClose={handleModalToggle} />
            </div>
        </div>
    );
};

function ItensPerPageButton({ setLimitPages, limitPages }: { limitPages: number, setLimitPages: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <ButtonGroup variant="flat">
            <Button >{limitPages}</Button>
            <Dropdown >
                <DropdownTrigger>
                    <Button isIconOnly>
                        <ChevronDownIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu >
                    {itensPerPage.map((item) => (
                        <DropdownItem key={item} value={item} onClick={() => setLimitPages(item)}>
                            {item}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    );
}

export default HeaderTable;
