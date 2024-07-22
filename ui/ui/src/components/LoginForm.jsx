// import React, { useState } from 'react';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8080/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('token', data.token); // Store token in localStorage
//         setMessage('Login successful');

//         // Example: Fetching data from /auth/users endpoint with token
//         const usersResponse = await fetch('http://localhost:8080/auth/users', {
//           headers: {
//             Authorization: `Bearer ${data.token}`, // Include token in Authorization header
//           },
//         });

//         if (usersResponse.ok) {
//           const usersData = await usersResponse.json();
//           console.log('Users data:', usersData);
//           // Proceed with displaying users data or further actions
//         } else {
//           console.error('Failed to fetch users data:', usersResponse.status);
//           setMessage('Failed to fetch users data');
//         }
//       } else {
//         const data = await response.json();
//         setMessage(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setMessage('Failed to fetch');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title">Login Form</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">Username:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password:</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Login</button>
//           </form>
//           {message && <p className="mt-3 text-danger">{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../auth/AuthContext';
import '../styles/LoginForm.css'; // Import CSS file for styling

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', form);
      setMessage('Login successful');
      login(response.data); // Update with actual user data

      // Navigate to 'eventDetails' page after successful login
      navigate('/eventDetails');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginForm;
