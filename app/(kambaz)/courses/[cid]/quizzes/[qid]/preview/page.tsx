"use client";

import { useParams } from "next/navigation";
import QuizSession from "../QuizSession";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  return (
    <QuizSession
      courseId={cid as string}
      quizId={qid as string}
      mode="preview"
    />
  );
}
