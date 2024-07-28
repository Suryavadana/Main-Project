import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import EventDetails from './components/EventDetails';
import Events from './components/Events'; // Ensure Events component is imported
import EventForm from './components/EventForm'; // Import EventForm component
import ProtectedComponent from './components/ProtectedComponent';
import LoginStatus from './components/LoginStatus';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Contact from './components/Contact'; // Import Contact component
import About from './components/About'; // Import About component

// A component to protect routes based on authentication
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
          <Route path="/" element={<EventDetails />} /> {/* Default route for login and registration */}
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/create-event" element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          } />
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="/protected/*" element={
            <ProtectedRoute>
              <ProtectedComponent />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<Contact />} /> {/* New route for Contact page */}
          <Route path="/about" element={<About />} /> {/* New route for About page */}
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to default */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


