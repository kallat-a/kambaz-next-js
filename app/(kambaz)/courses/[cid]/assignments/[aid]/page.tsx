"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
  Row,
  Col,
} from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
    (a: { _id: string }) => a._id === aid
  ) as { title?: string; description?: string; points?: number; dueDate?: string; availableFrom?: string } | undefined;
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <div className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl
            id="wd-name"
            defaultValue={assignment?.title ?? ""}
            placeholder="Assignment Name"
          />
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="wd-description">Description</FormLabel>
          <FormControl
            as="textarea"
            id="wd-description"
            rows={10}
            defaultValue={assignment?.description ?? ""}
          />
        </div>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-points">
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="number"
              id="wd-points"
              defaultValue={assignment?.points ?? 100}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-assignment-group">
            Assignment Group
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-display-grade-as">
            Display Grade as
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-display-grade-as" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
              <option value="LETTER">Letter</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-submission-type">
            Submission Type
          </FormLabel>
          <Col sm={10}>
            <FormSelect id="wd-submission-type" defaultValue="ONLINE">
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </FormSelect>
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-text-entry"
              label="Text Entry"
              className="mt-2"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-website-url"
              label="Website URL"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-media-recording"
              label="Media Recording"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-student-annotation"
              label="Student Annotation"
            />
            <FormCheck
              type="checkbox"
              id="wd-online-entry-options-file-uploads"
              label="File Uploads"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-assign-to">
            Assign to
          </FormLabel>
          <Col sm={10}>
            <FormControl id="wd-assign-to" defaultValue="Everyone" />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-due-date">
            Due
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="date"
              id="wd-due-date"
              defaultValue={assignment?.dueDate ?? "2026-03-13"}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-available-from">
            Available from
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="date"
              id="wd-available-from"
              defaultValue={assignment?.availableFrom ?? "2026-02-06"}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={2} htmlFor="wd-until">
            Until
          </FormLabel>
          <Col sm={10}>
            <FormControl type="date" id="wd-until" defaultValue="2026-03-20" />
          </Col>
        </Row>
        <div className="mt-3">
          <Link href={`/courses/${cid}/assignments`}>
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          <Link href={`/courses/${cid}/assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
