import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', userData);
      console.log('Registration Success:', response.data);
      navigate('/login'); // redirect to login page after successful registration
    } catch (error) {
      console.error('Registration Failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.msg : error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
