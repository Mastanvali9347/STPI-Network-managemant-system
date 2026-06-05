import { createContext, useMemo, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService';
import { connectSocket, disconnectSocket, isSocketAvailable } from '../services/socketService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);

  /**
   * Auto-login: validate stored JWT by fetching profile from API.
   */
  /*
  useEffect(() => {
    const bootstrap = async () => {
      const token = authService.getToken();
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const { user: profile } = await authService.getProfile();
        setUser(profile);
        authService.saveSession(token, profile);
        connectSocket();
      } catch {
        authService.clearSession();
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };

    bootstrap();
  }, []);
  */

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      authService.saveSession(data.token, data.user);
      setUser(data.user);
      
      // Only attempt socket connection if backend is available
      if (isSocketAvailable()) {
        const socket = connectSocket();
        if (!socket) {
          console.warn('[Auth] Socket connection failed, continuing without realtime');
        }
      } else {
        console.log('[Auth] Socket.IO not available, running in API-only mode');
      }
      
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    disconnectSocket();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      initializing,
      login,
      logout,
      isAuthenticated: !!user,
      socketAvailable: isSocketAvailable(),
    }),
    [user, loading, initializing, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
