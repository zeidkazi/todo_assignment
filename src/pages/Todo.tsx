import { useQuery } from "@tanstack/react-query";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { fetchTodo } from "../api/api";
import { useState } from "react";
import Pagination from "../components/Pagination";

const Todo = () => {
  const [page, setPage] = useState(1);

  const {
    data: fetchTodoData,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todo", { page }],
    queryFn: () => fetchTodo(page),
    // staleTime: 1000*10  //cache value to not re fetch
  });

  console.log(fetchTodoData, isError, error, isLoading);

  return (
    <div className="bg-background w-full h-dvh max-h-screen overflow-auto flex flex-col items-center justify-center p-base">
      <div className="w-full max-w-3xl h-full min-h-fit flex flex-col items-center gap-4 bg-white rounded-xl py-base px-sm shadow ">
        <AddTodo />
        <TodoList data={fetchTodoData} isLoading={isLoading} />
        <Pagination page={page} setPage={setPage} data={fetchTodoData} />
      </div>
    </div>
  );
};

export default Todo;
