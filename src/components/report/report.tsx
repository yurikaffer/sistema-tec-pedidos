'use client'

import { RequestDto } from '@/dto/requestDto';
import { formatDate } from '@/utils/utils';
import { Key } from 'react';

interface ReportProps {
    request: RequestDto;
}

const colunas = ['Código', 'Quantidade', 'Medida', 'Discriminação', 'Unidade', 'Total R$']

const Report: React.FC<ReportProps> = ({ request }) => {
    const products = request.produtos
    const client = request.cliente

    return (
        <div className='flex flex-col'>
            <div className='flex w-full justify-between border-b-1 pb-2'>
                <div className='flex flex-col text-[10px] items-center'>
                    <img src='/tec-logo-cut.webp' className='w-64 pb-3'></img>
                    <span>AMAURI DE FARIA - CNPJ: 24.253.463/0001-23</span>
                </div>
                <div className='flex flex-col justify-center'>
                    <CustomField name='Data:' value={formatDate(String(request.data))}/>
                    <CustomField name='Contato:' value='Eliane Kaffer'/>
                </div>
            </div>
            <div className='flex flex-col gap-2 py-6 '>
                <div className='flex gap-2 '>
                    <CustomField width='w-[50ch]' name='Razão Social/Nome:' value={client.nome}/>
                    <CustomField width='w-[15ch]' name='Telefone:' value={client.telefone}/>
                </div>
                <div className='flex gap-2 '>
                    <CustomField width='w-[30ch]' name='Endereço:' value={client.endereco}/>
                    <CustomField width='w-[20ch]' name='Cidade:' value={client.cidade}/>
                    <CustomField width='w-[20ch]' name='Bairro:' value={client.bairro}/>
                    
                </div>
                <div className='flex gap-2 justify-between'>
                    <CustomField width='w-[2ch]' name='UF:' value={client.uf}/>
                    <CustomField width='w-[10ch]' name='CEP:' value={client.cep}/>
                    <CustomField width='w-[18ch]' name='CNPJ/CPF:' value={client.cnpjOuCPF}/>
                    <CustomField width='w-[18ch]' name='Inscrição Estadual:' value={client.inscricaoEstadual}/>
                </div>
                <div className='flex gap-2 '>
                    
                    <CustomField width='w-[25ch]' name='E-mail:' value={client.email}/>
                </div>
            </div>

            <table className="min-w-full border">
                <thead >
                    <tr className='bg-gray-200 '>
                        {colunas.map((coluna, index) => (
                            <th key={index} className="py-2 px-4 border border-gray-300 ">{coluna}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} >
                            <td className="py-2 px-4 border text-center">{product.produto?.codigo}</td>
                            <td className="py-2 px-4 border text-center">{product.quantidade}</td>
                            <td className="py-2 px-4 border text-center">{product.produto?.medida}</td>
                            <td className="py-2 px-4 border text-center">{product.produto?.descriminacao}</td>
                            <td className="py-2 px-4 border text-center">{product.unidade}</td>
                            <td className="py-2 px-4 border text-center">{product.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex flex-col gap-1  py-4'>
                <div className='flex justify-end items-center '>
                    <span className='px-4 font-bold '>Total do pedido: </span>
                    <span className='w-[12ch]'>R$ {request.total}</span>
                </div>
                <div className='flex justify-end items-center '>
                    <span className='px-4 font-bold '>Pago: </span>
                    <span className='w-[12ch]'>R$ 100.000,00</span>
                </div>
            </div>
            <span className='text-[10px] tracking-tight'>
                O CANCELAMENTO DESTE PEDIDO SOMENTE PODERÁ SER FEITO ATÉ 24 HORAS APÓS A CONFIRMAÇÃO DO MESMO, 
                POIS TRATA-SE DE TRABALHO EXCLUSIVO PERSONALIZADO E INTRANSFERÍVEL (AS CORES PODEM VARIAS QUANDO 
                ENVIADAS SOMENTE POR MÍDIA DIGITAL).
            </span> 
            <span className='font-bold pt-10'>OBS.:</span>
        </div>
    );
};

export default Report;

function CustomField({name, value, width}: {name: string, value: Key, width?: string}) {
    return (
        <div className='flex gap-2 items-center '>
            <span className='font-bold'>{name}</span>
            <span className={width}>{value}</span>
        </div>
    )
}