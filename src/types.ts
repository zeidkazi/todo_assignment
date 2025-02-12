export interface TodoType {
  id: number;
  title: string;
  description: string;
  time: string;
}

export interface TodoListProps {
  data: TodoType[];
}

export interface TodoCardProps {
  todo: TodoType;
  id: number;
}

export interface AddTodoType {
  title: string;
  description: string;
  time: string;
}

export interface EditModalProps {
    setClose :React.Dispatch<React.SetStateAction<boolean>>,
    todo: TodoType
}

export interface EditTodoType {
    id:number
    todo: AddTodoType
}
