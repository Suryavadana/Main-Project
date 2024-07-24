// auth/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/user');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      await axios.post('http://localhost:8080/auth/login', userData);
      setUser(userData);
    } catch (error) {
      throw error; // Let the caller handle errors
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout');
      setUser(null);
    } catch (error) {
      throw error; // Let the caller handle errors
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
