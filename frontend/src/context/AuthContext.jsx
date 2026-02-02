import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    try {
      const raw = localStorage.getItem('neo_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      }
    } catch (e) {
      console.error('Failed reading auth from storage', e);
    }
  }, []);

  const safeParse = async (res) => {
    const ct = res.headers.get('content-type') || '';
    const text = await res.text();
    if (ct.includes('application/json')) {
      try {
        return JSON.parse(text);
      } catch (e) {
        throw new Error('Invalid JSON response: ' + text.slice(0, 200));
      }
    }
    // Non-JSON response (likely HTML error page)
    throw new Error(text || res.statusText || 'Non-JSON response from server');
  };

  const signup = async ({ name, email, password }) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const body = await safeParse(res);
    if (!res.ok) throw new Error(body.error || 'Signup failed');
    const auth = { user: body.user, token: body.token };
    localStorage.setItem('neo_auth', JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
    return auth.user;
  };

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const body = await safeParse(res);
    if (!res.ok) throw new Error(body.error || 'Login failed');
    const auth = { user: body.user, token: body.token };
    localStorage.setItem('neo_auth', JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
    return auth.user;
  };

  const logout = () => {
    localStorage.removeItem('neo_auth');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const getAuthHeader = () => (token ? { Authorization: `Bearer ${token}` } : {});

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { user } = auth;
  if (!user) {
    return <NavigateToLogin />;
  }
  return children;
};

const NavigateToLogin = () => {
  // Lazy navigate component to avoid circular hooks
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  return null;
};

export default AuthContext;
