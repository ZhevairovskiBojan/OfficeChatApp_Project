import React from 'react';
import { Link } from 'react-router-dom';

const DefaultPage = () => {
  return (
    <div>
      <h1>Welcome to The Office Chat App</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default DefaultPage;
