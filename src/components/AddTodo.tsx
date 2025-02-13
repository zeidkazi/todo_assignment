import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { addTodo } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

export const formSchema = yup.object().shape({
  title: yup.string().required("Title required"),
  description: yup.string().required("Description required"),
  time: yup.date().nullable().required("Time required"),
});

const AddTodo = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      reset();
      toast.success("Added ToDo")
    },
  });

  return (
    <div className="w-full flex flex-col items-center gap-xs border-b border-background pb-base bg-white rounded-xl">
      <div className="text-xlarge font-bold pb-base">Todo</div>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="w-full max-w-xl flex flex-col items-start gap-xs"
      >
        <div className=" w-full flex items-center gap-base">
          <label htmlFor="title" className="w-32 text-base font-semibold">
            Title
          </label>
          <div className="grow">
            <input
              type="text"
              id="title"
              placeholder="Enter your Task"
              {...register("title")}
              className={`w-full outline-none border rounded p-xs ${
                errors?.title
                  ? "border-red-500"
                  : "focus:border-background"
              }`}
            />
            {errors && errors.title ? (
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            ) : null}
          </div>
        </div>

        <div className=" w-full flex items-center gap-base">
          <label htmlFor="description" className="w-32 text-base font-semibold">
            Description
          </label>
          <div className="grow">
            <input
              type="text"
              id="description"
              placeholder="Describe your Task"
              {...register("description")}
              className={`w-full outline-none border rounded p-xs ${
                errors?.description
                  ? "border-red-500"
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
          <label htmlFor="time" className="w-32 text-base font-semibold">
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
                  className={`w-full p-xs border rounded-md outline-none ${
                    errors.time
                      ? "border-red-500"
                      : "focus:border-background"
                  }`}
                  placeholderText="Enter Task Date"
                  dateFormat="dd MMM yyyy"
                  minDate={new Date()}
                />
              )}
            />
            {errors && errors.time ? (
              <p className="text-xs text-red-500">{errors.time?.message}</p>
            ) : null}
          </div>
        </div>

        <div className="w-full flex items-center justify-end pt-base">
          <button
            type="submit"
            className="w-full px-sm py-sm rounded-lg border bg-black text-white text-sm transition-all cursor-pointer hover:bg-black/80"
          >
            Add ToDo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
