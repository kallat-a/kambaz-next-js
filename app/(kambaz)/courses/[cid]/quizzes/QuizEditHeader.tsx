"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Form } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import * as quizzesClient from "./client";
import "./quiz-canvas.css";

export default function QuizEditHeader() {
  const { qid } = useParams();
  const quizId = qid as string;
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (!quizId) return;
    let cancelled = false;
    (async () => {
      try {
        const q = await quizzesClient.findQuizById(quizId);
        if (!cancelled) {
          setQuiz(q);
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [quizId]);

  const totalPoints =
    (quiz?.questions || []).reduce(
      (s: number, x: any) => s + (Number(x.points) || 0),
      0,
    ) ?? 0;

  return (
    <div className="wd-quiz-edit-topbar d-flex justify-content-end align-items-center gap-3 small text-secondary mb-2">
      <span id="wd-quiz-edit-points" className="text-dark">
        Points {totalPoints}
      </span>
      <div
        id="wd-quiz-edit-publish-status"
        className="d-flex align-items-center gap-2 text-dark"
      >
        <Form.Check
          type="checkbox"
          id="wd-quiz-edit-published-check"
          className="wd-quiz-published-checkbox mb-0"
          checked={!!quiz?.published}
          disabled
          tabIndex={-1}
          aria-label={quiz?.published ? "Published" : "Not published"}
        />
        <span className="small">
          {quiz?.published ? "Published" : "Not published"}
        </span>
      </div>
      <button
        type="button"
        className="btn btn-link p-0 text-secondary"
        aria-label="More options"
      >
        <IoEllipsisVertical className="fs-4" />
      </button>
    </div>
  );
}
