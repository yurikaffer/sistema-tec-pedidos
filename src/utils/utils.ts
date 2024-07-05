export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedValue;
};

export function formatCEP(cep: string): string {
  // Remove qualquer caractere não numérico
  const numericCEP = cep.replace(/\D/g, '');
  // Formata o CEP (12345-678)
  return numericCEP.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

export function formatInscricaoEstadual(ie: string): string {
  // A formatação pode variar por estado, então vamos apenas remover caracteres não numéricos
  return ie.replace(/\D/g, '');
}

export function formatTelefone(telefone: string): string {
  // Remove qualquer caractere não numérico
  const numericPhone = telefone.replace(/\D/g, '');
  // Formata o telefone ((11) 98765-4321)
  return numericPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export function formatCNPJCPF(documento: string): string {
  // Remove qualquer caractere não numérico
  const numericDoc = documento.replace(/\D/g, '');
  
  // Verifica se é CPF ou CNPJ
  if (numericDoc.length === 11) {
    // CPF (123.456.789-01)
    return numericDoc.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  } else if (numericDoc.length === 14) {
    // CNPJ (12.345.678/0001-90)
    return numericDoc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }
  
  // Se não for CPF nem CNPJ, retorna o documento sem formatação
  return documento;
}
