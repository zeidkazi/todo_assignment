import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addTodo } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const formSchema = yup.object().shape({
  title: yup.string().required("Title required"),
  description: yup.string().required("Description required"),
  time: yup.string().required("Time required"),
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
    <div className="w-full flex flex-col items-center gap-xs border-b pb-base">
      <div className="text-xlarge font-bold pb-base">Todo</div>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="w-full max-w-xl flex flex-col items-start gap-xs"
      >
        <div className=" w-full flex items-center gap-base">
          <label htmlFor="title" className="w-32 text-base md:text-large">
            Title
          </label>
          <div className="grow">
            <input
              type="text"
              id="title"
              {...register("title")}
              className={`w-full outline-none border rounded p-xs ${
                errors?.title
                  ? "focus:border-red-500"
                  : "focus:border-background"
              }`}
            />
            {errors && errors.title ? (
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            ) : null}
          </div>
        </div>

        <div className=" w-full flex items-center gap-base">
          <label htmlFor="description" className="w-32 text-base md:text-large">
            Description
          </label>
          <div className="grow">
            <input
              type="text"
              id="description"
              {...register("description")}
              className={`w-full outline-none border rounded p-xs ${
                errors?.description
                  ? "focus:border-red-500"
                  : "focus:border-background"
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
          <label htmlFor="time" className="w-32 text-base md:text-large">
            Time
          </label>
          <div className="grow">
            <input
              type="text"
              id="time"
              {...register("time")}
              className={`w-full outline-none border rounded p-xs ${
                errors?.time
                  ? "focus:border-red-500"
                  : "focus:border-background"
              }`}
            />
            {errors && errors.time ? (
              <p className="text-xs text-red-500">{errors.time?.message}</p>
            ) : null}
          </div>
        </div>

        <div className="w-full flex items-center justify-end pt-base">
          <button
            type="submit"
            className=" px-sm py-xs rounded-lg border border-background hover:bg-background hover:text-white active:scale-[0.9] transition-all"
          >
            Add ToDo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
