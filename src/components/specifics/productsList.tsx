import { useProdutos } from '@/contexts/ProductsContext';
import { ProductDto } from '@/dto/productDto';
import { deleteProduct } from '@/services/produtoServices';
import usePaginatedApi from '@/services/usePaginatedApi';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DotsThreeVertical, PencilLine, Trash } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import { ConfirmationModal } from '../ui/confirmationModal';
import { ModalProduct } from './modalProduct';
import SearchInput from './searchInput';

const ITEMS_PER_PAGE = 10;
const API_ENDPOINT = '/produtos';

interface HeaderTableProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface ProductsTableProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  loadingState: 'loading' | 'loaded' | 'error';
}

interface PaginationControlProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function ProductsList() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { setProdutos } = useProdutos();

  const { data, pages, loadingState } = usePaginatedApi({
    page,
    limit: ITEMS_PER_PAGE,
    endpoint: API_ENDPOINT,
    searchTerm
  });

  useEffect(() => {
    if (data && data.produtos) {
      setProdutos(data.produtos);
    }
  }, [data, setProdutos]);

  return (
    <div className="space-y-4">
      <HeaderTable searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductsTable
        page={page}
        setPage={setPage}
        totalPages={pages}
        loadingState={loadingState as any}
      />
    </div>
  );
}

const HeaderTable = ({ searchTerm, setSearchTerm }: HeaderTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[28px] font-semibold'>Produtos Cadastrados</h1>
      <div className='flex justify-between items-center gap-4'>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder='Buscar produtos...' />
        <Button color="primary" onPress={handleOpenModal}>+ Novo Produto</Button>
        <ModalProduct
          isOpen={isOpen}
          onClose={handleOpenModal}
        />
      </div>
    </div>
  );
};

const ProductsTable = ({ page, setPage, totalPages, loadingState }: ProductsTableProps) => {
  const { produtos } = useProdutos();
  return (
    <Table
      aria-label="Produtos cadastrados"
      selectionMode="single"
      bottomContent={totalPages > 0 && <PaginationControl page={page} setPage={setPage} totalPages={totalPages} />}
    >
      <TableHeader>
        <TableColumn>Código</TableColumn>
        <TableColumn>Discriminação</TableColumn>
        <TableColumn>Medidas</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody
        items={produtos}
        loadingContent={<Spinner className='mt-[10rem]' />}
        loadingState={loadingState as any}
        emptyContent="Nenhum produto encontrado"
      >
        {(item: ProductDto) => (
          <TableRow key={item.id}>
            <TableCell>{item.codigo}</TableCell>
            <TableCell>{item.descriminacao}</TableCell>
            <TableCell>{item.medida}</TableCell>
            <TableCell >
              <Actions item={item} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const PaginationControl = ({ page, setPage, totalPages }: PaginationControlProps) => (
  <div className="flex w-full justify-center">
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={page}
      total={totalPages}
      onChange={setPage}
    />
  </div>
);

const Actions = ({ item }: { item: ProductDto }) => {
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
        <ModalProduct
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
          title="Confirmar Remoção"
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