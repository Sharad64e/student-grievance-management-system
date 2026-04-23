import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

const storedUser = () => {
  const value = localStorage.getItem('user');
  return value ? JSON.parse(value) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveSession = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (formData) => {
    const { data } = await api.post('/auth/register', formData);
    saveSession(data);
  };

  const login = async (formData) => {
    const { data } = await api.post('/auth/login', formData);
    saveSession(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      register,
      login,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
