import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; // Adjust path as needed
import '../styles/GardenAppNavBar.css';

const GardenAppNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Access both user and loading from the auth slice
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-logo">
          Garden Planner
        </Link>
      </div>
      <div className="navbar-right">
        {loading ? (
          // Display a loading state while the user is being fetched
          <span>Loading...</span>
        ) : user ? (
          <div className="profile-menu">
            <span className="profile-name" onClick={toggleDropdown}>
              {user.name}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">My Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default GardenAppNavBar;
