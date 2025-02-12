import { TodoListProps, TodoType } from "../types";
import TodoCard from "./TodoCard";

const TodoList: React.FC<TodoListProps> = ({ data }) => {
  return (
    <div className="w-full h-fit flex items-start justify-center flex-wrap gap-4 pt-base">
      {data &&
        data?.map((todo: TodoType, id: number) => (
          <TodoCard todo={todo} id={id}/>
        ))}
    </div>
  );
};

export default TodoList;
