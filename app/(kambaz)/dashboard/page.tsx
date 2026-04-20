"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { setEnrollments } from "../enrollments/reducer";
import * as enrollmentsClient from "../enrollments/client";
import * as coursesClient from "../courses/client";
import { RootState } from "../store";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

const EDITABLE_ROLES = ["FACULTY", "ADMIN", "TA"];

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const dispatch = useDispatch();
  const canEditCourse =
    currentUser && EDITABLE_ROLES.includes((currentUser as any).role);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [catalogCourses, setCatalogCourses] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (canEditCourse && currentUser?._id) {
          const [teaching, all] = await Promise.all([
            coursesClient.fetchTeachingCourses("current"),
            coursesClient.fetchAllCourses(),
          ]);
          if (!cancelled) {
            dispatch(setCourses(teaching));
            setCatalogCourses(all);
          }
        } else if (currentUser?._id) {
          const courseList = await coursesClient.fetchAllCourses();
          if (!cancelled) dispatch(setCourses(courseList));
        } else if (!cancelled) {
          dispatch(setCourses([]));
        }
        if (currentUser?._id) {
          const list = await enrollmentsClient.findEnrollmentsForUser(
            currentUser._id,
          );
          if (!cancelled) dispatch(setEnrollments(list));
        } else if (!cancelled) {
          dispatch(setEnrollments([]));
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentUser?._id, dispatch, canEditCourse]);

  const isEnrolled = (courseId: string) =>
    currentUser &&
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId,
    );

  const displayCourses = (() => {
    if (!currentUser) return [];
    if (canEditCourse) {
      return showAllCourses ? catalogCourses : courses;
    }
    return showAllCourses
      ? courses
      : courses.filter((c) => isEnrolled(c._id));
  })();

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {canEditCourse && (
        <>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
            <h5 className="mb-0">New Course</h5>
            <div className="d-flex gap-2 align-items-center">
              <Button
                variant="warning"
                id="wd-update-course-click"
                onClick={async () => {
                  await coursesClient.updateCourseApi(course);
                  const teaching = await coursesClient.fetchTeachingCourses(
                    "current",
                  );
                  const all = await coursesClient.fetchAllCourses();
                  dispatch(setCourses(teaching));
                  setCatalogCourses(all);
                }}
              >
                Update
              </Button>
              <Button
                variant="primary"
                id="wd-add-new-course-click"
                onClick={async () => {
                  const { _id, ...rest } = course;
                  await coursesClient.createCourse({
                    ...rest,
                    department: course.department ?? "D123",
                    credits: course.credits ?? 3,
                  });
                  const teaching = await coursesClient.fetchTeachingCourses(
                    "current",
                  );
                  const all = await coursesClient.fetchAllCourses();
                  dispatch(setCourses(teaching));
                  setCatalogCourses(all);
                }}
              >
                Add
              </Button>
              <Button
                variant="primary"
                id="wd-enrollments-click"
                onClick={() => setShowAllCourses((s) => !s)}
              >
                {showAllCourses ? "My courses" : "All courses"}
              </Button>
            </div>
          </div>
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      {currentUser && !canEditCourse && (
        <div className="mb-2 d-flex flex-wrap gap-2 align-items-center">
          <Button
            variant="primary"
            id="wd-enrollments-click"
            onClick={() => setShowAllCourses((s) => !s)}
          >
            {showAllCourses ? "My courses" : "All courses"}
          </Button>
          <Link href="/dashboard/browse" className="btn btn-outline-primary">
            Browse catalog
          </Link>
          <hr className="w-100" />
        </div>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({displayCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayCourses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <CardImg
                  src="/images/reactjs.jpg"
                  variant="top"
                  width="100%"
                  height={160}
                />
                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {c.description}
                  </CardText>
                  {currentUser && showAllCourses && (
                    <div className="mb-2">
                      {isEnrolled(c._id) ? (
                        <Button
                          variant="danger"
                          size="sm"
                          className="me-2"
                          onClick={async () => {
                            await enrollmentsClient.unenrollFromCourse(
                              currentUser._id,
                              c._id,
                            );
                            const list =
                              await enrollmentsClient.findEnrollmentsForUser(
                                currentUser._id,
                              );
                            dispatch(setEnrollments(list));
                          }}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={async () => {
                            await enrollmentsClient.enrollInCourse(
                              currentUser._id,
                              c._id,
                            );
                            const list =
                              await enrollmentsClient.findEnrollmentsForUser(
                                currentUser._id,
                              );
                            dispatch(setEnrollments(list));
                          }}
                        >
                          Enroll
                        </Button>
                      )}
                    </div>
                  )}
                  <div className="d-flex gap-2 flex-wrap">
                    {(!currentUser || isEnrolled(c._id)) && (
                      <Link href={`/courses/${c._id}/home`}>
                        <Button variant="primary">Go</Button>
                      </Link>
                    )}
                    {canEditCourse &&
                      String(c.author) === String(currentUser._id) && (
                        <>
                          <Button
                            variant="warning"
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(c);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            id="wd-delete-course-click"
                            onClick={async (e) => {
                              e.preventDefault();
                              await coursesClient.deleteCourseApi(c._id);
                              const teaching =
                                await coursesClient.fetchTeachingCourses(
                                  "current",
                                );
                              const all = await coursesClient.fetchAllCourses();
                              dispatch(setCourses(teaching));
                              setCatalogCourses(all);
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
