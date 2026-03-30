"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h2>Working with Arrays</h2>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos{" "}
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
        <FormControl
          id="wd-todo-id"
          defaultValue={todo.id}
          className="w-50"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-retrieve-todo-by-id"
          className="btn btn-primary"
          href={`${API}/${todo.id}`}
        >
          Get Todo by ID
        </a>
      </div>
      <hr />
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h3>Creating new Items in an Array</h3>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />
      <h3>Removing from an Array</h3>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
        <FormControl
          defaultValue={todo.id}
          className="w-50"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-remove-todo"
          className="btn btn-primary"
          href={`${API}/${todo.id}/delete`}
        >
          Remove Todo with ID = {todo.id}{" "}
        </a>
      </div>
      <hr />
      <h3>Updating an Item in an Array</h3>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
        <FormControl
          defaultValue={todo.id}
          className="w-25"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <FormControl
          defaultValue={todo.title}
          className="w-50"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <a
          id="wd-update-todo-title"
          href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
          className="btn btn-primary"
        >
          Update Todo
        </a>
      </div>
      <hr />
      <h3>Updating completed and description</h3>
      <FormControl
        id="wd-todo-id-completed-desc"
        defaultValue={todo.id}
        className="w-25 mb-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        id="wd-todo-description"
        as="textarea"
        rows={2}
        className="mb-2"
        defaultValue={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <label className="d-block mb-2">
        <input
          id="wd-todo-completed-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) =>
            setTodo({ ...todo, completed: e.target.checked })
          }
        />{" "}
        Completed
      </label>
      <a
        id="wd-update-todo-completed"
        className="btn btn-primary me-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Complete Todo ID = {todo.id}
      </a>
      <a
        id="wd-update-todo-description"
        className="btn btn-primary"
        href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
      >
        Describe Todo ID = {todo.id}
      </a>
      <hr />
    </div>
  );
}
