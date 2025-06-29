import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  withCredentials: true, 
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh'); 
        return api(originalRequest);   
      } catch (refreshErr) {
        console.error('Refresh token falhou', refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
