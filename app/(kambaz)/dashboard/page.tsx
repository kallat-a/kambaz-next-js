import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2847" className="wd-dashboard-course-link">
            <Image src="/images/html.jpg" width={200} height={150} alt="html" />
            <div>
              <h5> CS2847 HTML </h5>
              <p className="wd-dashboard-course-title">
                HyperText Markup Language
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/6391" className="wd-dashboard-course-link">
            <Image src="/images/css.jpg" width={200} height={150} alt="css" />
            <div>
              <h5> CS6391 CSS </h5>
              <p className="wd-dashboard-course-title">
                Cascading Style Sheets
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4523" className="wd-dashboard-course-link">
            <Image
              src="/images/javascript.jpg"
              width={200}
              height={150}
              alt="javascript"
            />
            <div>
              <h5> CS4523 JavaScript </h5>
              <p className="wd-dashboard-course-title">Programming Language</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/7892" className="wd-dashboard-course-link">
            <Image
              src="/images/typescript.jpg"
              width={200}
              height={150}
              alt="typescript"
            />
            <div>
              <h5> CS7892 TypeScript </h5>
              <p className="wd-dashboard-course-title">
                Type annotated JavaScript
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1567" className="wd-dashboard-course-link">
            <Image
              src="/images/mongodb.jpg"
              width={200}
              height={150}
              alt="mongodb"
            />
            <div>
              <h5> CS1567 MongoDB </h5>
              <p className="wd-dashboard-course-title">NoSQL Database</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/9204" className="wd-dashboard-course-link">
            <Image
              src="/images/express.jpg"
              width={200}
              height={150}
              alt="express"
            />
            <div>
              <h5> CS9204 Express </h5>
              <p className="wd-dashboard-course-title">Web API Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
