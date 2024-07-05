import { RequestDto } from '@/dto/requestDto';
import { currencyFormatter, formatCEP, formatCNPJCPF, formatDate, formatInscricaoEstadual, formatTelefone } from '@/utils/utils';

import React from 'react';

interface ReportProps {
    request: RequestDto;
}

interface CustomFieldProps {
    name: string;
    value: string | number;
    width?: string;
    isCurrency?: boolean;
}

const COLUMNS = ['Código', 'Quantidade', 'Medida', 'Discriminação', 'Unidade', 'Total'] as const;

const CustomField: React.FC<CustomFieldProps> = React.memo(({ name, value, width = 'auto', isCurrency = false }) => (
    <div className='flex gap-2 items-center'>
        <span className='font-bold'>{name}</span>
        <span style={{ width }}>{isCurrency ? currencyFormatter.format(Number(value)) : value}</span>
    </div>
));

const Report: React.FC<ReportProps> = ({ request }) => {
    const { produtos, cliente, data, total } = request;

    return (
        <div className='flex flex-col'>
            <Header date={formatDate(String(data))} />
            <ClientInfo client={cliente} />
            <ProductTable products={produtos} />
            <TotalSection total={total} />
            <Footer />
        </div>
    );
};

const Header: React.FC<{ date: string }> = React.memo(({ date }) => (
    <div className='flex w-full justify-between border-b-1 pb-2'>
        <div className='flex flex-col text-[10px] items-center'>
            <img src='/tec-logo-cut.webp' alt="Company Logo" className='w-64 pb-3' />
            <span>AMAURI DE FARIA - CNPJ: 24.253.463/0001-23</span>
        </div>
        <div className='flex flex-col justify-center'>
            <CustomField name='Data:' value={date} />
            <CustomField name='Contato:' value='Eliane Kaffer' />
        </div>
    </div>
));

const ClientInfo: React.FC<{ client: RequestDto['cliente'] }> = React.memo(({ client }) => (
    <div className='flex flex-col gap-2 py-6'>
        <div className='flex gap-2'>
            <CustomField width='50ch' name='Razão Social/Nome:' value={client.nome} />
            <CustomField width='15ch' name='Telefone:' value={formatTelefone(client.telefone)} />
        </div>
        <div className='flex gap-2'>
            <CustomField width='30ch' name='Endereço:' value={client.endereco} />
            <CustomField width='20ch' name='Cidade:' value={client.cidade} />
            <CustomField width='20ch' name='Bairro:' value={client.bairro} />
        </div>
        <div className='flex gap-2 justify-between'>
            <CustomField width='2ch' name='UF:' value={client.uf} />
            <CustomField width='10ch' name='CEP:' value={formatCEP(client.cep)} />
            <CustomField width='18ch' name='CNPJ/CPF:' value={formatCNPJCPF(client.cnpjOuCPF)} />
            <CustomField width='18ch' name='Inscrição Estadual:' value={formatInscricaoEstadual(client.inscricaoEstadual)} />
        </div>
        <div className='flex gap-2'>
            <CustomField width='25ch' name='E-mail:' value={client.email} />
        </div>
    </div>
));

const ProductTable: React.FC<{ products: RequestDto['produtos'] }> = React.memo(({ products }) => (
    <table className="min-w-full border">
        <thead>
            <tr className='bg-gray-200'>
                {COLUMNS.map((coluna) => (
                    <th key={coluna} className="py-2 px-4 border border-gray-300">{coluna}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (
                <tr key={index}>
                    <td className="py-2 px-4 border text-center">{product.produto?.codigo}</td>
                    <td className="py-2 px-4 border text-center">{product.quantidade}</td>
                    <td className="py-2 px-4 border text-center">{product.produto?.medida}</td>
                    <td className="py-2 px-4 border text-center">{product.produto?.descriminacao}</td>
                    <td className="py-2 px-4 border text-center">{product.unidade}</td>
                    <td className="py-2 px-4 border text-center">{currencyFormatter.format(product.total)}</td>
                </tr>
            ))}
        </tbody>
    </table>
));

const TotalSection: React.FC<{ total: number }> = React.memo(({ total }) => (
    <div className='flex flex-col gap-1 py-4'>
        <div className='flex justify-end items-center'>
            <span className='px-4 font-bold'>Total do pedido: </span>
            <span className='w-[12ch]'>{currencyFormatter.format(total)}</span>
        </div>
        <div className='flex justify-end items-center'>
            <span className='px-4 font-bold'>Pago: </span>
            <span className='w-[12ch]'>{currencyFormatter.format(100000)}</span>
        </div>
    </div>
));
const Footer: React.FC = React.memo(() => (
    <>
        <span className='text-[10px] tracking-tight'>
            O CANCELAMENTO DESTE PEDIDO SOMENTE PODERÁ SER FEITO ATÉ 24 HORAS APÓS A CONFIRMAÇÃO DO MESMO, 
            POIS TRATA-SE DE TRABALHO EXCLUSIVO PERSONALIZADO E INTRANSFERÍVEL (AS CORES PODEM VARIAS QUANDO 
            ENVIADAS SOMENTE POR MÍDIA DIGITAL).
        </span> 
        <span className='font-bold pt-10'>OBS.:</span>
    </>
));

export default React.memo(Report);