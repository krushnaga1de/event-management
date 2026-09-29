import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const { data } = await API.post('/auth/login', { email, password, role });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate(`/${data.role}/dashboard`);
  };

  const register = async (name, email, password, role, adminSecret) => {
    const { data } = await API.post('/auth/register', { name, email, password, role, adminSecret });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate(`/${data.role}/dashboard`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
