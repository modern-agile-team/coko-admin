import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './route/Router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles.css';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
        gcTime: 300000,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
