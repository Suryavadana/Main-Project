import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to handle login
    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', credentials, { withCredentials: true });
            setUser(response.data); // Assuming response.data contains user information
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error(error.response?.data || 'Login failed. Please try again.');
        }
    };

    // Function to handle registration
    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/register', userData, { withCredentials: true });
            setUser(response.data); // Assuming response.data contains user information
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error(error.response?.data || 'Registration failed. Please try again.');
        }
    };

    // Function to handle logout
    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            throw new Error('Logout failed. Please try again.');
        }
    };

    // Provide user state and auth functions to children
    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
