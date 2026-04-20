"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, FormCheck, FormControl, Card } from "react-bootstrap";
import {
  FaPlus,
  FaPencil,
  FaTrash,
  FaParagraph,
  FaPen,
} from "react-icons/fa6";
import * as quizzesClient from "../../../client";
import "../../../quiz-canvas.css";

function newId() {
  return crypto.randomUUID();
}

function mcCorrectIds(q: any): string[] {
  if (q.correctMcChoiceIds && q.correctMcChoiceIds.length) {
    return [...q.correctMcChoiceIds];
  }
  if (q.correctMcChoiceId) {
    return [q.correctMcChoiceId];
  }
  return [];
}

function fibBlanksForDisplay(q: any) {
  if (q.fibBlanks && q.fibBlanks.length) {
    return q.fibBlanks;
  }
  if (q.fibCorrectAnswers && q.fibCorrectAnswers.length) {
    return [
      {
        _id: `${q._id}-legacy-blank`,
        correctAnswers: [...q.fibCorrectAnswers],
      },
    ];
  }
  return [{ _id: `${q._id}-b0`, correctAnswers: [""] }];
}

function normalizeQuestionForSave(qn: any) {
  if (qn.type === "MULTIPLE_CHOICE") {
    const valid = new Set((qn.mcChoices || []).map((c: any) => c._id));
    let ids = mcCorrectIds(qn).filter((id) => valid.has(id));
    if (!ids.length && qn.mcChoices?.length) {
      ids = [qn.mcChoices[0]._id];
    }
    return {
      ...qn,
      correctMcChoiceIds: ids,
      correctMcChoiceId: ids[0] || "",
    };
  }
  if (qn.type === "FILL_BLANK") {
    const raw = fibBlanksForDisplay(qn);
    const fibBlanks = raw.map((b: any) => ({
      _id: b._id || newId(),
      correctAnswers:
        (b.correctAnswers || []).length > 0
          ? [...b.correctAnswers]
          : [""],
    }));
    return { ...qn, fibBlanks, fibCorrectAnswers: [] };
  }
  return qn;
}

const defaultMc = () => {
  const c1 = { _id: newId(), text: "Choice A" };
  const c2 = { _id: newId(), text: "Choice B" };
  return {
    _id: newId(),
    type: "MULTIPLE_CHOICE",
    title: "New question",
    points: 1,
    question: "",
    mcChoices: [c1, c2],
    correctMcChoiceIds: [c1._id],
    correctMcChoiceId: c1._id,
  };
};

const defaultTf = () => ({
  _id: newId(),
  type: "TRUE_FALSE",
  title: "True / False",
  points: 1,
  question: "",
  correctTrueFalse: true,
});

const defaultFib = () => ({
  _id: newId(),
  type: "FILL_BLANK",
  title: "Fill in blank",
  points: 1,
  question: "",
  fibBlanks: [{ _id: newId(), correctAnswers: [""] }],
  fibCorrectAnswers: [],
});

