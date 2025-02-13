import { Controller, useForm } from "react-hook-form";
import { EditModalProps } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./AddTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo } from "../api/api";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const EditModal = ({ setClose, todo }: EditModalProps) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      setClose(false);
      toast.success("Edited ToDo");
    },
  });

  return (
    <div
      onClick={() => setClose(false)}
      className="fixed  inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-[500px] min-h-[100px] bg-white rounded-lg p-base shadow-lg flex flex-col items-center gap-base"
      >
        <p className="text-xlarge font-bold">Edit ToDo</p>
        <form
          onSubmit={handleSubmit((data) => mutate({ id: todo.id, todo: data }))}
          className="w-full max-w-xl flex flex-col items-start gap-xs"
        >
          <div className=" w-full flex items-center gap-base">
            <label htmlFor="title" className="w-32 text-base font-semibold">
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
              className="w-32 text-base font-semibold"
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
            <label htmlFor="title" className="w-32 text-base font-semibold">
              Time
            </label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className={`w-full p-xs border rounded-md outline-none ${
                    errors.time ? "border-red-500" : "focus:border-background"
                  }`}
                  placeholderText="Enter Task Date"
                  dateFormat="dd MMM yyyy"
                  minDate={new Date()}
                />
              )}
            />
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
