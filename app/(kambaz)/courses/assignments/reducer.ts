import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: { payload: any }) => {
      state.assignments = [...state.assignments, payload];
    },
    deleteAssignment: (
      state,
      { payload: assignmentId }: { payload: string },
    ) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId,
      );
    },
    updateAssignment: (state, { payload: assignment }: { payload: any }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a,
      );
    },
    mergeAssignmentsForCourse: (
      state,
      {
        payload,
      }: { payload: { courseId: string; list: any[] } },
    ) => {
      const { courseId, list } = payload;
      state.assignments = [
        ...state.assignments.filter((a: any) => a.course !== courseId),
        ...list,
      ];
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  mergeAssignmentsForCourse,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
