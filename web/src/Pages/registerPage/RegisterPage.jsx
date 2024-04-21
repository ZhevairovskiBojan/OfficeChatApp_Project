import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Проверете дали патеката до CSS датотеката е точна

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Функција за ажурирање на состојбата со податоците од формата
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Функција за обработка на испратени податоци од формата
  const handleRegister = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', userData);
      console.log('Registration Success:', response.data);
      } catch (error) {
      console.error('Registration Failed:', error.response ? error.response.data : error.message);
     
    }
  };


  return (
    <form onSubmit={handleRegister} className="register-container">
      <h2 className="register-title">Welcome to The Office Chat App</h2>
      <div className="form-group">
        <label className="label">Name:</label>
        <input type="text" name="name" value={userData.name} onChange={handleInputChange} required className="input" />
      </div>
      <div className="form-group">
        <label className="label">Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} required className="input" />
      </div>
      <div className="form-group">
        <label className="label">Password:</label>
        <input type="password" name="password" value={userData.password} onChange={handleInputChange} required className="input" />
      </div>
      <button type="submit" className="buttonRegister">Register</button>
    </form>
  );
};

export default RegisterPage;
