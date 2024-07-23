// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import EventDetails from './components/EventDetails';
// import RegistrationForm from './components/RegistrationForm';
// import LoginForm from './components/LoginForm';
// import Events from './components/Events';
// import Error404 from './components/Error404'; // Import your Error404 component
// import ProtectedComponent from './components/ProtectedComponent';

// const App = () => {
//     return (
        
//         <Router>
//             <Routes>
//                 {/* Homepage */}
//                 <Route path="/" element={<EventDetails />} />
//                 {/* Registration Form */}
//                 <Route path="/register" element={<RegistrationForm />} />
//                 {/* Login Form */}
//                 <Route path="/login" element={<LoginForm />} />
//                 {/* Events page */}
//                 <Route path="/events" element={<Events />} />
//                 {/* Wildcard Route for 404 Page */}
//                 <Route path="*" element={<Error404 />} />
//             </Routes>
//         </Router>
        
//     );
// };

// export default App;
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './auth/AuthContext';  // Import AuthProvider

import EventDetails from './components/EventDetails';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Events from './components/Events';
import Error404 from './components/Error404';  // Import your Error404 component

const App = () => {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<EventDetails />} />
          {/* Registration Form */}
          <Route path="/register" element={<RegistrationForm />} />
          {/* Login Form */}
          <Route path="/login" element={<LoginForm />} />
          {/* Events page */}
          <Route path="/events" element={<Events />} />
          {/* Wildcard Route for 404 Page */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
