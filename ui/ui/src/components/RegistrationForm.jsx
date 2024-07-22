// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/RegistrationForm.css';

// const RegistrationForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [verifyPassword, setVerifyPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== verifyPassword) {
//       setMessage('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, verifyPassword }),
//       });

//       if (response.ok) {
//         setMessage('Registration successful');
//         setUsername('');
//         setPassword('');
//         setVerifyPassword('');
        
//         // Redirect to login page after successful registration
//         navigate('/login');
//       } else {
//         const data = await response.json();
//         setMessage(data.message); // Assuming the error message is sent as { message: 'error message' }
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setMessage('Error during registration');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title">Registration Form</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Username:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Password:</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Verify Password:</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={verifyPassword}
//                 onChange={(e) => setVerifyPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Register</button>
//           </form>
//           {message && <p className="mt-3 text-danger">{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../auth/AuthContext';
import '../styles/RegistrationForm.css'; // Import CSS file for styling

axios.defaults.withCredentials = true;

const RegistrationForm = () => {
  const [form, setForm] = useState({ username: '', password: '', verifyPassword: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', form);
      setMessage('User registered successfully');
      login(response.data);
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="verifyPassword" placeholder="Verify Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegistrationForm;
