"use client";

import React from "react";
import { useTodos } from "./todosContext";
import { FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function ReactContextTodoList() {
  const { todos, todo, addTodo, updateTodo, deleteTodo, setTodo } = useTodos()!;

  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex gap-2 align-items-center flex-nowrap">
          <FormControl
            className="flex-grow-1"
            style={{ minWidth: 120 }}
            value={todo?.title ?? ""}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            placeholder="New todo"
          />
          <div className="d-flex gap-2 flex-shrink-0">
            <Button
              variant="warning"
              onClick={() => todo.id !== "-1" && updateTodo(todo)}
              id="wd-react-context-update-todo-click"
            >
              Update
            </Button>
            <Button
              variant="success"
              onClick={() => addTodo(todo)}
              id="wd-react-context-add-todo-click"
            >
              Add
            </Button>
          </div>
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem
            key={t.id}
            className="d-flex gap-2 align-items-center flex-wrap"
          >
            <span className="flex-grow-1">{t.title}</span>
            <Button
              variant="primary"
              onClick={() => setTodo(t)}
              id="wd-react-context-edit-todo-click"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteTodo(t.id)}
              id="wd-react-context-delete-todo-click"
            >
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
