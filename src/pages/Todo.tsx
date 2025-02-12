import {useQuery} from "@tanstack/react-query";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { fetchTodo } from "../api/api";

const Todo = () => {


  const {
    data: fetchTodoData,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todo"],
    queryFn: fetchTodo,
  });

  console.log(fetchTodoData, isError, error, isLoading);

  return (
    <div className="bg-background w-full h-screen max-h-screen overflow-auto flex flex-col items-center p-base">
      <div className="w-full max-w-3xl flex flex-col items-center gap-4 bg-white rounded-xl py-xs px-sm ">
        <AddTodo />
        <TodoList data={fetchTodoData} />
      </div>
    </div>
  );
};

export default Todo;
