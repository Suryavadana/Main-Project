// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import EventDetails from './components/EventDetails';
// import RegistrationForm from './components/RegistrationForm';
// import LoginForm from './components/LoginForm';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';


// function App() {
  

//   return (
//     <>
//       <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<RegistrationForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="*" element={<EventDetails />} />
//       </Routes>
//     </BrowserRouter>
//     </>
//   )
// }
// export default App   


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import EventDetails from './components/EventDetails';
import NavBar from './components/NavBar';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedComponent from './components/ProtectedComponent';
import LoginStatus from './components/LoginStatus';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <LoginStatus /> {/* Add LoginStatus component to display login status */}
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/protected/*" element={<ProtectedRoute><ProtectedComponent /></ProtectedRoute>} />
          <Route path="/eventDetails" element={<EventDetails />} /> {/* Specific route for EventDetails */}
          <Route path="*" element={<Navigate to="/" />} /> {/* Default fallback route */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
