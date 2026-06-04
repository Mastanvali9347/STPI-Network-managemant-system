const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';
const BACKEND_UNAVAILABLE_MESSAGE = 'Backend server is unavailable.';

console.log('API URL:', import.meta.env.VITE_API_URL ?? API_BASE_URL);

export { API_BASE_URL, SOCKET_URL, BACKEND_UNAVAILABLE_MESSAGE };
export default API_BASE_URL;
