import React, { useContext, useState } from "react";
import { DataType, TodoCardProps } from "../types";
import { Edit, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/api";
import EditModal from "./EditModal";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { MyContext } from "../context/Context";

const TodoCard: React.FC<TodoCardProps> = ({ todo, id }) => {
  const { page: currentPage } = useContext(MyContext);
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTodo,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodo = queryClient.getQueryData<DataType>([
        "todo",
        { page: currentPage },
      ]);
      // console.log("delete todo prev state",prevTodo)

      queryClient.setQueryData(
        ["todo", { page: currentPage }],
        (old: DataType) => {
          return {
            ...old,
            data: old?.data.filter((todo) => todo.id !== id),
          };
        }
      );

      return { prevTodo };
    },

    onError: (errors, variables, context)=>{
      if(context?.prevTodo){
        queryClient.setQueryData(['todo',{page:currentPage}], context.prevTodo)
      };
      toast.error("Failed to Delete Todo")


    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    
    },
  });

  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy");
  };

  return (
    <div
      className="bg-primary border border-primary flex flex-col w-full max-w-max rounded-t-lg shadow"
      key={id}
    >
      <div className="p-xs flex flex-col gap-sm">
        <p className=" text-large md:text-xlarge font-bold">{todo.title}</p>
        <p className="">{todo.description}</p>
        <p className="italic">{formatDate(todo.time)}</p>
      </div>
      <div className="bg-white p-xs flex items-center justify-end gap-base">
        <button className="cursor-pointer hover:scale-[1.1] transition">
          <Edit onClick={() => setIsEditActive(true)} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => mutate(todo.id)}
          className="cursor-pointer hover:scale-[1.1] transition"
        >
          <Trash strokeWidth={1.5} />
        </button>
      </div>

      {isEditActive && <EditModal setClose={setIsEditActive} todo={todo} />}
    </div>
  );
};

export default TodoCard;
