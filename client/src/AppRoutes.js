// AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GardenApp from './components/gardens/GardenApp';
import GardenDetail from './components/gardens/GardenDetail';
import Login from './components/Login';
import Register from './components/Register';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
    const token = useSelector((state) => state.auth.token);
    const isAuthenticated = !!token;  // true if token exists

    return (
        <Routes>
            <Route path="/dashboard" element={isAuthenticated ? <GardenApp /> : <Navigate to="/login" />} />
            <Route path="/gardens/:id" element={<GardenDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
