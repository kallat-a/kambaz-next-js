import { api } from "../../../apiClient";

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await api.get(`/api/courses/${courseId}/quizzes`);
  return data;
};

export const createQuiz = async (courseId: string, body?: Record<string, unknown>) => {
  const { data } = await api.post(`/api/courses/${courseId}/quizzes`, body || {});
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await api.get(`/api/quizzes/${quizId}`);
  return data;
};

export const updateQuiz = async (quizId: string, quiz: Record<string, unknown>) => {
  const { data } = await api.put(`/api/quizzes/${quizId}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  await api.delete(`/api/quizzes/${quizId}`);
};

export const getLastAttempt = async (quizId: string) => {
  const { data } = await api.get(`/api/quizzes/${quizId}/attempts/last`);
  return data;
};

export const submitQuizAttempt = async (
  quizId: string,
  payload: { answers: { questionId: string; value: string }[]; accessCode?: string; preview?: boolean },
) => {
  const { data } = await api.post(`/api/quizzes/${quizId}/attempts`, payload);
  return data;
};
