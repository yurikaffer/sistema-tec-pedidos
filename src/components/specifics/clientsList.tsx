
import { ClientDto } from '@/dto/clientDto';
import usePaginatedApi from '@/services/usePaginatedApi';
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useState } from 'react';
import { ModalNewClient } from './modalNewClient';

interface ClientsTableProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  loadingState: 'loading' | 'loaded' | 'error';
}

export default function ClientList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const endpoint = '/clientes'

  const { data, error, pages, loadingState } = usePaginatedApi({page, limit, endpoint});

  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <Table
      aria-label="Clientes cadastrados"
      selectionMode="single" 
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
        <TableColumn>Nome/Razão Social</TableColumn>
        <TableColumn>E-mail</TableColumn>
        <TableColumn>Endereco</TableColumn>
        <TableColumn>Bairro</TableColumn>
        <TableColumn>Cidade</TableColumn>
        <TableColumn>UF</TableColumn>
        <TableColumn>CEP</TableColumn>
        <TableColumn>CNPJ/CPF</TableColumn>
        <TableColumn>Inscrição Estadual</TableColumn>
        <TableColumn>Telefone</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.clientes ?? []}
        loadingContent={<Spinner className='mt-[10rem]' />}
        loadingState={loadingState as any}
      >
        {(item: ClientDto) => (
          <TableRow key={item.id}>
            <TableCell>{item.codigo}</TableCell>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.endereco}</TableCell>
            <TableCell>{item.bairro}</TableCell>
            <TableCell>{item.cidade}</TableCell>
            <TableCell>{item.uf}</TableCell>
            <TableCell>{item.cep}</TableCell>
            <TableCell>{item.cnpjOuCPF}</TableCell>
            <TableCell>{item.inscricaoEstadual}</TableCell>
            <TableCell>{item.telefone}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function TitleTable() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-[28px] font-semibold'>Clientes Cadastrados</h1>
      <div className='flex justify-between items-center'>
        <ModalNewClient />
      </div>
    </div>
  )
}