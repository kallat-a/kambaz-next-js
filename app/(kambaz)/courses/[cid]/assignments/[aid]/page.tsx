"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../../../assignments/reducer";
import { useState, useEffect } from "react";
import { FormLabel, FormControl, Button, Row, Col } from "react-bootstrap";

const emptyAssignment = {
  title: "New Assignment",
  description: "",
  points: 100,
  dueDate: "2026-03-13",
  availableFrom: "2026-02-06",
  availableUntil: "2026-03-20",
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const existing = assignments.find((a: any) => a._id === aid);
  const isNew = aid === "new";

  const [title, setTitle] = useState(emptyAssignment.title);
  const [description, setDescription] = useState(emptyAssignment.description);
  const [points, setPoints] = useState(emptyAssignment.points);
  const [dueDate, setDueDate] = useState(emptyAssignment.dueDate);
  const [availableFrom, setAvailableFrom] = useState(
    emptyAssignment.availableFrom,
  );
  const [availableUntil, setAvailableUntil] = useState(
    emptyAssignment.availableUntil,
  );

  useEffect(() => {
    if (!isNew && existing) {
      setTitle(existing.title ?? emptyAssignment.title);
      setDescription(existing.description ?? "");
      setPoints(existing.points ?? 100);
      setDueDate(existing.dueDate ?? emptyAssignment.dueDate);
      setAvailableFrom(existing.availableFrom ?? emptyAssignment.availableFrom);
      setAvailableUntil(
        (existing as any).availableUntil ?? emptyAssignment.availableUntil,
      );
    }
  }, [isNew, existing]);

  const goBack = () => router.push(`/courses/${cid}/assignments`);

  const handleSave = () => {
    const payload = {
      title,
      description,
      points: Number(points),
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };
    if (isNew) {
      dispatch(addAssignment(payload));
    } else {
      dispatch(updateAssignment({ ...payload, _id: aid as string }));
    }
    goBack();
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Assignment Name"
        />
      </div>
      <div className="mb-3">
        <FormLabel htmlFor="wd-description">Description</FormLabel>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="New Assignment Description"
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
            value={points}
            onChange={(e) => setPoints(Number(e.target.value) || 0)}
          />
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <FormLabel column sm={2} htmlFor="wd-until">
          Until
        </FormLabel>
        <Col sm={10}>
          <FormControl
            type="date"
            id="wd-until"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <Button variant="secondary" className="me-2" onClick={goBack}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
