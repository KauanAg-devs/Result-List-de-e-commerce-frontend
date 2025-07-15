import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  withCredentials: true,
});

let refreshTokenPromise: Promise<any> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/me")
    ) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = api
          .post("/auth/refresh")
          .then((res) => {
            refreshTokenPromise = null;
            return res;
          })
          .catch((refreshError) => {
            refreshTokenPromise = null;
            window.dispatchEvent(new Event("logout"));
            throw refreshError;
          });
      }

      try {
        await refreshTokenPromise;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
