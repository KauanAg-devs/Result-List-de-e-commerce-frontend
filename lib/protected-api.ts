import axios from "axios";

const protectedApiRoute = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  withCredentials: true,
});

let refreshTokenPromise: Promise<any> | null = null;

protectedApiRoute.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (!refreshTokenPromise) {
        originalRequest._retry = true;

        refreshTokenPromise = protectedApiRoute.post("/auth/refresh")
          .then(() => {
            refreshTokenPromise = null; 
          })
          .catch((refreshError) => {
            refreshTokenPromise = null; 
            window.dispatchEvent(new Event("logout"));
            throw refreshError;
          });
      }

      try {
        await refreshTokenPromise; 
        return protectedApiRoute(originalRequest); 
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default protectedApiRoute;
