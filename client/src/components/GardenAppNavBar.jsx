import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Optional: close dropdown when clicking outside (could be enhanced with useEffect)
  // For simplicity, we'll assume the user toggles it manually.

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Garden Planner
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="profile-menu">
            <span className="profile-name" onClick={toggleDropdown}>
              {user.name}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">My Profile</Link>
                <button onClick={onLogout} className="dropdown-item">Sign Out</button>
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

export default Navbar;
