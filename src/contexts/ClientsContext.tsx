import { ClientDto } from '@/dto/clientDto';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ClientsContextType {
  clients: ClientDto[];
  client: ClientDto | undefined;
  setClients: React.Dispatch<React.SetStateAction<ClientDto[]>>;
  setClient: React.Dispatch<React.SetStateAction<ClientDto | undefined>>;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const ClientsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [client, setClient] = useState<ClientDto>();

  return (
    <ClientsContext.Provider value={{ clients, setClients, client, setClient }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
};
