import { Controller, useForm } from "react-hook-form";
import { DataType, EditModalProps } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./AddTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo } from "../api/api";
import DatePicker from "react-datepicker";
import { X } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../context/Context";

const EditModal = ({ setClose, todo }: EditModalProps) => {
  const { page: currentPage, setPage } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: todo,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editTodo,
    onMutate: async (updatedTodo) => {
      
      await queryClient.cancelQueries({ queryKey: ["todo"] });

      const prevTodos = queryClient.getQueryData<DataType>([
        "todo",
        { page: currentPage },
      ]);
      console.log("clicked todo:", updatedTodo, "actual data", prevTodos);

      queryClient.setQueryData(
        ["todo", { page: currentPage }],
        (old?: DataType) => {
          return {
            ...old,
            data: old?.data.map((todo) =>
              todo.id === updatedTodo.id ? { ...todo, ...updatedTodo.todo } : todo
            ),
          };
        }
      );

      setClose(false);
      
      return { prevTodos };
    },

    onError: (errors, variables, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(
          ["todo", { page: currentPage }],
          context.prevTodos
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
     
    },
  });

  return (
    <div
      onClick={() => setClose(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative min-w-[500px] min-h-[120px] bg-white rounded-lg p-base shadow-lg flex flex-col items-center gap-base"
      >
        <button
          onClick={() => setClose(false)}
          className=" absolute size-7 bg-black text-white hover:bg-black/80 transition rounded-full right-1 top-1 cursor-pointer flex items-center justify-center"
        >
          <X strokeWidth={1.5} />
        </button>

        <p className="text-xlarge font-bold">Edit ToDo</p>
        <form
          onSubmit={handleSubmit((data) => mutate({ id: todo.id, todo: data }))}
          className="w-full max-w-xl flex flex-col items-start gap-base"
        >
          <div className=" w-full flex items-center gap-base">
            <label htmlFor="title" className="w-32 text-base font-semibold">
              Title
            </label>
            <div className="grow">
              <input
                type="text"
                id="title"
                {...register("title")}
                className={`w-full  border rounded p-xs ${
                  errors?.title
                    ? "focus:border-red-500"
                    : "focus:outline-purple-500"
                }`}
              />
              {errors && errors.title ? (
                <p className="text-xs text-red-500">{errors.title?.message}</p>
              ) : null}
            </div>
          </div>
          <div className=" w-full flex items-center gap-base">
            <label
              htmlFor="description"
              className="w-32 text-base font-semibold"
            >
              Description
            </label>
            <div className="grow">
              <input
                type="text"
                id="description"
                {...register("description")}
                className={`w-full  border rounded p-xs ${
                  errors?.description
                    ? "focus:border-red-500"
                    : "focus:outline-purple-500"
                }`}
              />
              {errors && errors.description ? (
                <p className="text-xs text-red-500">
                  {errors.description?.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className=" w-full flex items-center gap-base">
            <label htmlFor="title" className="w-32 text-base font-semibold">
              Time
            </label>
            <div className="grow">
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className={`w-full p-xs border rounded-md  ${
                      errors.time
                        ? "border-red-500"
                        : "focus:outline-purple-500"
                    }`}
                    placeholderText="Enter Task Date"
                    dateFormat="dd MMM yyyy"
                  />
                )}
              />
              {errors && errors.time ? (
                <p className="text-xs text-red-500">{errors.time?.message}</p>
              ) : null}
            </div>
          </div>
          <div className="w-full flex items-center justify-end pt-sm">
            <button
              type="submit"
              className="w-full px-sm py-sm rounded-lg border bg-black text-white text-sm transition-all cursor-pointer hover:bg-black/80"
            >
              Edit ToDo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
