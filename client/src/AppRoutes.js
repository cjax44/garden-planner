// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GardenApp from './components/GardenApp';
import GardenDetail from './components/GardenDetail'; // Your detailed garden page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GardenApp />} />
      <Route path="/gardens/:id" element={<GardenDetail />} />
    </Routes>
  );
};

export default AppRoutes;
