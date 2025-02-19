import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      // Call your registration logic here
      await onRegister(formData);
      navigate('/login'); // redirect to login after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Register;
