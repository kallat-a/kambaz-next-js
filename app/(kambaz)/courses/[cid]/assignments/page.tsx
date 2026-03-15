"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "../../assignments/reducer";
import { FaMagnifyingGlass, FaPlus, FaTrash } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import LessonControlButtons from "../modules/LessonControlButtons";
import { useState } from "react";

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

const EDITABLE_ROLES = ["FACULTY", "ADMIN", "TA"];

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const list = assignments.filter((a: any) => a.course === cid);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const canEdit =
    currentUser && EDITABLE_ROLES.includes((currentUser as any).role);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      dispatch(deleteAssignment(deleteTarget));
      setDeleteTarget(null);
    }
  };

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
        {canEdit && (
          <div className="d-flex">
            <Button
              variant="secondary"
              className="me-2"
              id="wd-add-assignment-group"
            >
              <FaPlus className="me-1" /> Group
            </Button>
            <Button
              variant="danger"
              id="wd-add-assignment"
              onClick={() => router.push(`/courses/${cid}/assignments/new`)}
            >
              <FaPlus className="me-1" /> Assignment
            </Button>
          </div>
        )}
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
            {list.map((a: any) => (
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
                      {a.availableFrom && (
                        <>
                          {" | "}
                          <strong>Not available until</strong>{" "}
                          {formatDate(a.availableFrom + "T00:00:00")}
                        </>
                      )}
                    </div>
                    <div className="small text-secondary">
                      {a.dueDate && (
                        <>
                          <strong>Due</strong>{" "}
                          {formatDate(a.dueDate + "T23:59:00")}
                        </>
                      )}
                      {a.points != null && <> | {a.points} pts</>}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <LessonControlButtons />
                    {canEdit && (
                      <FaTrash
                        className="text-danger ms-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setDeleteTarget(a._id)}
                        title="Delete assignment"
                      />
                    )}
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={!!deleteTarget} onHide={() => setDeleteTarget(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove assignment?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
