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
        <div >
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
            <div className='grid'>

            </div>


            <CustomField name='Razão Social/Nome:' value={client.nome}/>
            <CustomField name='Telefone:' value={client.telefone}/>
            <CustomField name='Endereço:' value={client.endereco}/>
            <CustomField name='Cidade:' value={client.cidade}/>
            <CustomField name='UF:' value={client.uf}/>
            <CustomField name='CEP:' value={client.cep}/>
            <CustomField name='CNPJ/CPF:' value={client.cnpjOuCPF}/>
            <CustomField name='Inscrição Estadual:' value={client.inscricaoEstadual}/>
            <CustomField name='Bairro:' value={client.bairro}/>
            <CustomField name='E-mail:' value={client.email}/>

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
                            <td className="py-2 px-4 border text-center">{product.produto?.descriminacao} </td>
                            <td className="py-2 px-4 border text-center">{product.unidade}</td>
                            <td className="py-2 px-4 border text-center">{product.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;

function CustomField({name, value}: {name: string, value: Key}) {
    return (
        <div className='flex gap-2 items-center'>
            <span>{name}</span>
            <span>{value}</span>
        </div>
    )
}