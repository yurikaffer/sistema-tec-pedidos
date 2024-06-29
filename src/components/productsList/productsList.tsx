import { ProductDto } from '@/dto/productDto';
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { ModalNewProduct } from '../modalNewProduct/modalNewProduct';
import SearchInput from '../searchInput/searchClientInput';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading } = useSWR(`/api/produtos?page=${page}&limit=${limit}`, fetcher, {
    keepPreviousData: true,
  });

  const rowsPerPage = limit;
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);

  const loadingState = isLoading || !data?.produtos ? 'loading' : 'idle';

  if (error) return <div>Erro ao carregar dados</div>;

  return (
      <Table
        aria-label="Produtos cadastrados"
        topContent={<TitleTable />}
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
          loadingState={loadingState}
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

function TitleTable() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[28px] font-semibold'>Produtos Cadastrados</h1>
      <div className='flex justify-between items-center'>
        <SearchInput />
        <ModalNewProduct />
      </div>
    </div>
  )
}