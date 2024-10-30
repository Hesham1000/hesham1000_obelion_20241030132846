import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

function RegistrationForm() {
  const [formType, setFormType] = useState('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(`https://todoApp-backend.cloud-stacks.com/api/v1/${formType}`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (formType === 'register') {
        setSuccess('User registered successfully');
      } else {
        const { token } = response.data;
        localStorage.setItem('token', token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="registration-login-page">
      <header className="header">
        <h1 className="logo">App Logo</h1>
      </header>
      <div className="form-container">
        <div className="tabs">
          <button onClick={() => setFormType('register')} className={formType === 'register' ? 'active' : ''}>Register</button>
          <button onClick={() => setFormType('login')} className={formType === 'login' ? 'active' : ''}>Login</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {formType === 'login' && <a href="/forgot-password" className="forgot-password">Forgot Password?</a>}
          <button type="submit" className="primary-button">
            {formType === 'register' ? 'Register' : 'Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
      <footer className="footer">
        <p>&copy; 2023 App Name. All rights reserved.</p>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </footer>
    </div>
  );
}

export default RegistrationForm;
