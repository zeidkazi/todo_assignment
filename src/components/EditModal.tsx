import { useForm } from "react-hook-form";
import { EditModalProps } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./AddTodo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, editTodo } from "../api/api";

const EditModal = ({ setClose, todo }: EditModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: todo,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] }), setClose(false);
    },
  });

  return (
    <div
      onClick={() => setClose(false)}
      className="fixed  inset-0 flex items-center justify-center bg-white/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-[500px] min-h-[100px] bg-primary rounded p-base"
      >
        <form
          onSubmit={handleSubmit((data) => mutate({ id: todo.id, todo: data }))}
          className="w-full max-w-xl flex flex-col items-start gap-xs"
        >
          <div className=" w-full flex items-center gap-base">
            <label htmlFor="title" className="w-32 text-base md:text-large">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className={`grow outline-none border rounded p-xs ${
                errors?.title
                  ? "focus:border-red-500"
                  : "focus:border-background"
              }`}
            />
          </div>
          <div className=" w-full flex items-center gap-base">
            <label
              htmlFor="description"
              className="w-32 text-base md:text-large"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              {...register("description")}
              className={`grow outline-none border rounded p-xs ${
                errors?.description
                  ? "focus:border-red-500"
                  : "focus:border-background"
              }`}
            />
          </div>
          <div className=" w-full flex items-center gap-base">
            <label htmlFor="title" className="w-32 text-base md:text-large">
              Time
            </label>
            <input
              type="text"
              id="time"
              {...register("time")}
              className={`grow outline-none border rounded p-xs ${
                errors?.time
                  ? "focus:border-red-500"
                  : "focus:border-background"
              }`}
            />
          </div>
          <div className="w-full flex items-center justify-end pt-sm">
            <button
              type="submit"
              className=" px-sm py-xs rounded-lg bg-background active:scale-[0.9] transition-all"
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
