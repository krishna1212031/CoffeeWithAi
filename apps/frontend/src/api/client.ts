import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message ??
      err?.response?.data?.error ??
      err?.message ??
      "Request failed";
    return Promise.reject(new Error(typeof message === "string" ? message : "Request failed"));
  }
);
