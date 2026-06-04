const envApiUrl = import.meta.env.VITE_API_URL?.trim();
const envSocketUrl = import.meta.env.VITE_SOCKET_URL?.trim();
const isDev = import.meta.env.MODE === 'development';

const API_BASE_URL = envApiUrl || (isDev ? 'http://localhost:5001/api' : undefined);
const SOCKET_URL =
  envSocketUrl ||
  envApiUrl?.replace(/\/api\/?$/, '') ||
  (isDev ? 'http://localhost:5001' : undefined);
const BACKEND_UNAVAILABLE_MESSAGE = 'Backend server is unavailable.';

if (!envApiUrl && !isDev) {
  console.warn(
    'VITE_API_URL is not set. Backend API URL is unavailable in production.'
  );
}

console.log('API URL:', envApiUrl ?? API_BASE_URL);
console.log('Socket URL:', envSocketUrl ?? SOCKET_URL);

export { API_BASE_URL, SOCKET_URL, BACKEND_UNAVAILABLE_MESSAGE };
export default API_BASE_URL;
