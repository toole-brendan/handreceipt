// frontend/src/pages/auth/login.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/store/slices/authSlice';
import '@/ui/styles/pages/auth/login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For development, auto-login with mock data
    dispatch(login({
      user: {
        id: '1',
        name: 'Test User',
        role: 'Admin',
        email: 'test@example.com'
      },
      token: 'mock-token'
    }));
    
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;