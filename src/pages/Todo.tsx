import { useQuery } from "@tanstack/react-query";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { fetchTodo } from "../api/api";
import { useContext, useState } from "react";
import Pagination from "../components/Pagination";
import { MyContext } from "../context/Context";

const Todo = () => {
  const { page, setPage } = useContext(MyContext);

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
      <div className="w-full max-w-3xl h-full min-h-fit flex flex-col items-center gap-base">
        <AddTodo />
        <div className=" bg-white rounded-xl w-full h-full flex flex-col items-center py-base">
          <TodoList data={fetchTodoData} isLoading={isLoading} />
          <Pagination data={fetchTodoData} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
