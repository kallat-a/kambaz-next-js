import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: [] as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload: module }: { payload: any }) => {
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }: { payload: any }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m,
      ) as any;
    },
    editModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m,
      ) as any;
    },
    setModulesForCourse: (
      state,
      {
        payload,
      }: {
        payload: { courseId: string; modules: any[] };
      },
    ) => {
      state.modules = [
        ...state.modules.filter((m: any) => m.course !== payload.courseId),
        ...payload.modules,
      ] as any;
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  editModule,
  setModulesForCourse,
} = modulesSlice.actions;
export default modulesSlice.reducer;
