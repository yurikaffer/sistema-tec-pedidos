import { useProdutos } from '@/contexts/ProductsContext';
import { deleteProduct } from '@/services/produtoServices';
import usePaginatedApi from '@/services/usePaginatedApi';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DotsThreeVertical, PencilLine, Trash } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
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
}

export default function GenericTable({
    endpoint,
    ModalComponent,
    setItens,
    dataName,
    itemsTitle,
    items,
    columns,
    itemName
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
                    items={items}
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
                                            <Actions item={item} ModalComponent={ModalComponent} itemsTitle={itemsTitle} />
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

const Actions = ({ item, ModalComponent, itemsTitle }: { item: any, ModalComponent: React.ComponentType<any>, itemsTitle: string }) => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const { setProdutos } = useProdutos();

    const handleDelete = async () => {
        try {
            if (item) {
                await deleteProduct(item.id);
                setProdutos(produtos => produtos.filter(product => product.id !== item.id));
            }
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            // Implementar notificação de erro para o usuário
        }
    };

    return (
        <>
            <ActionsDropdown onEdit={() => setIsOpenEditModal(true)} onDelete={() => setIsConfirmationOpen(true)} />
            {isOpenEditModal &&
                <ModalComponent
                    product={item}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            }
            {isConfirmationOpen &&
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    onClose={() => setIsConfirmationOpen(false)}
                    onConfirm={handleDelete}
                    message={`Tem certeza que deseja remover o produto ${item.descriminacao}?`}
                    title="Confirmação"
                />
            }
        </>
    );
};

const ActionsDropdown = ({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => void }) => (
    <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
                <DotsThreeVertical size={42} />
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownItem onPress={onEdit}>
                <div className='flex gap-1 items-center'>
                    <PencilLine size={15} />
                    Editar
                </div>
            </DropdownItem>
            <DropdownItem onPress={onDelete}>
                <div className='flex gap-1 items-center'>
                    <Trash size={15} />
                    Remover
                </div>
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
);