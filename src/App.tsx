import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./pages/Todo";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>  
  );
};

export default App;
