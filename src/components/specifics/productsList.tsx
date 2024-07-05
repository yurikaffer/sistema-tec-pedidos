import { ProductDto } from '@/dto/productDto';
import { deleteProduct } from '@/services/produtoServices';
import usePaginatedApi from '@/services/usePaginatedApi';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DotsThreeVertical, MagnifyingGlass, PencilLine, Trash } from '@phosphor-icons/react';
import { useCallback, useMemo, useState } from 'react';
import { ConfirmationModal } from '../ui/confirmationModal';
import { ModalProduct } from './modalProduct';

const ITEMS_PER_PAGE = 10;
const API_ENDPOINT = '/produtos';

interface HeaderTableProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface ProductsTableProps {
  products: ProductDto[];
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

  const { data, error, pages, loadingState } = usePaginatedApi({ page, limit: ITEMS_PER_PAGE, endpoint: API_ENDPOINT });

  const filteredProducts = useMemo(() => {
    return data?.produtos?.filter((product: ProductDto) =>
      product.descriminacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [data?.produtos, searchTerm]);

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-4">
      <HeaderTable searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductsTable 
        products={filteredProducts} 
        page={page} 
        setPage={setPage} 
        totalPages={pages} 
        loadingState={loadingState as any} 
      />
    </div>
  );
}

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center text-red-500">Erro ao carregar dados: {message}</div>
);

const HeaderTable = ({ searchTerm, setSearchTerm }: HeaderTableProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsOpen(prev => !prev), []);
  const handleProductSaved = useCallback(() => {
    handleOpenModal();
    // Adicionar lógica adicional após salvar o produto, se necessário
  }, [handleOpenModal]);

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[28px] font-semibold'>Produtos Cadastrados</h1>
      <div className='flex justify-between items-center'>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button color="primary" onPress={handleOpenModal}>+ Novo Produto</Button>
        <ModalProduct
          isOpen={isOpen}
          onClose={handleOpenModal}
          onProductSaved={handleProductSaved}
        />
      </div>
    </div>
  );
};

const SearchInput = ({ searchTerm, setSearchTerm }: HeaderTableProps) => (
  <Input
    placeholder="Buscar produtos..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    startContent={<MagnifyingGlass />}
    className="max-w-xs"
  />
);


const ProductsTable = ({ products, page, setPage, totalPages, loadingState }: ProductsTableProps) => (  <Table
    aria-label="Produtos cadastrados"
    selectionMode="single"
    bottomContent={totalPages > 0 && <PaginationControl page={page} setPage={setPage} totalPages={totalPages} />}
  >
    <TableHeader>
      <TableColumn>Código</TableColumn>
      <TableColumn>Descriminação</TableColumn>
      <TableColumn>Medidas</TableColumn>
      <TableColumn>Ações</TableColumn>
    </TableHeader>
    <TableBody
      items={products}
      loadingContent={<Spinner className='mt-[10rem]' />}
      loadingState={loadingState as any}
      emptyContent="Nenhum produto encontrado"
    >
      {(item: ProductDto) => (
        <TableRow key={item.id}>
          <TableCell>{item.codigo}</TableCell>
          <TableCell>{item.descriminacao}</TableCell>
          <TableCell>{item.medida}</TableCell>
          <TableCell>
            <Actions productSelected={item} />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);


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

const Actions = ({ productSelected }: { productSelected: ProductDto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleDelete = useCallback(() => setIsConfirmationOpen(true), []);

  const handleProductSaved = () => {
    
  }

  const handleConfirmDelete = useCallback(async () => {
    try {
      await deleteProduct(productSelected.id);
      // Implementar lógica para atualizar a lista de produtos
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      // Implementar notificação de erro para o usuário
    }
  }, [productSelected.id]);

  return (
    <>
      <ActionsDropdown onEdit={() => setIsOpen(true)} onDelete={handleDelete} />
      <ModalProduct
        product={productSelected}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onProductSaved={handleProductSaved}
      />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Tem certeza que deseja remover o produto ${productSelected.descriminacao}?`}
        title="Confirmar Remoção"
      />
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