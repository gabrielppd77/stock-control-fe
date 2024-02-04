import {
  QueryClient,
  QueryClientProvider as QueryClientProviderLib,
} from "@tanstack/react-query";

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export function QueryClientProvider(props: QueryClientProviderProps) {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
    <QueryClientProviderLib client={queryClient}>
      {children}
    </QueryClientProviderLib>
  );
}
