import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('neo_auth');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error('Failed reading auth from storage', e);
    }
  }, []);

  const signup = async ({ name, email, password }) => {
    const raw = localStorage.getItem('neo_users');
    let users = [];
    try {
      users = raw ? JSON.parse(raw) : [];
    } catch (e) {
      users = [];
    }
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('neo_users', JSON.stringify(users));
    localStorage.setItem('neo_auth', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return newUser;
  };

  const login = async ({ email, password }) => {
    const raw = localStorage.getItem('neo_users');
    let users = [];
    try {
      users = raw ? JSON.parse(raw) : [];
    } catch (e) {
      users = [];
    }
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials');
    const auth = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem('neo_auth', JSON.stringify(auth));
    setUser(auth);
    return auth;
  };

  const logout = () => {
    localStorage.removeItem('neo_auth');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
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
