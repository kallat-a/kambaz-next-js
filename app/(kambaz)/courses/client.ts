import { api } from "../apiClient";

export const fetchAllCourses = async () => {
  const { data } = await api.get("/api/courses");
  return data;
};

export const findMyCourses = async (userId: string) => {
  const { data } = await api.get(`/api/users/${userId}/courses`);
  return data;
};

export const createCourse = async (course: Record<string, unknown>) => {
  const { data } = await api.post("/api/courses", course);
  return data;
};

export const updateCourseApi = async (
  course: Record<string, unknown> & { _id: string },
) => {
  const { data } = await api.put(`/api/courses/${course._id}`, course);
  return data;
};

export const deleteCourseApi = async (courseId: string) => {
  await api.delete(`/api/courses/${courseId}`);
};

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: Record<string, unknown>,
) => {
  const { data } = await api.post(`/api/courses/${courseId}/modules`, module);
  return data;
};

export const updateModuleApi = async (
  module: Record<string, unknown> & { _id: string },
) => {
  const { data } = await api.put(`/api/modules/${module._id}`, module);
  return data;
};

export const deleteModuleApi = async (moduleId: string) => {
  await api.delete(`/api/modules/${moduleId}`);
};
