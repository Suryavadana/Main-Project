import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state for authenticated user

  const login = (userData) => {
    // Logic to authenticate user (e.g., send login request to backend)
    setUser(userData); // Example: Set user data upon successful login
  };

  const register = async ({ username, password }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/register', { username, password });
      setUser(response.data); // Example: Set user data upon successful registration
      return response.data; // Return response data (assuming it contains user information)
    } catch (error) {
      throw error; // Forward error for handling in RegistrationForm component
    }
  };

  const logout = () => {
    // Logic to log out user (e.g., clear session, remove tokens)
    setUser(null); // Example: Clear user data upon logout
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};