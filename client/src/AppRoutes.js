// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GardenApp from './components/gardens/GardenApp';
import GardenDetail from './components/gardens/GardenDetail'; // Your detailed garden page
import Login from './components/Login';
import Register from './components/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GardenApp />} />
      <Route path="/gardens/:id" element={<GardenDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


    </Routes>
  );
};

export default AppRoutes;
