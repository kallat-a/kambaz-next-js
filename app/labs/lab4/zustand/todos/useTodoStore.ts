import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  todo: Todo;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  setTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },
  addTodo: (t) =>
    set((state) => {
      const newTodo = { ...t, id: new Date().getTime().toString() };
      return {
        todos: [...state.todos, newTodo],
        todo: { id: "-1", title: "" },
      };
    }),
  updateTodo: (t) =>
    set((state) => ({
      todos: state.todos.map((item) => (item.id === t.id ? t : item)),
      todo: { id: "-1", title: "" },
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
    })),
  setTodo: (t) => set({ todo: t }),
}));
