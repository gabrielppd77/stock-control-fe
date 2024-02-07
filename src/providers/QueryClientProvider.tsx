import {
  QueryClient,
  QueryClientProvider as QueryClientProviderLib,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export function QueryClientProvider(props: QueryClientProviderProps) {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
    <QueryClientProviderLib client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProviderLib>
  );
}
