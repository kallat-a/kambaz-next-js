import { api } from "../apiClient";

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await api.get(`/api/users/${userId}/enrollments`);
  return data;
};

export const enrollInCourse = async (user: string, course: string) => {
  const { data } = await api.post("/api/enrollments", {
    user,
    course,
  });
  return data;
};

export const unenrollFromCourse = async (user: string, course: string) => {
  await api.delete("/api/enrollments", {
    data: { user, course },
  });
};
