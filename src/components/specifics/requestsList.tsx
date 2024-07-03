'use client'

import { useClients } from "@/contexts/ClientsContext";
import { useProductsRequests } from "@/contexts/ProductsRequestsContext";
import { RequestDto } from '@/dto/requestDto';
import { getAllClients } from "@/services/clienteServices";
import { createProductRequest } from "@/services/productRequestService";
import { createRequests } from "@/services/requestsService";
import usePaginatedApi from "@/services/usePaginatedApi";
import { formatDate } from "@/utils/utils";
import { DateValue } from "@internationalized/date";
import {
  Button, DateInput, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter,
  ModalHeader, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow
} from '@nextui-org/react';
import { DotsThreeVertical } from "@phosphor-icons/react";
import { useEffect, useState } from 'react';
import Report from "../report/report";
import SearchClientInput from "../ui/searchClientInput";
import { ModalNewClient } from "./modalNewClient";
import ProductsRequestTable from "./productsRequestTable";

export default function RequestsList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const endpoint = '/pedidos'

  const { data, error, pages, loadingState } = usePaginatedApi({ page, limit, endpoint });

  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <Table
      aria-label="Pedidos cadastrados"
      selectionMode="single"
      topContent={<HeaderTable />}
      bottomContent={
        pages > 0 && (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        )
      }
    >
      <TableHeader>
        <TableColumn>Código</TableColumn>
        <TableColumn>Data</TableColumn>
        <TableColumn>Cliente</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.pedidos ?? []}
        loadingContent={<Spinner className="mt-[10rem]" />}
        loadingState={loadingState as any}
      >
        {(item: RequestDto) => (
          <TableRow key={item.id}>
            <TableCell>{item.codigo}</TableCell>
            <TableCell>{formatDate(String(item.data))}</TableCell>
            <TableCell>{item.cliente.nome}</TableCell>
            <TableCell><Actions requestSelected={item} /></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function HeaderTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [date, setDate] = useState<DateValue>();
  const [total, setTotal] = useState(0);
  const { setClients, setClient, client } = useClients();
  const { setProductsRequests, productsRequests } = useProductsRequests();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getAllClients();
        setClients(clients);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = productsRequests.reduce((acc, request) => acc + request.total, 0);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [productsRequests]);

  const handleAddRequests = async () => {
    if (!date || !client?.id) return;

    try {
      const newRequest = {
        codigo,
        data: dateValueToDate(date),
        clienteId: client.id,
        total,
      };

      const request = await createRequests(newRequest);

      await Promise.all(
        productsRequests.map(async (productReq) => {
          if (productReq.produto?.id) {
            const newRequestProduct = {
              pedidoId: request.id,
              quantidade: productReq.quantidade,
              produtoId: productReq.produto.id,
              unidade: productReq.unidade,
              total: productReq.total,
            };
            await createProductRequest(newRequestProduct);
          }
        })
      );

      onOpen();
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  };

  const onOpen = () => {
    clearForm();
    setIsOpen(!isOpen);
  };

  const clearForm = () => {
    setCodigo('');
    setDate(undefined);
    setClient(undefined);
    setProductsRequests([]);
  };

  const dateValueToDate = (dateValue: DateValue): Date => {
    const { year, month, day } = dateValue;
    return new Date(year, month - 1, day);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[28px] font-semibold">Pedidos Cadastrados</h1>
      <div className="flex justify-between items-center">
        <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
          + Novo Pedido
        </Button>
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpen} size="5xl">
          <ModalContent>
            <ModalHeader className="flex font-bold text-[34px] pt-10 text-gray-800 dark:text-gray-200">
              Cadastro de Pedido
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-4 items-center">
                <Input
                  type="text"
                  label="Código"
                  value={codigo}
                  className="max-w-[8rem]"
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <DateInput
                  className="max-w-[8rem]"
                  granularity="day"
                  label="Data"
                  value={date}
                  onChange={setDate}
                />
                <SearchClientInput />
                <ModalNewClient />
              </div>
              <ProductsRequestTable />
              <Button color="primary" onClick={handleAddRequests}>
                Adicionar Pedido
              </Button>
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

function Actions({ requestSelected }: { requestSelected: RequestDto }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <DotsThreeVertical size={42} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Detalhes</DropdownItem>
          <DropdownItem>Editar</DropdownItem>
          <DropdownItem>Remover</DropdownItem>
          <DropdownItem onPress={onOpen}>Gerar PDF</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <ModalPrintPDF isOpen={isOpen} onOpen={onOpen} request={requestSelected} />
    </>
  );
}

interface ModalPrintPDFProps {
  isOpen: boolean
  onOpen: () => void
  request: RequestDto
}

import generatePDF, { Margin } from 'react-to-pdf';

function ModalPrintPDF({ isOpen, onOpen, request }: ModalPrintPDFProps) {
  const getTargetElement = () => document.getElementById('report')

  const handleGeneratePDF = async () => {
    generatePDF(getTargetElement, {
      method: 'open',
      page: {
        margin: Margin.MEDIUM,
        format: 'A4',
        orientation: 'portrait',
      },
    })
  }

  return (
    <Modal className="bg-white" backdrop="blur" isOpen={isOpen} onOpenChange={onOpen} size="5xl">
      <ModalContent>
        <ModalBody className="p-10">
          <div id="report">
            <Report request={request} />
          </div>
        </ModalBody>
        <ModalFooter className="pr-10 pb-10">
          <Button onPress={handleGeneratePDF} color="primary" className="mt-[1rem]">
            Download
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}