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
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to default */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


//App.jsx (or your main component where routing is configured)
// App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import EventForm from './components/EventForm';
// import DisplayUserEvents from './components/DisplayUserEvents';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul style={{ listStyleType: 'none', padding: 0 }}>
//             <li style={{ display: 'inline', marginRight: '10px' }}>
//               <Link to="/">Create Event</Link>
//             </li>
//             <li style={{ display: 'inline' }}>
//               <Link to="/display-event/1">Display Event</Link>
//               {/* Replace '1' with an actual eventId once you have one */}
//             </li>
//           </ul>
//         </nav>
        
//         <Routes>
//           <Route path="/" element={<EventForm />} />
//           <Route path="/display-event/:eventId" element={<DisplayUserEvents />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;





