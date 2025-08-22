import React from 'react';
import { useNavigate } from 'react-router-dom';
import MinistryLogo from '../assets/Ministry.png'; // Import the Ministry logo

const ForgotPasswordPage = () => {
  const navigate = useNavigate(); // For programmatic navigation

  return (
    <div className=" font-roboto min-h-screen bg-gray-50 flex items-center justify-center fixed inset-0 bg-opacity-80 z-50 transition duration-500 ease-in-out transform">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {/* Ministry Logo */}
        <div className="flex justify-center mb-6">
          <img src={MinistryLogo} alt="Ministry of Coal" className="h-[80px] object-contain" />
        </div>

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Reset <span className="text-yellow-600">Password</span>
        </h2>

        <form className="mt-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-yellow-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
