import Link from "next/link";
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

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
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
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/123`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <div className="text-secondary small mt-1">
                    Multiple Modules | <strong>Not available until</strong> May
                    6 at 12:00am
                  </div>
                  <div className="small text-secondary">
                    Due May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/124`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <div className="text-secondary small mt-1">
                    Multiple Modules | <strong>Not available until</strong> May
                    13 at 12:00am
                  </div>
                  <div className="small text-secondary">
                    Due May 20 at 11:59pm | 100 pts
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/125`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <div className="text-secondary small mt-1">
                    Multiple Modules | <strong>Not available until</strong> May
                    20 at 12:00am
                  </div>
                  <div className="small text-secondary">
                    Due May 27 at 11:59pm | 100 pts
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-quizzes-title"
            className="wd-title p-3 ps-2 bg-secondary"
          >
            <BsGripVertical className="me-2 fs-3" /> QUIZZES
            <div className="float-end d-flex align-items-center">
              <span className="border border-secondary rounded-pill px-3 me-2 text-dark bg-secondary">
                10% of Total
              </span>
              <Button variant="secondary" size="sm" className="me-2">
                +
              </Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/126`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    Q1 - HTML
                  </Link>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/127`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    Q2 - CSS
                  </Link>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-exams-title"
            className="wd-title p-3 ps-2 bg-secondary"
          >
            <BsGripVertical className="me-2 fs-3" /> EXAMS
            <div className="float-end d-flex align-items-center">
              <span className="border border-secondary rounded-pill px-3 me-2 text-dark bg-secondary">
                20% of Total
              </span>
              <Button variant="secondary" size="sm" className="me-2">
                +
              </Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/128`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    Midterm
                  </Link>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/129`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    Final
                  </Link>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-project-title"
            className="wd-title p-3 ps-2 bg-secondary"
          >
            <BsGripVertical className="me-2 fs-3" /> PROJECT
            <div className="float-end d-flex align-items-center">
              <span className="border border-secondary rounded-pill px-3 me-2 text-dark bg-secondary">
                30% of Total
              </span>
              <Button variant="secondary" size="sm" className="me-2">
                +
              </Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson border-gray p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/130`}
                    className="wd-assignment-link fw-bold text-danger"
                  >
                    Project
                  </Link>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
