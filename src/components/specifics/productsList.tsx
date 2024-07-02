import { ProductDto } from '@/dto/productDto';
import usePaginatedApi from '@/services/usePaginatedApi';
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useState } from 'react';
import { ModalNewProduct } from './modalNewProduct';

export default function ProductsList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const endpoint = '/produtos'

  const { data, error, pages, loadingState } = usePaginatedApi({page, limit, endpoint});

  if (error) return <div>Erro ao carregar dados</div>;

  return (
      <Table
        aria-label="Produtos cadastrados"
        selectionMode="single" 
        topContent={<HeaderTable />}
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>código</TableColumn>
          <TableColumn>Descriminação</TableColumn>
          <TableColumn>medidas</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.produtos ?? []}
          loadingContent={<Spinner className='mt-[10rem]' />}
          loadingState={loadingState as any}
        >
          {(item: ProductDto) => (
            <TableRow key={item.id}>
              <TableCell>{item.codigo}</TableCell>
              <TableCell>{item.descriminacao}</TableCell>
              <TableCell>{item.medida}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
  );
}

function HeaderTable() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[28px] font-semibold'>Produtos Cadastrados</h1>
      <div className='flex justify-between items-center'>
        <ModalNewProduct />
      </div>
    </div>
  )
}

