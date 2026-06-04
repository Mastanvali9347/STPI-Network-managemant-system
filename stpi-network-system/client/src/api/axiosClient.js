import axios from 'axios';
import API_BASE_URL, { BACKEND_UNAVAILABLE_MESSAGE } from '../config/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('stpi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isNetworkError = !error.response && error.message;
    if (isNetworkError) {
      error.message = BACKEND_UNAVAILABLE_MESSAGE;
      error.isBackendUnavailable = true;
    }

    const status = error.response?.status;
    if ([502, 503, 504].includes(status)) {
      error.message = BACKEND_UNAVAILABLE_MESSAGE;
      error.isBackendUnavailable = true;
    }

    if (status === 401) {
      localStorage.removeItem('stpi_token');
      localStorage.removeItem('stpi_user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