function FakeQuestionToolbar() {
  return (
    <>
      <div className="wd-quiz-fake-menubar rounded-top">
        Edit &nbsp; View &nbsp; Insert &nbsp; Format &nbsp; Tools &nbsp; Table
      </div>
      <div className="wd-quiz-fake-toolbar">
        <span>12pt</span>
        <FaParagraph className="text-secondary" title="Paragraph" aria-hidden />
        <strong>B</strong>
        <em>I</em>
        <span style={{ textDecoration: "underline" }}>U</span>
        <FaPen className="text-secondary" title="Highlight" aria-hidden />
        <span className="ms-auto text-muted small">...</span>
      </div>
    </>
  );
}

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const courseId = cid as string;
  const quizId = qid as string;
  const [quiz, setQuiz] = useState<any>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadQuestions = async () => {
    try {
      const q = await quizzesClient.findQuizById(quizId);
      setQuiz(q);
    } catch (e) {
      console.error(e);
    }
  };

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

  if (!quiz) return <p id="wd-quiz-questions-loading">Loading...</p>;

  const questions = quiz.questions || [];
  const totalPoints = questions.reduce(
    (s: number, x: any) => s + (Number(x.points) || 0),
    0,
  );

  const persistQuestions = async (next: any[]) => {
    try {
      const payload = { ...quiz, questions: next };
      await quizzesClient.updateQuiz(quizId, payload);
      setQuiz(payload);
    } catch (e) {
      console.error(e);
    }
  };

  const addQuestion = async () => {
    const qn = defaultMc();
    await persistQuestions([...questions, qn]);
    setEditingId(qn._id);
  };

  const updateQuestionLocal = (id: string, fn: (q: any) => any) => {
    setQuiz((prev: any) => ({
      ...prev,
      questions: (prev.questions || []).map((q: any) =>
        q._id === id ? fn(q) : q,
      ),
    }));
  };

  const saveQuestion = async (id: string) => {
    const q = questions.find((x: any) => x._id === id);
    if (!q) return;
    const normalized = normalizeQuestionForSave({ ...q });
    await persistQuestions(
      questions.map((x: any) => (x._id === id ? normalized : x)),
    );
    setEditingId(null);
  };

  const cancelEdit = async () => {
    await loadQuestions();
    setEditingId(null);
  };

  const discardAndGoList = async () => {
    await loadQuestions();
    router.push(`/courses/${courseId}/quizzes`);
  };

  const saveQuizToDetails = async () => {
    try {
      await quizzesClient.updateQuiz(quizId, { ...quiz });
      router.push(`/courses/${courseId}/quizzes/${quizId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const saveQuizPublishList = async () => {
    try {
      await quizzesClient.updateQuiz(quizId, { ...quiz, published: true });
      router.push(`/courses/${courseId}/quizzes`);
    } catch (e) {
      console.error(e);
    }
  };

  const typeHelp = (t: string) => {
    if (t === "MULTIPLE_CHOICE") {
      return "Enter your question and multiple answers. Check every choice that should count as correct (one or more).";
    }
    if (t === "TRUE_FALSE") {
      return "Enter your question text, then select if True or False is the correct answer.";
    }
    return "Use Blank 1, Blank 2, ... for each gap in the question. For each blank, list every acceptable answer (case-insensitive when graded).";
  };

  return (
    <div id="wd-quiz-questions-editor">
      <div className="d-flex justify-content-end mb-2 small text-secondary">
        <span className="text-dark" id="wd-quiz-questions-points">
          Points {totalPoints}
        </span>
      </div>

      {questions.map((q: any) => {
        const open = editingId === q._id;
        if (!open) {
          return (
            <Card key={q._id} className="mb-2 border">
              <Card.Body className="py-2 px-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="small">{q.title}</strong>
                    <div className="small text-muted">
                      {q.type.replace(/_/g, " ")} · {q.points} pts
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => setEditingId(q._id)}
                  >
                    Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        }

        const blanks = fibBlanksForDisplay(q);

        return (
          <div key={q._id} className="wd-quiz-question-editor-box">
            <div className="row g-2 align-items-center border-bottom pb-3 mb-3">
              <div className="col-md-5">
                <FormControl
                  value={q.title}
                  onChange={(e) =>
                    updateQuestionLocal(q._id, (x) => ({
                      ...x,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  id={`wd-quiz-question-type-${q._id}`}
                  value={q.type}
                  onChange={(e) => {
                    const t = e.target.value;
                    if (t === "MULTIPLE_CHOICE") {
                      const n = defaultMc();
                      n._id = q._id;
                      n.title = q.title;
                      n.points = q.points;
                      n.question = q.question;
                      updateQuestionLocal(q._id, () => n);
                    } else if (t === "TRUE_FALSE") {
                      const n = defaultTf();
                      n._id = q._id;
                      n.title = q.title;
                      n.points = q.points;
                      n.question = q.question;
                      updateQuestionLocal(q._id, () => n);
                    } else {
                      const n = defaultFib();
                      n._id = q._id;
                      n.title = q.title;
                      n.points = q.points;
                      n.question = q.question;
                      updateQuestionLocal(q._id, () => n);
                    }
                  }}
                >
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="TRUE_FALSE">True/False</option>
                  <option value="FILL_BLANK">Fill In the Blank</option>
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-md-end gap-2 mt-2 mt-md-0">
                <span className="small text-nowrap">pts:</span>
                <FormControl
                  type="number"
                  style={{ maxWidth: "4.5rem" }}
                  value={q.points}
                  onChange={(e) =>
                    updateQuestionLocal(q._id, (x) => ({
                      ...x,
                      points: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <p className="small text-muted mb-2">{typeHelp(q.type)}</p>

            <Form.Label className="fw-bold">Question:</Form.Label>
            <div className="wd-quiz-instructions-editor rounded-bottom overflow-hidden mb-3">
              <FakeQuestionToolbar />
              <FormControl
                as="textarea"
                rows={4}
                value={q.question}
                onChange={(e) =>
                  updateQuestionLocal(q._id, (x) => ({
                    ...x,
                    question: e.target.value,
                  }))
                }
              />
            </div>

            {q.type === "MULTIPLE_CHOICE" && (
              <div className="mb-3">
                <Form.Label className="fw-bold">Answers:</Form.Label>
                {(q.mcChoices || []).map((c: any, idx: number) => {
                  const ids = mcCorrectIds(q);
                  const correct = ids.includes(c._id);
                  return (
                    <div key={c._id} className="wd-quiz-answer-row">
                      <FormCheck
                        type="checkbox"
                        className="pt-2"
                        checked={correct}
                        onChange={(e) => {
                          const next = new Set(ids);
                          if (e.target.checked) {
                            next.add(c._id);
                          } else {
                            next.delete(c._id);
                          }
                          let arr = [...next];
                          if (
                            arr.length === 0 &&
                            (q.mcChoices || []).length > 0
                          ) {
                            arr = [q.mcChoices[0]._id];
                          }
                          updateQuestionLocal(q._id, (x) => ({
                            ...x,
                            correctMcChoiceIds: arr,
                            correctMcChoiceId: arr[0] || "",
                          }));
                        }}
                        title="Mark as correct"
                      />
                      <div
                        className={`wd-quiz-answer-label ${correct ? "wd-quiz-correct-label" : ""}`}
                      >
                        {correct ? "Correct" : "Choice"}
                      </div>
                      <FormControl
                        as="textarea"
                        rows={2}
                        className="flex-grow-1"
                        value={c.text}
                        onChange={(e) => {
                          const mc = [...(q.mcChoices || [])];
                          mc[idx] = { ...mc[idx], text: e.target.value };
                          updateQuestionLocal(q._id, (x) => ({
                            ...x,
                            mcChoices: mc,
                          }));
                        }}
                      />
                      <div className="d-flex gap-1 pt-1">
                        <button
                          type="button"
                          className="btn btn-link p-0 text-secondary"
                          tabIndex={-1}
                          aria-hidden
                        >
                          <FaPencil />
                        </button>
                        <button
                          type="button"
                          className="btn btn-link p-0 text-danger"
                          onClick={() => {
                            const mc = (q.mcChoices || []).filter(
                              (z: any) => z._id !== c._id,
                            );
                            const nextIds = mcCorrectIds(q).filter(
                              (id) => id !== c._id,
                            );
                            updateQuestionLocal(q._id, (x) => ({
                              ...x,
                              mcChoices: mc,
                              correctMcChoiceIds:
                                nextIds.length > 0
                                  ? nextIds
                                  : mc[0]
                                    ? [mc[0]._id]
                                    : [],
                              correctMcChoiceId: mc[0]?._id || "",
                            }));
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="text-end mt-2">
                  <button
                    type="button"
                    className="wd-quiz-link-red btn btn-link p-0"
                    onClick={() => {
                      const row = { _id: newId(), text: "" };
                      updateQuestionLocal(q._id, (x) => ({
                        ...x,
                        mcChoices: [...(x.mcChoices || []), row],
                      }));
                    }}
                  >
                    + Add Another Answer
                  </button>
                </div>
              </div>
            )}

            {q.type === "TRUE_FALSE" && (
              <div className="mb-3">
                <Form.Label className="fw-bold">Answers:</Form.Label>
                <div className="wd-quiz-answer-row border-0">
                  <FormCheck
                    type="radio"
                    className="pt-2"
                    name={`tf-${q._id}`}
                    checked={q.correctTrueFalse === true}
                    onChange={() =>
                      updateQuestionLocal(q._id, (x) => ({
                        ...x,
                        correctTrueFalse: true,
                      }))
                    }
                  />
                  <div
                    className={`wd-quiz-answer-label ${q.correctTrueFalse ? "wd-quiz-correct-label" : ""}`}
                  >
                    True (correct)
                  </div>
                </div>
                <div className="wd-quiz-answer-row border-0">
                  <FormCheck
                    type="radio"
                    className="pt-2"
                    name={`tf-${q._id}`}
                    checked={q.correctTrueFalse === false}
                    onChange={() =>
                      updateQuestionLocal(q._id, (x) => ({
                        ...x,
                        correctTrueFalse: false,
                      }))
                    }
                  />
                  <div
                    className={`wd-quiz-answer-label ${!q.correctTrueFalse ? "wd-quiz-correct-label" : ""}`}
                  >
                    False (correct)
                  </div>
                </div>
              </div>
            )}

            {q.type === "FILL_BLANK" && (
              <div className="mb-3">
                <Form.Label className="fw-bold">Blanks &amp; correct answers</Form.Label>
                {blanks.map((blank: any, bi: number) => (
                  <div key={blank._id} className="border rounded p-2 mb-3 bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold small">Blank {bi + 1}</span>
                      {blanks.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => {
                            const next = blanks.filter(
                              (_: any, i: number) => i !== bi,
                            );
                            updateQuestionLocal(q._id, (x) => ({
                              ...x,
                              fibBlanks: next,
                              fibCorrectAnswers: [],
                            }));
                          }}
                        >
                          Remove blank
                        </Button>
                      )}
                    </div>
                    {(blank.correctAnswers || [""]).map(
                      (ans: string, ai: number) => (
                        <div key={ai} className="wd-quiz-answer-row">
                          <span className="small text-muted text-nowrap pt-1">
                            Accept:
                          </span>
                          <FormControl
                            as="textarea"
                            rows={2}
                            className="flex-grow-1"
                            value={ans}
                            onChange={(e) => {
                              const nextBlanks = blanks.map(
                                (b: any, i: number) => {
                                  if (i !== bi) return { ...b };
                                  const ca = [...(b.correctAnswers || [])];
                                  ca[ai] = e.target.value;
                                  return { ...b, correctAnswers: ca };
                                },
                              );
                              updateQuestionLocal(q._id, (x) => ({
                                ...x,
                                fibBlanks: nextBlanks,
                                fibCorrectAnswers: [],
                              }));
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-link p-0 text-danger pt-1"
                            onClick={() => {
                              const nextBlanks = blanks.map(
                                (b: any, i: number) => {
                                  if (i !== bi) return { ...b };
                                  const ca = (b.correctAnswers || []).filter(
                                    (_: string, j: number) => j !== ai,
                                  );
                                  return {
                                    ...b,
                                    correctAnswers:
                                      ca.length > 0 ? ca : [""],
                                  };
                                },
                              );
                              updateQuestionLocal(q._id, (x) => ({
                                ...x,
                                fibBlanks: nextBlanks,
                                fibCorrectAnswers: [],
                              }));
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ),
                    )}
                    <div className="text-end">
                      <button
                        type="button"
                        className="wd-quiz-link-red btn btn-link btn-sm p-0"
                        onClick={() => {
                          const nextBlanks = blanks.map((b: any, i: number) =>
                            i === bi
                              ? {
                                  ...b,
                                  correctAnswers: [
                                    ...(b.correctAnswers || []),
                                    "",
                                  ],
                                }
                              : { ...b },
                          );
                          updateQuestionLocal(q._id, (x) => ({
                            ...x,
                            fibBlanks: nextBlanks,
                            fibCorrectAnswers: [],
                          }));
                        }}
                      >
                        + Add acceptable answer
                      </button>
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => {
                    updateQuestionLocal(q._id, (x) => ({
                      ...x,
                      fibBlanks: [
                        ...blanks,
                        { _id: newId(), correctAnswers: [""] },
                      ],
                      fibCorrectAnswers: [],
                    }));
                  }}
                >
                  + Add blank
                </Button>
              </div>
            )}

            <div className="d-flex gap-2 pt-2 border-top">
              <Button
                variant="light"
                className="border-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
              <Button
                className="wd-quiz-btn-crimson"
                onClick={() => saveQuestion(q._id)}
              >
                Update Question
              </Button>
            </div>
          </div>
        );
      })}

      {!editingId && (
        <div
          className={
            questions.length === 0
              ? "wd-quiz-questions-empty"
              : "text-center py-4 border-top border-bottom my-3"
          }
        >
          <Button
            variant="light"
            className="border px-4 py-2"
            id="wd-quiz-new-question"
            onClick={addQuestion}
          >
            <FaPlus className="me-2" />
            New Question
          </Button>
        </div>
      )}

      {!editingId && (
        <>
          <hr className="my-4" />
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="light"
              className="border-secondary px-4"
              onClick={discardAndGoList}
            >
              Cancel
            </Button>
            <Button className="wd-quiz-btn-crimson px-4" onClick={saveQuizToDetails}>
              Save
            </Button>
            <Button variant="outline-danger" onClick={saveQuizPublishList}>
              Save &amp; Publish
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
