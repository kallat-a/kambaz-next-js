"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Nav } from "react-bootstrap";
import QuizEditHeader from "../../QuizEditHeader";
import "../../quiz-canvas.css";

export default function QuizEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cid, qid } = useParams();
  const pathname = usePathname();
  const base = `/courses/${cid}/quizzes/${qid}/edit`;
  const questionsActive = pathname.includes("/edit/questions");
  const detailsActive = !questionsActive;

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
