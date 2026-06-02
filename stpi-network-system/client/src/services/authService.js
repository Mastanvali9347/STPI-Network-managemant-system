import axiosClient from '../api/axiosClient';

const TOKEN_KEY = 'stpi_token';
const USER_KEY = 'stpi_user';

/**
 * Authentication API service — all auth HTTP calls go through here.
 */
export const authService = {
  login: async (email, password) => {
    const { data } = await axiosClient.post('/auth/login', { email, password });
    return data;
  },

  register: async (payload) => {
    const { data } = await axiosClient.post('/auth/register', payload);
    return data;
  },

  getProfile: async () => {
    const { data } = await axiosClient.get('/auth/profile');
    return data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const { data } = await axiosClient.put('/auth/password', {
      currentPassword,
      newPassword,
    });
    return data;
  },

  saveSession: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  getStoredUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};

export { TOKEN_KEY, USER_KEY };
