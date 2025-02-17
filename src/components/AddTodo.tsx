import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { addTodo } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { DataType } from "../types";
import { useContext } from "react";
import { MyContext } from "../context/Context";

export const formSchema = yup.object().shape({
  title: yup.string().required("Title required"),
  description: yup.string().required("Description required"),
  time: yup
    .date()
    .typeError("Invalid date")
    .required()
    .test("test-future-date", "Enter today or future dates", (value) => {
      if (!value) return false;
      //.setHour converts to numeric value so use getTime() to compare , setHours to 0 to be able to select time throughout the day
      // console.log("date validations",value, "date()",new Date(), "get time", new Date().getTime(), "setHours", new Date().setHours(0,0,0,0) )
      return value.getTime() >= new Date().setHours(0, 0, 0, 0);
      // time: yup.date().nullable().required("Time required"),
      // .min(new Date().setHours(0,0,0,0), "Enter today or future dates")
      // .test("test-date", "enter valid date", (value) => value instanceof Date)
    }),
});

const AddTodo = () => {
  const { page: currentPage } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: addTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todo"] });
  //     reset();
  //     toast.success("Added ToDo");
  //   },
  // });

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      console.log("new todo", newTodo)

      // Cancel current queries for the todos list
      await queryClient.cancelQueries({ queryKey: ["todo"] });

      // Saves the previous todos state before updating
      const prevTodos = queryClient.getQueryData<DataType>([
        "todo",
        { page: currentPage },
      ])

      if(!prevTodos) return

      // Add optimistic only if todo gets added to current page
      if(prevTodos?.data.length < 6){

        queryClient.setQueryData(['todo',{page: currentPage}], (old:DataType)=>{
          return{ ...old,
            data:  [...old?.data, {...newTodo, id: new Date()}]
          }
        })
      }

      // Return context with previous todos
      return { prevTodos };
    },

    onError: (errors, variables, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(['todo',{page:currentPage}], context.prevTodos)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      reset();
      
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
              className={`w-full border rounded p-xs ${
                errors?.title ? "border-red-500" : "focus:outline-purple-500"
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
              className={`w-full border rounded p-xs ${
                errors?.description
                  ? "border-red-500"
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
                  className={`w-full p-xs border rounded-md  ${
                    errors.time ? "border-red-500" : "focus:outline-purple-500"
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
