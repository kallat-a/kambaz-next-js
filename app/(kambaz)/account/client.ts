import { api } from "../apiClient";

export const signin = async (credentials: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/api/users/signin", credentials);
  return data;
};

export const signout = async () => {
  await api.post("/api/users/signout");
};

export const profile = async () => {
  const { data } = await api.get("/api/users/profile");
  return data;
};

export const signup = async (user: Record<string, unknown>) => {
  const { data } = await api.post("/api/users", user);
  return data;
};

export const updateUser = async (
  userId: string,
  updates: Record<string, unknown>,
) => {
  const { data } = await api.put(`/api/users/${userId}`, updates);
  return data;
};
