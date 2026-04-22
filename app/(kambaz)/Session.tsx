"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as client from "./account/client";
import { setCurrentUser } from "./account/reducer";
import { setEnrollments } from "./enrollments/reducer";
import * as enrollmentsClient from "./enrollments/client";

export default function Session({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await client.profile();
        if (!cancelled) dispatch(setCurrentUser(user));
        if (!cancelled && user?._id) {
          try {
            const list = await enrollmentsClient.findEnrollmentsForUser(
              user._id,
            );
            if (!cancelled) dispatch(setEnrollments(list));
          } catch {
            if (!cancelled) dispatch(setEnrollments([]));
          }
        } else if (!cancelled) {
          dispatch(setEnrollments([]));
        }
      } catch {
        if (!cancelled) dispatch(setCurrentUser(null));
        if (!cancelled) dispatch(setEnrollments([]));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);
  return children;
}
