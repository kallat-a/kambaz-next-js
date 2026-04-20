"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  Button,
  Dropdown,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import * as quizzesClient from "./client";
import { availabilityLabel } from "./utils";
import "./quiz-canvas.css";
import LessonControlButtons from "../modules/LessonControlButtons";

const EDITABLE_ROLES = ["FACULTY", "ADMIN", "TA"];

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const courseId = cid as string;
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const canEdit =
    currentUser && EDITABLE_ROLES.includes((currentUser as any).role);

  const [rows, setRows] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("available");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const loadQuizzes = async () => {
    const data = await quizzesClient.findQuizzesForCourse(courseId);
    setRows(data);
  };

  useEffect(() => {
    if (!courseId) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await quizzesClient.findQuizzesForCourse(courseId);
        if (!cancelled) {
          setRows(data);
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const sorted = [...rows].sort((a, b) => {
    if (sortBy === "name") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (sortBy === "due") {
      return (a.dueDate || "").localeCompare(b.dueDate || "");
    }
    return (a.availableDate || "").localeCompare(b.availableDate || "");
  });

  const handleTogglePublish = async (quizId: string) => {
    try {
      const full = await quizzesClient.findQuizById(quizId);
      await quizzesClient.updateQuiz(quizId, {
        ...full,
        published: !full.published,
      });
      await loadQuizzes();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await quizzesClient.deleteQuiz(deleteTarget);
      await loadQuizzes();
    } catch (e) {
      console.error(e);
    }
    setDeleteTarget(null);
  };

  const handleAddQuiz = async () => {
    try {
      const q = await quizzesClient.createQuiz(courseId, {});
      router.push(`/courses/${courseId}/quizzes/${q._id}/edit`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 id="wd-quizzes-title">Quizzes</h2>
        <div className="d-flex gap-2 align-items-center flex-wrap">
          <select
            id="wd-quizzes-sort"
            className="form-select"
            style={{ width: "200px" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by name</option>
            <option value="due">Sort by due date</option>
            <option value="available">Sort by available date</option>
          </select>
          {canEdit && (
            <Button
              variant="danger"
              id="wd-add-quiz"
              onClick={handleAddQuiz}
            >
              <FaPlus className="me-1" /> Quiz
            </Button>
          )}
        </div>
      </div>

      {rows.length === 0 && (
        <p id="wd-quizzes-empty" className="text-muted">
          No quizzes yet.{" "}
          {canEdit
            ? "Click + Quiz to create one."
            : "Check back later."}
        </p>
      )}

      <ListGroup className="rounded-0 mt-2" id="wd-quizzes-list">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div
            id="wd-quizzes-list-header"
            className="wd-title p-3 ps-2 bg-secondary"
          >
            <BsGripVertical className="me-2 fs-3" /> QUIZZES
            <div className="float-end d-flex align-items-center">
              <LessonControlButtons />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {sorted.map((q: any) => (
              <ListGroupItem
                key={q._id}
                className="wd-lesson border-gray p-3 ps-1"
              >
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3" />
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <Form.Check
                        type="checkbox"
                        id={`wd-quiz-publish-${q._id}`}
                        className="wd-quiz-published-checkbox"
                        checked={!!q.published}
                        disabled={!canEdit}
                        onChange={() => {
                          if (canEdit) {
                            handleTogglePublish(q._id);
                          }
                        }}
                        title={q.published ? "Published — click to unpublish" : "Not published — click to publish"}
                        aria-label={
                          q.published
                            ? "Published; click to unpublish"
                            : "Not published; click to publish"
                        }
                      />
                      <Link
                        href={`/courses/${courseId}/quizzes/${q._id}`}
                        className="wd-quiz-link fw-bold text-danger"
                      >
                        {q.title}
                      </Link>
                    </div>
                    <div className="text-secondary small mt-1">
                      <strong>Availability</strong>{" "}
                      {availabilityLabel(q)}
                    </div>
                    <div className="small text-secondary">
                      <strong>Due</strong> {q.dueDate || "—"}
                      {" | "}
                      <strong>Points</strong> {q.points ?? 0}
                      {" | "}
                      <strong>Questions</strong> {q.questionCount ?? 0}
                      {!canEdit &&
                        q.lastScore != null &&
                        ` | Last score: ${q.lastScore}/${q.lastMaxScore ?? q.points}`}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <LessonControlButtons />
                    {canEdit && (
                      <>
                        <Dropdown align="end" className="ms-2">
                          <Dropdown.Toggle
                            variant="light"
                            size="sm"
                            id={`wd-quiz-menu-${q._id}`}
                            className="p-0 border-0 bg-transparent"
                          >
                            <IoEllipsisVertical className="fs-4" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={`/courses/${courseId}/quizzes/${q._id}/edit`}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => setDeleteTarget(q._id)}
                              className="text-danger"
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleTogglePublish(q._id)}
                            >
                              {q.published ? "Unpublish" : "Publish"}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
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
          <Modal.Title>Remove quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this quiz? This action cannot be
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
