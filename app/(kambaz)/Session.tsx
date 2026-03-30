"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as client from "./account/client";
import { setCurrentUser } from "./account/reducer";

export default function Session({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await client.profile();
        if (!cancelled) dispatch(setCurrentUser(user));
      } catch {
        if (!cancelled) dispatch(setCurrentUser(null));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);
  return children;
}
