import { TodoListProps, TodoType } from "../types";
import LoaderSkeleton from "./LoaderSkeleton";
import TodoCard from "./TodoCard";

const TodoList: React.FC<TodoListProps> = ({ data, isLoading }) => {
  return (
    <div className=" grow w-full h-fit flex items-start justify-center flex-wrap gap-4 py-xs">
      {isLoading ? (
        <>
          {new Array(6).fill("").map(() => (
            <LoaderSkeleton />
          ))}
        </>
      ) : (
        data &&
        data?.data?.map((todo: TodoType, id: number) => (
          <TodoCard todo={todo} id={id} />
        ))
      )}
    </div>
  );
};

export default TodoList;
