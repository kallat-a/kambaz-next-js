"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import {
  FaRegCalendar,
  FaParagraph,
  FaPen,
  FaXmark,
} from "react-icons/fa6";
import * as quizzesClient from "../../client";
import "../../quiz-canvas.css";

function FakeRichTextChrome() {
  return (
    <>
      <div className="wd-quiz-fake-menubar">
        Edit &nbsp; View &nbsp; Insert &nbsp; Format &nbsp; Tools &nbsp; Table
      </div>
      <div className="wd-quiz-fake-toolbar">
        <span>12pt</span>
        <FaParagraph className="text-secondary" title="Paragraph" aria-hidden />
        <strong>B</strong>
        <em>I</em>
        <span style={{ textDecoration: "underline" }}>U</span>
        <span>A</span>
        <FaPen className="text-secondary" title="Highlight" aria-hidden />
        <span>
          T<sup>2</sup>
        </span>
        <span className="ms-auto text-muted small">...</span>
      </div>
    </>
  );
}

export default function QuizEditDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const courseId = cid as string;
  const quizId = qid as string;
  const [quiz, setQuiz] = useState<any>(null);
  const [timeLimitOn, setTimeLimitOn] = useState(true);

  useEffect(() => {
    if (!quizId) return;
    let cancelled = false;
    (async () => {
      try {
        const q = await quizzesClient.findQuizById(quizId);
        if (!cancelled) {
          setQuiz(q);
          setTimeLimitOn((q?.timeLimitMinutes ?? 0) > 0);
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [quizId]);

  if (!quiz) return <p id="wd-quiz-edit-loading">Loading...</p>;

  const totalPoints =
    (quiz.questions || []).reduce(
      (s: number, x: any) => s + (Number(x.points) || 0),
      0,
    ) || 0;

  const handleSave = async (publish?: boolean) => {
    try {
      const payload = { ...quiz, published: publish ? true : quiz.published };
      await quizzesClient.updateQuiz(quizId, payload);
      if (publish) {
        router.push(`/courses/${courseId}/quizzes`);
      } else {
        router.push(`/courses/${courseId}/quizzes/${quizId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const goCancel = () => router.push(`/courses/${courseId}/quizzes`);

  return (
    <Form
      id="wd-quiz-edit-form"
      className="bg-white"
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Group className="mb-3">
        <FormControl
          className="form-control-lg"
          id="wd-quiz-edit-title"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Quiz Instructions:</Form.Label>
        <div className="wd-quiz-instructions-editor rounded-bottom overflow-hidden">
          <FakeRichTextChrome />
          <FormControl
            as="textarea"
            id="wd-quiz-edit-instructions"
            value={quiz.description || ""}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            placeholder="Add quiz instructions for students..."
          />
        </div>
        <div className="d-flex justify-content-between align-items-center small text-muted mt-1 px-1">
          <span>p</span>
          <span>0 words</span>
        </div>
      </Form.Group>

      <div className="row wd-quiz-form-row align-items-center">
        <div className="col-sm-4 col-md-3 wd-quiz-label-col">
          <Form.Label className="mb-0">Quiz Type</Form.Label>
        </div>
        <div className="col-sm-8 col-md-9">
          <select
            className="form-select"
            id="wd-quiz-edit-type"
            value={quiz.quizType}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
          >
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </select>
        </div>
      </div>

      <div className="row wd-quiz-form-row align-items-center">
        <div className="col-sm-4 col-md-3 wd-quiz-label-col">
          <Form.Label className="mb-0">Assignment Group</Form.Label>
        </div>
        <div className="col-sm-8 col-md-9">
          <select
            className="form-select"
            id="wd-quiz-edit-group"
            value={quiz.assignmentGroup}
            onChange={(e) =>
              setQuiz({ ...quiz, assignmentGroup: e.target.value })
            }
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </select>
        </div>
      </div>

      <div className="row wd-quiz-form-row align-items-center">
        <div className="col-sm-4 col-md-3 wd-quiz-label-col">
          <Form.Label className="mb-0" htmlFor="wd-quiz-edit-points-readonly">
            Points
          </Form.Label>
        </div>
        <div className="col-sm-8 col-md-9">
          <FormControl
            id="wd-quiz-edit-points-readonly"
            readOnly
            plaintext
            className="bg-light"
            value={String(totalPoints)}
            tabIndex={-1}
          />
          <Form.Text className="text-muted">
            Total points (sum of all questions). Change points in the Questions
            tab.
          </Form.Text>
        </div>
      </div>

      <div className="mt-3 mb-2 fw-semibold small text-secondary">Options</div>
      <FormCheck
        type="checkbox"
        className="mb-2"
        label="Shuffle Answers"
        checked={!!quiz.shuffleAnswers}
        onChange={(e) =>
          setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
        }
      />
      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
        <FormCheck
          type="checkbox"
          id="wd-quiz-time-limit-toggle"
          label="Time Limit"
          checked={timeLimitOn}
          onChange={(e) => {
            const on = e.target.checked;
            setTimeLimitOn(on);
            if (!on) {
              setQuiz({ ...quiz, timeLimitMinutes: 0 });
            } else {
              setQuiz({
                ...quiz,
                timeLimitMinutes: quiz.timeLimitMinutes || 20,
              });
            }
          }}
        />
        {timeLimitOn && (
          <div className="d-flex align-items-center gap-2">
            <FormControl
              type="number"
              min={1}
              className="d-inline-block"
              style={{ width: "4.5rem" }}
              value={quiz.timeLimitMinutes ?? 20}
              onChange={(e) =>
                setQuiz({ ...quiz, timeLimitMinutes: Number(e.target.value) })
              }
            />
            <span className="small text-muted">Minutes</span>
          </div>
        )}
      </div>

      <div className="border rounded p-3 mb-3 bg-light">
        <FormCheck
          type="checkbox"
          label="Allow Multiple Attempts"
          checked={!!quiz.multipleAttempts}
          onChange={(e) =>
            setQuiz({ ...quiz, multipleAttempts: e.target.checked })
          }
        />
        {quiz.multipleAttempts && (
          <Form.Group className="mt-2 mb-0">
            <Form.Label className="small">How many attempts</Form.Label>
            <FormControl
              type="number"
              min={1}
              style={{ maxWidth: "8rem" }}
              value={quiz.howManyAttempts ?? 1}
              onChange={(e) =>
                setQuiz({ ...quiz, howManyAttempts: Number(e.target.value) })
              }
            />
          </Form.Group>
        )}
      </div>

      <details className="mb-3 small">
        <summary className="text-secondary cursor-pointer">
          More quiz options
        </summary>
        <div className="mt-2 ps-2 border-start">
          <Form.Group className="mb-2">
            <Form.Label>Show correct answers</Form.Label>
            <FormControl
              value={quiz.showCorrectAnswers || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
              }
              placeholder="e.g. AFTER_LAST_ATTEMPT"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Access code</Form.Label>
            <FormControl
              value={quiz.accessCode || ""}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
            />
          </Form.Group>
          <FormCheck
            type="checkbox"
            className="mb-2"
            label="One question at a time"
            checked={!!quiz.oneQuestionAtATime}
            onChange={(e) =>
              setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
            }
          />
          <FormCheck
            type="checkbox"
            className="mb-2"
            label="Webcam required"
            checked={!!quiz.webcamRequired}
            onChange={(e) =>
              setQuiz({ ...quiz, webcamRequired: e.target.checked })
            }
          />
          <FormCheck
            type="checkbox"
            className="mb-2"
            label="Lock questions after answering"
            checked={!!quiz.lockQuestionsAfterAnswering}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                lockQuestionsAfterAnswering: e.target.checked,
              })
            }
          />
        </div>
      </details>

      <div className="row g-3 mb-4">
        <div className="col-auto pt-1 d-none d-md-block text-end fw-bold small text-secondary">
          Assign
        </div>
        <div className="col">
          <div className="wd-quiz-assign-card">
            <div className="fw-bold small mb-2 d-md-none">Assign</div>
            <Form.Group className="mb-3">
              <Form.Label>Assign to</Form.Label>
              <div>
                <span className="wd-quiz-pill-everyone">
                  Everyone
                  <button
                    type="button"
                    className="btn btn-link p-0 lh-1 text-secondary"
                    aria-label="Remove assignee"
                  >
                    <FaXmark />
                  </button>
                </span>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due</Form.Label>
              <InputGroup>
                <FormControl
                  type="date"
                  value={(quiz.dueDate || "").slice(0, 10)}
                  onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                />
                <Button variant="outline-secondary" type="button" tabIndex={-1}>
                  <FaRegCalendar />
                </Button>
              </InputGroup>
            </Form.Group>
            <div className="row g-2">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Available from</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="date"
                      value={(quiz.availableDate || "").slice(0, 10)}
                      onChange={(e) =>
                        setQuiz({ ...quiz, availableDate: e.target.value })
                      }
                    />
                    <Button variant="outline-secondary" type="button" tabIndex={-1}>
                      <FaRegCalendar />
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="date"
                      value={(quiz.untilDate || "").slice(0, 10)}
                      onChange={(e) =>
                        setQuiz({ ...quiz, untilDate: e.target.value })
                      }
                    />
                    <Button variant="outline-secondary" type="button" tabIndex={-1}>
                      <FaRegCalendar />
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="wd-quiz-assign-footer text-center">
              <button type="button" className="btn btn-link wd-quiz-link-red p-0">
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      <div className="d-flex flex-wrap gap-2 pb-4">
        <Button variant="light" className="border-secondary px-4" onClick={goCancel}>
          Cancel
        </Button>
        <Button
          className="wd-quiz-btn-crimson px-4"
          onClick={() => handleSave(false)}
        >
          Save
        </Button>
        <Button variant="outline-danger" onClick={() => handleSave(true)}>
          Save &amp; Publish
        </Button>
      </div>
    </Form>
  );
}
