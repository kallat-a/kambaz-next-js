import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const api = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});
