import { AddTodoType, EditTodoType, FetchTodoType } from "../types";

export const addTodo = async (data: AddTodoType) => {
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  return resData;
};

export const fetchTodo = async (page:number ) => {
  const response = await fetch(`http://localhost:3000/todos?${page ? `_page=${page}&_per_page=6`: ``}`);
  const data = await response.json();
  return data;
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const editTodo = async ({id,todo }: EditTodoType) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const resData = await response.json();
  return resData;
};
