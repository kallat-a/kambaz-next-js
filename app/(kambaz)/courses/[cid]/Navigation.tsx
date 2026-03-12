"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const pathFor = (label: string) => {
    const slug = label === "Home" ? "home" : label.toLowerCase();
    return label === "People"
      ? `/courses/${cid}/people/table`
      : `/courses/${cid}/${slug}`;
  };
  const isActive = (label: string) => {
    const slug = label === "Home" ? "home" : label.toLowerCase();
    const segment = label === "People" ? "table" : slug;
    return pathname.includes(segment);
  };
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => (
        <Link
          key={label}
          href={pathFor(label)}
          id={`wd-course-${label.toLowerCase()}-link`}
          className={`list-group-item border-0 ${
            isActive(label) ? "active" : "text-danger"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
