"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../database";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import LessonControlButtons from "../modules/LessonControlButtons";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (a: { course: string }) => a.course === cid
  );
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <span className="input-group-text">
            <FaMagnifyingGlass />
          </span>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
        <div className="d-flex">
          <Button
            variant="secondary"
            className="me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>
      <ListGroup className="rounded-0 mt-4" id="wd-assignments-list">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-assignments-title"
            className="wd-title p-3 ps-2 bg-secondary"
          >
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
            <div className="float-end d-flex align-items-center">
              <span className="border border-secondary rounded-pill px-3 me-2 text-dark bg-secondary">
                40% of Total
              </span>
              <Button variant="secondary" size="sm" className="me-2">
                +
              </Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((a) => (
                <ListGroupItem
                  key={a._id}
                  className="wd-lesson border-gray p-3 ps-1"
                >
                  <div className="d-flex align-items-start">
                    <BsGripVertical className="me-2 fs-3" />
                    <div className="flex-grow-1">
                      <Link
                        href={`/courses/${cid}/assignments/${a._id}`}
                        className="wd-assignment-link fw-bold text-danger"
                      >
                        {a.title}
                      </Link>
                      <div className="text-secondary small mt-1">
                        <span className="text-danger">Multiple Modules</span>
                        {"availableFrom" in a && a.availableFrom && (
                          <>
                            {" | "}
                            <strong>Not available until</strong>{" "}
                            {formatDate(a.availableFrom + "T00:00:00")}
                          </>
                        )}
                      </div>
                      <div className="small text-secondary">
                        {"dueDate" in a && a.dueDate && (
                          <>
                            <strong>Due</strong> {formatDate(a.dueDate + "T23:59:00")}
                          </>
                        )}
                        {"points" in a && a.points != null && (
                          <> | {a.points} pts</>
                        )}
                      </div>
                    </div>
                    <LessonControlButtons />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
