"use client";

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem
      key={todo.id}
      className="d-flex gap-2 align-items-center flex-wrap"
    >
      <span className="flex-grow-1">{todo.title}</span>
      <Button
        variant="primary"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        Delete
      </Button>
    </ListGroupItem>
  );
}
