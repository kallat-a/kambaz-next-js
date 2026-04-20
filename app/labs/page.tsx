import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <p>
        Student Name: Ahaan Kallat, Section: CS4550 33211 SEC 02 Spring 2026
      </p>
      <ul>
        <li>
          <Link href="/labs/lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/labs/lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">
            Lab 4: State and Events
          </Link>
        </li>
        <li>
          <Link href="/labs/lab5" id="wd-lab5-link">
            Lab 5: RESTful APIs (Express)
          </Link>
        </li>
      </ul>
      <p>
        <Link href="/" id="wd-kambaz-link">
          Kambaz
        </Link>
      </p>
      <p>
        <a
          href="https://github.com/kallat-a/kambaz-next-js"
          id="wd-github-next-js"
        >
          GitHub: kambaz-next-js (Next.js)
        </a>
      </p>
      <p>
        <a
          href="https://github.com/kallat-a/kambaz-node-server-app/"
          id="wd-github-node-server"
        >
          GitHub: kambaz-node-server-app (Express API)
        </a>
      </p>
    </div>
  );
}
