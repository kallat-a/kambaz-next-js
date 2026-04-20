"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollments } from "../../enrollments/reducer";
import * as enrollmentsClient from "../../enrollments/client";
import * as coursesClient from "../../courses/client";
import { RootState } from "../../store";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function BrowseCourses() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await coursesClient.fetchAllCourses();
        if (!cancelled) {
          setCatalog(all);
        }
        if (currentUser?._id) {
          const list = await enrollmentsClient.findEnrollmentsForUser(
            currentUser._id,
          );
          if (!cancelled) {
            dispatch(setEnrollments(list));
          }
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentUser?._id, dispatch]);

  const isEnrolled = (courseId: string) =>
    currentUser &&
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId,
    );

  return (
    <div className="p-4" id="wd-browse-courses">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-browse-courses-title">Course catalog</h1>
        <Link href="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>
      <p className="text-muted">
        Enroll in courses to see them on your Dashboard under &quot;My
        courses&quot;.
      </p>
      <hr />
      <Row xs={1} md={3} className="g-4">
        {catalog.map((c) => (
          <Col key={c._id}>
            <Card>
              <CardBody>
                <CardTitle>{c.name}</CardTitle>
                <CardText className="small text-muted text-truncate">
                  {c.description}
                </CardText>
                {currentUser &&
                  (isEnrolled(c._id) ? (
                    <>
                      <Link href={`/courses/${c._id}/home`}>
                        <Button size="sm" className="me-2">
                          Open
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline-danger"
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
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="success"
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
                  ))}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
