"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Todo {
  id: string;
  title: string;
}

interface TodosContextState {
  todos: Todo[];
  todo: Todo;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  setTodo: (todo: Todo) => void;
}

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodoState] = useState<Todo>({
    id: "-1",
    title: "Learn Mongo",
  });

  const addTodo = (t: Todo) => {
    const newTodo = {
      ...t,
      id: new Date().getTime().toString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodoState({ id: "-1", title: "" });
  };

  const updateTodo = (t: Todo) => {
    setTodos((prev) => prev.map((item) => (item.id === t.id ? t : item)));
    setTodoState({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const setTodo = (t: Todo) => {
    setTodoState(t);
  };

  const value: TodosContextState = {
    todos,
    todo,
    addTodo,
    updateTodo,
    deleteTodo,
    setTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};
