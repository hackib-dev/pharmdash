import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

const queryClient = new QueryClient();

interface UseQueryProviderProps {
  children: ReactNode;
}

const UseQueryProvider: FC<UseQueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default UseQueryProvider;
