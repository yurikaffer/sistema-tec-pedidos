import usePaginatedApi from '@/services/usePaginatedApi';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DotsThreeVertical, FilePdf, ListMagnifyingGlass, PencilLine, Trash } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import ModalGeneratePDF from '../specifics/ModalGeneratePDF';
import { ConfirmationModal } from '../ui/confirmationModal';
import HeaderTable from './HeaderTable';
import PaginationControl from './PaginationControl';

export interface ColumProps {
    key: string;
    label: string;
}

interface GenericTableProps {
    endpoint: string;
    ModalComponent: React.ComponentType<any>;
    setItens: React.Dispatch<React.SetStateAction<any[]>>
    dataName: string //exemplo: produtos (se oriente pelos contexts)
    itemsTitle: string;
    items: any[];
    columns: ColumProps[];
    itemName: string;
    deleteItem(id: number): Promise<void>
    generatePDF?: boolean
}

export default function GenericTable({
    endpoint,
    ModalComponent,
    setItens,
    dataName,
    itemsTitle,
    items,
    columns,
    itemName,
    deleteItem,
    generatePDF
}: GenericTableProps) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [limitPages, setLimitPages] = useState(10);

    const { data, pages, loadingState } = usePaginatedApi({
        page,
        limit: limitPages,
        endpoint: endpoint,
        searchTerm
    });

    useEffect(() => {
        if (data) {
            setItens(data[dataName]);
        }
    }, [data, dataName]);

    return (
        <div className="space-y-4">
            <HeaderTable
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                ModalComponent={ModalComponent}
                itemsTitle={itemsTitle}
                itemName={itemName}
                setLimitPages={setLimitPages}
                limitPages={limitPages}
            />

            <Table
                selectionMode="single"
                bottomContent={pages > 0 && <PaginationControl page={page} setPage={setPage} totalPages={pages} />}
            >
                <TableHeader>
                    {columns.map((column, index) => (
                        <TableColumn key={index}>{column.label}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody
                    items={items} //ENTENDER ISSO AQUI TAMBÉM, QUANDO ITEMS PODE SER NULO
                    loadingContent={<Spinner className='mt-[10rem]' />}
                    loadingState={loadingState as any}
                    emptyContent="Nenhum item encontrado"
                >
                    {(item: any) => (
                        <TableRow key={item.id}>
                            {columns.map((column, index) => {
                                if (column.key === 'actions') {
                                    return (
                                        <TableCell key={index}>
                                            <Actions
                                                item={item}
                                                ModalComponent={ModalComponent}
                                                itemName={itemName}
                                                deleteItem={deleteItem}
                                                setItens={setItens}
                                                generatePDF={generatePDF}
                                            />
                                        </TableCell>
                                    )
                                } else {
                                    return (
                                        <TableCell key={index}>{item[column.key]}</TableCell>
                                    )
                                }
                            })}

                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

const Actions = ({
    item,
    ModalComponent,
    itemName,
    deleteItem,
    setItens,
    generatePDF
}: {
    item: any,
    ModalComponent: React.ComponentType<any>,
    itemName: string,
    deleteItem(id: number): Promise<void>,
    setItens: React.Dispatch<React.SetStateAction<any[]>>
    generatePDF?: boolean
}) => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isInformationsModal, setIsOpenInformationsModal] = useState(false);
    const [isGeneratePDFModal, setIsGeneratePDFModal] = useState(false);

    const handleDelete = async () => {
        try {
            if (item) {
                await deleteItem(item.id);
                setItens(data => data.filter(data => data.id !== item.id));
            }
        } catch (error) {
            console.error(`Erro ao deletar o ${itemName.toLocaleLowerCase()}:`, error);
            // Implementar notificação de erro para o usuário
        }
    };

    return (
        <>
            <ActionsDropdown
                onEdit={() => setIsOpenEditModal(true)}
                onDelete={() => setIsConfirmationOpen(true)}
                onInformations={() => setIsOpenInformationsModal(true)}
                onGeneratePDF={() => setIsGeneratePDFModal(true)}
                generatePDF={generatePDF}
            />
            {isGeneratePDFModal &&
                <ModalGeneratePDF
                    request={item}
                    isOpen={isGeneratePDFModal}
                    onClose={() => setIsGeneratePDFModal(false)}
                />
            }
            {isInformationsModal &&
                <ModalComponent
                    item={item}
                    isOpen={isInformationsModal}
                    moreDetails={isInformationsModal}
                    onClose={() => setIsOpenInformationsModal(false)}
                />
            }
            {isOpenEditModal &&
                <ModalComponent
                    item={item}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            }
            {isConfirmationOpen &&
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    onClose={() => setIsConfirmationOpen(false)}
                    onConfirm={handleDelete}
                    message={`Tem certeza que deseja remover o ${itemName.toLocaleLowerCase()} ${item.descriminacao}?`}
                    title="Confirmação"
                />
            }
        </>
    );
};

const ActionsDropdown = ({
    onEdit, 
    onDelete, 
    onInformations,
    onGeneratePDF,
    generatePDF
}: {
    onEdit: () => void, 
    onDelete: () => void, 
    onInformations: () => void
    onGeneratePDF: () => void 
    generatePDF?: boolean
}) => (
    <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
                <DotsThreeVertical size={42} />
            </Button>
        </DropdownTrigger>
        <DropdownMenu>

            
                <DropdownItem onPress={onGeneratePDF} isReadOnly={!generatePDF}>
                    <div className={`flex gap-1 items-center ${!generatePDF ? 'opacity-50' : ''}`}>
                        <FilePdf size={20} />
                        Gerar PDF
                    </div>
                </DropdownItem>
            

            <DropdownItem onPress={onInformations}>
                <div className='flex gap-1 items-center'>
                    <ListMagnifyingGlass size={20} />
                    Informações
                </div>
            </DropdownItem>
            <DropdownItem onPress={onEdit}>
                <div className='flex gap-1 items-center'>
                    <PencilLine size={20} />
                    Editar
                </div>
            </DropdownItem>
            <DropdownItem onPress={onDelete} color="danger">
                <div className='flex gap-1 items-center'>
                    <Trash size={20} />
                    Remover
                </div>
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
);