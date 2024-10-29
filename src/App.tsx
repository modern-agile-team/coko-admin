import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './route/Router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './component/Header';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
