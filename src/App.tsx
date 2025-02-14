import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./pages/Todo";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/Context";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ContextProvider>
  );
};

export default App;
