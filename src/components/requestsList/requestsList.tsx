import { RequestDto } from '@/dto/requestDto';
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { ModalNewRequests } from '../modalNewRequests/modalNewRequests';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RequestsList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading } = useSWR(`/api/pedidos?page=${page}&limit=${limit}`, fetcher, {
    keepPreviousData: true,
  });

  console.log('data: ', data)

  const rowsPerPage = limit;
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);

  const loadingState = isLoading || !data?.pedidos ? 'loading' : 'idle';

  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <Table
      aria-label="Pedidos cadastrados"
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
        <TableColumn>Código</TableColumn>
        <TableColumn>Data</TableColumn>
        <TableColumn>Cliente</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.pedidos ?? []}
        loadingContent={<Spinner className='mt-[10rem]' />}
        loadingState={loadingState}
      >
        {(item: RequestDto) => (
          <TableRow key={item.id}>
            <TableCell>Teste</TableCell>
            <TableCell>Teste</TableCell>
            <TableCell>Teste</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function TitleTable() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[28px] font-semibold'>Pedidos Cadastrados</h1>
      <div className='flex justify-between items-center'>

        <ModalNewRequests />
      </div>
    </div>
  )
}