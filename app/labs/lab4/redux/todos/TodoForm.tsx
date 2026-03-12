"use client";

import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex gap-2 align-items-center flex-nowrap">
      <FormControl
        className="flex-grow-1"
        style={{ minWidth: 120 }}
        value={todo?.title ?? ""}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="New todo"
      />
      <div className="d-flex gap-2 flex-shrink-0">
        <Button
          variant="warning"
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
        >
          Update
        </Button>
        <Button
          variant="success"
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
        >
          Add
        </Button>
      </div>
    </ListGroupItem>
  );
}
