// AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GardenApp from './components/gardens/GardenApp';
import GardenDetail from './components/gardens/GardenDetail'; // Your detailed garden page
import Login from './components/Login';
import Register from './components/Register';

const AppRoutes = () => {
    const isAuthenticated = true/* your logic to check if user is logged in */;

    return (
        <Routes>
            <Route path="/dashboard" element={isAuthenticated ? <GardenApp /> : <Navigate to="/login" />} />
            <Route path="/gardens/:id" element={<GardenDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect the root to login */}
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
