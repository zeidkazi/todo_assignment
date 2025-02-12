import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addTodo } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const formSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  time: yup.string().required(),
});

const AddTodo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      reset();
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-xs">
      <div className="text-small ">Todo</div>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
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
              errors?.title ? "focus:border-red-500" : "focus:border-background"
            }`}
          />
        </div>
        <div className=" w-full flex items-center gap-base">
          <label htmlFor="description" className="w-32 text-base md:text-large">
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
              errors?.time ? "focus:border-red-500" : "focus:border-background"
            }`}
          />
        </div>
        <div className="w-full flex items-center justify-end pt-base">
          <button type="submit" className=" px-sm py-xs rounded-lg bg-primary active:scale-[0.9] transition-all">
            Add ToDo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
