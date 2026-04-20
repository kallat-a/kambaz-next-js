"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { RootState } from "../../../../store";
import * as quizzesClient from "../client";
import { availabilityLabel } from "../utils";

const EDITABLE_ROLES = ["FACULTY", "ADMIN", "TA"];

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const canEdit =
    currentUser && EDITABLE_ROLES.includes((currentUser as any).role);

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

  if (!quiz) {
    return <p id="wd-quiz-details-loading">Loading...</p>;
  }

  const avail = availabilityLabel(quiz);
  const canTake = !canEdit && quiz.published && avail === "Available";

  const points =
    (quiz.questions || []).reduce(
      (s: number, x: any) => s + (Number(x.points) || 0),
      0,
    ) || 0;

  const handleTogglePublish = async () => {
    try {
      const updated = await quizzesClient.updateQuiz(quizId, {
        ...quiz,
        published: !quiz.published,
      });
      setQuiz(updated);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="wd-quiz-details">
      <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
        <h2 id="wd-quiz-details-title">{quiz.title}</h2>
        <div className="d-flex gap-2 flex-wrap">
          <Link
            href={`/courses/${courseId}/quizzes`}
            className="btn btn-secondary"
          >
            Quiz list
          </Link>
          {canEdit && (
            <>
              <Button
                variant={quiz.published ? "outline-secondary" : "success"}
                id="wd-quiz-details-publish"
                onClick={handleTogglePublish}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>
              <Link
                href={`/courses/${courseId}/quizzes/${quizId}/preview`}
                className="btn btn-primary"
              >
                Preview
              </Link>
              <Link
                href={`/courses/${courseId}/quizzes/${quizId}/edit`}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </>
          )}
          {!canEdit && canTake && (
            <Link
              href={`/courses/${courseId}/quizzes/${quizId}/take`}
              className="btn btn-success"
            >
              Start quiz
            </Link>
          )}
        </div>
      </div>

      <Table bordered size="sm" className="bg-white" id="wd-quiz-details-table">
        <tbody>
          <tr>
            <td>Quiz Type</td>
            <td>{quiz.quizType?.replace(/_/g, " ") || "GRADED QUIZ"}</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>{points}</td>
          </tr>
          <tr>
            <td>Assignment Group</td>
            <td>{quiz.assignmentGroup || "Quizzes"}</td>
          </tr>
          <tr>
            <td>Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Time Limit</td>
            <td>{quiz.timeLimitMinutes ?? 20} Minutes</td>
          </tr>
          <tr>
            <td>Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>How Many Attempts</td>
            <td>{quiz.howManyAttempts ?? 1}</td>
          </tr>
          <tr>
            <td>Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers || "AFTER_LAST_ATTEMPT"}</td>
          </tr>
          <tr>
            <td>Access Code</td>
            <td>{quiz.accessCode || "(none)"}</td>
          </tr>
          <tr>
            <td>One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Due</td>
            <td>{quiz.dueDate || "—"}</td>
          </tr>
          <tr>
            <td>Available from</td>
            <td>{quiz.availableDate || "—"}</td>
          </tr>
          <tr>
            <td>Until</td>
            <td>{quiz.untilDate || "—"}</td>
          </tr>
          <tr>
            <td>Availability</td>
            <td>{availabilityLabel(quiz)}</td>
          </tr>
        </tbody>
      </Table>

      {canEdit && (
        <div
          id="wd-quiz-details-description"
          className="border p-2 mt-3 bg-light"
          dangerouslySetInnerHTML={{
            __html: quiz.description || "<p><em>No description</em></p>",
          }}
        />
      )}
    </div>
  );
}
