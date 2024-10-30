import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering 
      ? 'https://todoApp-backend.cloud-stacks.com/api/v1/register' 
      : 'https://todoApp-backend.cloud-stacks.com/api/v1/login';

    try {
      const response = await axios.post(url, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.status === 201 || response.status === 200) {
        if (!isRegistering) {
          localStorage.setItem('token', response.data.token);
          window.location.href = '/dashboard';
        } else {
          alert('Registration successful');
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.error || 'An error occurred');
    }
  };

  return (
    <div className="login-form-container">
      <header className="header">
        <h1>App Logo</h1>
      </header>
      <div className="form-tabs">
        <button onClick={() => setIsRegistering(true)} className={isRegistering ? 'active' : ''}>Register</button>
        <button onClick={() => setIsRegistering(false)} className={!isRegistering ? 'active' : ''}>Login</button>
      </div>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-section">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-section">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isRegistering && (
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="primary-action-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <footer className="footer">
        <p>© 2023 Company Name. All rights reserved.</p>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </footer>
    </div>
  );
}

export default LoginForm;
