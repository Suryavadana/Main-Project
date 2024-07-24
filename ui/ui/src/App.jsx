import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import EventDetails from './components/EventDetails';

import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedComponent from './components/ProtectedComponent';
import LoginStatus from './components/LoginStatus';
import Events from './components/Events'; // Ensure Events component is imported

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        
        <LoginStatus /> {/* Display login status */}
        <Routes>
          <Route path="/" element={<EventDetails />} /> {/* Specific route for EventDetails */}
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/events" element={<Events />} />
          <Route path="/protected/*" element={<ProtectedRoute><ProtectedComponent /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Default fallback route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
