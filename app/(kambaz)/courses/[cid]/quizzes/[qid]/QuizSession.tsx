"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Button,
  FormControl,
  FormCheck,
  Form,
  Alert,
  Card,
} from "react-bootstrap";
import {
  FaPencil,
  FaCheck,
  FaXmark,
  FaCircleInfo,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import * as quizzesClient from "../client";
import "../quiz-canvas.css";

type Mode = "preview" | "take";

function parseMcAnswer(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const p = JSON.parse(raw);
    if (Array.isArray(p)) return p.map(String);
  } catch {}
  return [String(raw)];
}

export default function QuizSession({
  courseId,
  quizId,
  mode,
}: {
  courseId: string;
  quizId: string;
  mode: Mode;
}) {
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [accessCode, setAccessCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [savedAt] = useState(() => new Date());

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

  const qs = quiz?.questions || [];
  const oneAt = !!quiz?.oneQuestionAtATime;
  const visible = !oneAt ? qs : qs[step] ? [qs[step]] : [];

  const startedLabel = useMemo(
    () =>
      savedAt.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    [savedAt],
  );

  const savedLabel = useMemo(
    () =>
      savedAt.toLocaleString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }),
    [savedAt],
  );

  const setAns = (questionId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const toggleMcChoice = (questionId: string, choiceId: string, checked: boolean) => {
    setAnswers((prev) => {
      const cur = parseMcAnswer(prev[questionId]);
      const s = new Set(cur);
      if (checked) s.add(choiceId);
      else s.delete(choiceId);
      return { ...prev, [questionId]: JSON.stringify([...s]) };
    });
  };

  const handleSubmit = async () => {
    setSubmitError("");
    const payload = {
      answers: qs.map((q: any) => {
        let value = answers[q._id] ?? "";
        if (q.type === "MULTIPLE_CHOICE") {
          const arr = parseMcAnswer(value);
          value = JSON.stringify(arr);
        }
        return { questionId: q._id, value };
      }),
      accessCode: accessCode || undefined,
      preview: mode === "preview",
    };
    try {
      const data = await quizzesClient.submitQuizAttempt(quizId, payload);
      setResult(data);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Could not submit quiz.";
      console.error(e);
      setSubmitError(msg);
    }
  };

  if (!quiz) {
    return <p id="wd-quiz-session-loading">Loading...</p>;
  }

  if (result) {
    const resMap = new Map(
      (result.results || []).map((r: any) => [r.questionId, r]),
    );
    return (
      <div id="wd-quiz-session-results" className="wd-quiz-preview-shell">
        <h3 className="h5 fw-bold mb-3">Results</h3>
        <Alert variant="info">
          Score: {result.score} / {result.maxScore}
        </Alert>
        {qs.map((q: any) => {
          const r = resMap.get(q._id) as { correct?: boolean } | undefined;
          const ok = r?.correct;
          return (
            <Card
              key={q._id}
              className={`mb-2 wd-quiz-preview-card ${ok ? "border-success" : "border-danger"}`}
            >
              <Card.Body>
                <div className="fw-bold d-flex align-items-center gap-2">
                  {ok ? (
                    <FaCheck className="text-success flex-shrink-0" title="Correct" />
                  ) : (
                    <FaXmark className="text-danger flex-shrink-0" title="Incorrect" />
                  )}
                  <span>{q.title}</span>
                </div>
                <div
                  className="small text-muted"
                  dangerouslySetInnerHTML={{ __html: q.question || "" }}
                />
              </Card.Body>
            </Card>
          );
        })}
        {mode === "preview" && (
          <Link
            href={`/courses/${courseId}/quizzes/${quizId}/edit/questions`}
            className="btn btn-outline-secondary mt-2"
          >
            <FaPencil className="me-2" />
            Keep Editing This Quiz
          </Link>
        )}
        {mode === "take" && (
          <Link
            href={`/courses/${courseId}/quizzes/${quizId}`}
            className="btn btn-secondary mt-2"
          >
            Back to quiz
          </Link>
        )}
      </div>
    );
  }

  const shellClass =
    mode === "preview"
      ? "wd-quiz-preview-shell"
      : "wd-quiz-preview-shell border-secondary";

  const mainColClass =
    oneAt && qs.length > 0 ? "col-12 col-lg-9" : "col-12";

  return (
    <div id="wd-quiz-session" className={shellClass}>
      <h2 className="h4 fw-bold mb-3">{quiz.title}</h2>
      {mode === "preview" && (
        <Alert variant="warning" className="d-flex align-items-start gap-2 py-2 small">
          <FaCircleInfo className="fs-5 lh-1 flex-shrink-0 mt-1" aria-hidden />
          <span>This is a preview of the published version of the quiz.</span>
        </Alert>
      )}
      <p className="small text-muted mb-2">Started: {startedLabel}</p>

      {submitError && (
        <p className="text-danger small" id="wd-quiz-session-error">
          {submitError}
        </p>
      )}
      {quiz.accessCode && mode === "take" && (
        <Form.Group className="mb-3">
          <Form.Label>Access code</Form.Label>
          <FormControl
            id="wd-quiz-access-code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
        </Form.Group>
      )}

      <h3 className="h6 fw-bold mt-3 mb-0">Quiz Instructions</h3>
      <hr className="mt-2 mb-3" />
      {quiz.description ? (
        <div
          className="small mb-4"
          dangerouslySetInnerHTML={{ __html: quiz.description }}
        />
      ) : (
        <p className="small text-muted mb-4">No instructions.</p>
      )}

      <div className="row g-3">
        {oneAt && qs.length > 0 && (
          <div className="col-12 col-lg-3">
            <div
              className="border rounded p-2 small bg-light"
              id="wd-quiz-preview-nav"
            >
              <div className="fw-semibold mb-2">Questions</div>
              <div className="d-flex flex-column gap-1">
                {qs.map((qq: any, i: number) => (
                  <button
                    key={qq._id}
                    type="button"
                    className={`btn w-100 text-start btn-sm text-truncate ${
                      i === step ? "btn-secondary" : "btn-outline-secondary"
                    }`}
                    onClick={() => setStep(i)}
                  >
                    {i + 1}. {qq.title || "Untitled"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={mainColClass}>
          {oneAt && (
            <div className="mb-2 text-secondary small">
              Question {Math.min(step + 1, qs.length)} / {qs.length}
            </div>
          )}

          {visible.map((q: any) => {
            const globalIdx = oneAt ? step : qs.indexOf(q);
            const selectedMc = parseMcAnswer(answers[q._id]);
            const nFibBlank =
              q.fibBlanks && q.fibBlanks.length ? q.fibBlanks.length : 1;
            let fibParts: string[] = Array.from(
              { length: nFibBlank },
              () => "",
            );
            try {
              const p = JSON.parse(answers[q._id] || "[]");
              if (Array.isArray(p)) {
                fibParts = p.map((x: unknown) => String(x ?? ""));
              }
            } catch {
              if (nFibBlank === 1) {
                fibParts = [answers[q._id] || ""];
              }
            }
            while (fibParts.length < nFibBlank) fibParts.push("");
            fibParts = fibParts.slice(0, nFibBlank);

            return (
              <Card key={q._id} className="mb-3 wd-quiz-preview-card">
                <Card.Header className="d-flex justify-content-between align-items-center py-2 small">
                  <span className="fw-bold">Question {globalIdx + 1}</span>
                  <span>{q.points} pts</span>
                </Card.Header>
                <Card.Body className="pt-3 pb-2">
                  <div
                    className="mb-3"
                    dangerouslySetInnerHTML={{ __html: q.question || "" }}
                  />
                  {q.type === "MULTIPLE_CHOICE" &&
                    (q.mcChoices || []).map((c: any) => (
                      <div key={c._id} className="wd-quiz-preview-option">
                        <FormCheck
                          type="checkbox"
                          id={`${q._id}-${c._id}`}
                          label={
                            <span
                              dangerouslySetInnerHTML={{
                                __html: c.text || "",
                              }}
                            />
                          }
                          checked={selectedMc.includes(c._id)}
                          onChange={(e) =>
                            toggleMcChoice(q._id, c._id, e.target.checked)
                          }
                        />
                      </div>
                    ))}
                  {q.type === "TRUE_FALSE" && (
                    <>
                      <div className="wd-quiz-preview-option">
                        <FormCheck
                          type="radio"
                          name={`ans-${q._id}`}
                          label="True"
                          checked={answers[q._id] === "true"}
                          onChange={() => setAns(q._id, "true")}
                        />
                      </div>
                      <div className="wd-quiz-preview-option">
                        <FormCheck
                          type="radio"
                          name={`ans-${q._id}`}
                          label="False"
                          checked={answers[q._id] === "false"}
                          onChange={() => setAns(q._id, "false")}
                        />
                      </div>
                    </>
                  )}
                  {q.type === "FILL_BLANK" &&
                    fibParts.map((val, i) => (
                      <Form.Group key={i} className="mb-2">
                        <Form.Label className="small text-muted">
                          Blank {i + 1}
                        </Form.Label>
                        <FormControl
                          value={val}
                          onChange={(e) => {
                            const next = [...fibParts];
                            next[i] = e.target.value;
                            setAns(q._id, JSON.stringify(next));
                          }}
                          placeholder={`Answer for blank ${i + 1}`}
                        />
                      </Form.Group>
                    ))}
                </Card.Body>
              </Card>
            );
          })}

          {oneAt && qs.length > 0 && (
            <div className="d-flex justify-content-between mb-2">
              <Button
                variant="light"
                className="border-secondary d-inline-flex align-items-center gap-1"
                disabled={step <= 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <FaChevronLeft aria-hidden />
                Previous
              </Button>
              <Button
                variant="light"
                className="border-secondary d-inline-flex align-items-center gap-1"
                disabled={step >= qs.length - 1}
                onClick={() => setStep((s) => Math.min(qs.length - 1, s + 1))}
              >
                Next
                <FaChevronRight aria-hidden />
              </Button>
            </div>
          )}

          {!oneAt && qs.length > 0 && (
            <div className="d-flex justify-content-end mb-2">
              <Button
                variant="light"
                className="border-secondary d-inline-flex align-items-center gap-1"
                disabled
              >
                Next
                <FaChevronRight aria-hidden />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="wd-quiz-submit-bar">
        <span className="small text-muted me-auto">
          Quiz saved at {savedLabel}
        </span>
        <Button
          variant="light"
          className="border-secondary"
          id="wd-quiz-submit"
          onClick={handleSubmit}
        >
          Submit Quiz
        </Button>
      </div>

      {mode === "preview" && (
        <Link
          href={`/courses/${courseId}/quizzes/${quizId}/edit/questions`}
          className="btn btn-outline-secondary w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
        >
          <FaPencil />
          Keep Editing This Quiz
        </Link>
      )}
    </div>
  );
}
