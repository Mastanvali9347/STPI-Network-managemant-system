/**
 * API Configuration
 * Separates API and Socket.IO configuration for better maintainability
 */

const envApiUrl = import.meta.env.VITE_API_URL?.trim();
const isDev = import.meta.env.MODE === 'development';

/**
 * API Base URL Configuration
 * Priority:
 * 1. VITE_API_URL (explicit API URL)
 * 2. localhost:5001/api (development)
 * 3. undefined (production with no backend)
 */
const API_BASE_URL = envApiUrl || (isDev ? 'http://localhost:5001/api' : undefined);

const BACKEND_UNAVAILABLE_MESSAGE = 'Backend server is unavailable. Running in frontend-only mode.';

// Log configuration
console.log('[API Config]');
console.log('  Mode:', isDev ? 'development' : 'production');
if (API_BASE_URL) {
  console.log('  API URL:', API_BASE_URL);
} else {
  console.warn('  No API URL configured - backend API unavailable');
}

// Socket.IO config is now in src/config/socket.js
// Import from there instead:
export { SOCKET_URL, SOCKET_AVAILABLE } from './socket';

export { API_BASE_URL, BACKEND_UNAVAILABLE_MESSAGE };
export default API_BASE_URL;
