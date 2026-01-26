import Link from "next/link";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/123`}
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <div>
            Multiple Modules | <strong>Not available until</strong> May 6 at
            12:00
          </div>
          <div>Due May 13 at 11:59pm | 100 pts</div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/124`}
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>
            Multiple Modules | <strong>Not available until</strong> May 13 at
            12:00
          </div>
          <div>Due May 20 at 11:59pm | 100 pts</div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/125`}
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <div>
            Multiple Modules | <strong>Not available until</strong> May 20 at
            12:00
          </div>
          <div>Due May 27 at 11:59pm | 100 pts</div>
        </li>
      </ul>
      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/126`}
            className="wd-assignment-link"
          >
            Q1 - HTML
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/127`}
            className="wd-assignment-link"
          >
            Q2 - CSS
          </Link>
        </li>
      </ul>
      <h3 id="wd-exams-title">
        EXAMS 20% of Total <button>+</button>
      </h3>
      <ul id="wd-exam-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/128`}
            className="wd-assignment-link"
          >
            Midterm
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/129`}
            className="wd-assignment-link"
          >
            Final
          </Link>
        </li>
      </ul>
      <h3 id="wd-project-title">
        PROJECT 30% of Total <button>+</button>
      </h3>
      <ul id="wd-project-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/courses/${cid}/assignments/130`}
            className="wd-assignment-link"
          >
            Project
          </Link>
        </li>
      </ul>
    </div>
  );
}
