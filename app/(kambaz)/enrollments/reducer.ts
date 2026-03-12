import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (
      state,
      { payload }: { payload: { user: string; course: string } },
    ) => {
      const exists = state.enrollments.some(
        (e: any) => e.user === payload.user && e.course === payload.course,
      );
      if (!exists) {
        state.enrollments = [
          ...state.enrollments,
          { _id: uuidv4(), user: payload.user, course: payload.course },
        ] as any;
      }
    },
    unenroll: (
      state,
      { payload }: { payload: { user: string; course: string } },
    ) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === payload.user && e.course === payload.course),
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
