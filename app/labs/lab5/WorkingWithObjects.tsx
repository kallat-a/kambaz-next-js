"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [moduleState, setModuleState] = useState({
    id: "mod-101",
    name: "Introduction to Web Development",
    description: "HTML, CSS, and JavaScript fundamentals",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
        <FormControl
          className="w-75"
          id="wd-assignment-title"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(assignment.title)}`}
        >
          Update Title{" "}
        </a>
      </div>
      <hr />
      <h4>Assignment score and completed</h4>
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <FormControl
        id="wd-assignment-score"
        className="w-25 mb-2"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({
            ...assignment,
            score: Number(e.target.value),
          })
        }
      />
      <label className="d-block mb-2">
        <input
          id="wd-assignment-completed"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />{" "}
        Completed
      </label>
      <hr />
      <h4>Module object</h4>
      <a
        id="wd-get-module"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <a
        id="wd-get-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />
      <h4>Modifying module name</h4>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
        <FormControl
          className="w-75"
          id="wd-module-name"
          defaultValue={moduleState.name}
          onChange={(e) =>
            setModuleState({ ...moduleState, name: e.target.value })
          }
        />
        <a
          id="wd-update-module-name"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name/${encodeURIComponent(moduleState.name)}`}
        >
          Update Module Name
        </a>
      </div>
      <hr />
      <h4>Modifying module description</h4>
      <div className="d-flex flex-wrap gap-2 align-items-start mb-2">
        <FormControl
          className="w-75"
          id="wd-module-description"
          as="textarea"
          rows={2}
          defaultValue={moduleState.description}
          onChange={(e) =>
            setModuleState({ ...moduleState, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary align-self-start"
          href={`${MODULE_API_URL}/description/${encodeURIComponent(moduleState.description)}`}
        >
          Update Module Description
        </a>
      </div>
      <hr />
    </div>
  );
}
