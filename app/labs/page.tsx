import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <p>Student Name: Ahaan Kallat, Section: CS4550.33211.202630</p>
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
      </ul>
      <p>
        <Link href="/" id="wd-kambaz-link-from-labs">Kambaz Application</Link>
      </p>
      <p>
        <a href="https://github.com/kallat-a/kambaz-next-js" id="wd-github">
          GitHub Repository
        </a>
      </p>
    </div>
  );
}
