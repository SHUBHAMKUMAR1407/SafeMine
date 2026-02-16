import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import MinistryLogo from '../assets/Ministry.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/v1/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="font-roboto min-h-screen bg-gray-50 flex items-center justify-center fixed inset-0 bg-opacity-80 z-50 transition duration-500 ease-in-out transform">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <div className="flex justify-center mb-6">
          <img src={MinistryLogo} alt="Ministry of Coal" className="h-[80px] object-contain" />
        </div>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Login to <span className="text-yellow-600">Your Account</span>
        </h2>

        <form className="mt-8" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              required
            />
            <div className="flex justify-end mt-2">
              <span
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-yellow-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-yellow-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
