"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { RootState } from "../../../../../store";
import QuizEditHeader from "../../QuizEditHeader";
import "../../quiz-canvas.css";

const EDITABLE_ROLES = new Set(["FACULTY", "ADMIN", "TA"]);

export default function QuizEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cid, qid } = useParams();
  const pathname = usePathname();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const base = `/courses/${cid}/quizzes/${qid}/edit`;
  const questionsActive = pathname.includes("/edit/questions");
  const detailsActive = !questionsActive;
  const canEdit = Boolean(
    currentUser && EDITABLE_ROLES.has((currentUser as any).role),
  );

  if (!canEdit) {
    return (
      <div className="p-3" id="wd-quiz-edit-layout-locked">
        <h4 className="mb-2">Quiz editing is not available</h4>
        <p className="text-muted mb-3">
          Only faculty, teaching assistants, and admins can edit quizzes.
        </p>
        <Link
          href={`/courses/${cid}/quizzes/${qid}`}
          className="btn btn-secondary"
        >
          Back to quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="p-2 p-md-3 wd-quiz-canvas-page" id="wd-quiz-edit-layout">
      <QuizEditHeader />
      <Nav variant="tabs" className="wd-quiz-nav-tabs-canvas mb-0">
        <Nav.Item>
          <Nav.Link as={Link} href={base} active={detailsActive}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            href={`${base}/questions`}
            active={questionsActive}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="pt-3">{children}</div>
    </div>
  );
}
