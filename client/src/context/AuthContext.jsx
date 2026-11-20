import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, getAdminMe } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await getAdminMe();
          if (res.data.success && isMounted) {
            setUser(res.data.user);
            localStorage.setItem('portfolio_admin_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('[Auth] Token verification failed:', err.message);
          if (isMounted) {
            logout();
          }
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    };
    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await loginAdmin({ email, password });
      if (res.data.success && res.data.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('portfolio_admin_token', res.data.token);
        localStorage.setItem('portfolio_admin_user', JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please verify email and password.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
