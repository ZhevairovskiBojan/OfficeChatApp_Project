import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import DefaultPage from './Pages/DefaultPage';
import LoginPage from './Pages/LoginPage';

import HomePage from './Pages/HomePage';
import MyProfilePage from './Pages/MyProfilePage';
import RegisterPage from './Pages/registerPage/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
