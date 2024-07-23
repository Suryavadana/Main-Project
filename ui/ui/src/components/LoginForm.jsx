// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginForm = () => {
//     const [form, setForm] = useState({ username: '', password: '' });
//     const [message, setMessage] = useState('');

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8080/auth/login', form, {
//                 withCredentials: true // Ensure credentials are sent with the request
//             });

//             if (response.status === 200) {
//                 // Assuming successful login logic (update state, set tokens, etc.)
//                 setMessage('Login successful');
//                 navigate('/events'); // Redirect to '/events' after successful login
//             } else {
//                 setMessage('Login failed'); // Handle other status codes as needed
//             }
//         } catch (error) {
//             if (error.response) {
//                 // The request was made and the server responded with a status code outside of 2xx range
//                 if (error.response.status === 401) {
//                     setMessage('Invalid username or password. Please try again.');
//                 } else if (error.response.status === 500) {
//                     setMessage('Internal server error. Please try again later.');
//                 } else {
//                     setMessage('Error: ' + error.response.data.message); // Display server error message if available
//                 }
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 setMessage('No response from server. Please try again later.');
//             } else {
//                 // An unexpected error occurred
//                 setMessage('An error occurred. Please try again.'); // Generic error message
//             }
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="card">
//                 <div className="card-body">
//                     <h2 className="card-title">Login Form</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label className="form-label">Username:</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="username"
//                                 value={form.username}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Password:</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 name="password"
//                                 value={form.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary">Login</button>
//                     </form>
//                     {message && <p className="mt-3 text-danger">{message}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;
// components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';  // Import useAuth hook
import axios from 'axios';

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();  // Use useAuth hook to access login function
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);  // Call login function from useAuth
      navigate('/events');  // Redirect to events page after successful login
    } catch (error) {
      setMessage(error.response.data || 'An error occurred. Please try again.');  // Handle login errors
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {message && <p className="mt-3 text-danger">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
