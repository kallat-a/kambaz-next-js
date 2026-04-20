import { api } from "../../apiClient";

const ASSIGNMENTS_API = "/api/assignments";

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}/assignments`);
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await api.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Record<string, unknown>,
) => {
  const { data } = await api.post(
    `/api/courses/${courseId}/assignments`,
    assignment,
  );
  return data;
};

export const updateAssignment = async (
  assignment: Record<string, unknown> & { _id: string },
) => {
  const { data } = await api.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment,
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  await api.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};
