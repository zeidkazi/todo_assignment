export interface TodoType {
  id: number;
  title: string;
  description: string;
  time: Date;
}

export interface DataType {
  first?: number;
  items?: number;
  last?: number;
  next?: number | null;
  prev?: number | null;
  data: TodoType[];
}

export interface TodoListProps {
  data: DataType;
  isLoading: boolean;
}

export interface TodoCardProps {
  todo: TodoType;
  id: number;
}

export interface AddTodoType {
  title: string;
  description: string;
  time: Date;
}

export interface EditModalProps {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  todo: TodoType;
}

export interface EditTodoType {
  id: number;
  todo: AddTodoType;
}

export interface FetchTodoType {
  page?: number;
}

export interface PaginationType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: DataType;
}
