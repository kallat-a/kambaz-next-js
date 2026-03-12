"use client";

import { ReactNode, useState, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import "../../styles.css";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const course = courses.find((c: any) => c._id === cid);
  const [showNav, setShowNav] = useState(true);

  const isEnrolled =
    currentUser &&
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid,
    );

  useEffect(() => {
    if (currentUser && !isEnrolled && cid) {
      router.replace("/dashboard");
    }
  }, [currentUser, isEnrolled, cid, router]);

  if (currentUser && !isEnrolled && cid) {
    return null;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav((s) => !s)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />
      <Breadcrumb course={course} />
      <hr />
      <div className="d-flex">
        <div className={showNav ? "" : "d-none"}>
          <CourseNavigation cid={cid as string} />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
