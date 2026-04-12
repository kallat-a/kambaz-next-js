import { api } from "../apiClient";

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}/users`);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await api.get(`/api/users/${userId}/enrollments`);
  return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await api.post(
    `/api/users/${userId}/courses/${courseId}`,
  );
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  await api.delete(`/api/users/${userId}/courses/${courseId}`);
};
