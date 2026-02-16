import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import MinistryLogo from '../assets/Ministry.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/v1/users/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      });
      console.log('Signup successful:', response.data);
      console.log('Signup successful:', response.data);
      setModalMessage("Account created successfully!");
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Signup error:", err);
      // Try to get the most specific error message
      const errorMessage = err.response?.data?.message || err.message || 'Signup failed';
      setModalMessage(errorMessage);
      setShowErrorModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div className="font-roboto min-h-screen bg-gray-50 flex items-center justify-center fixed inset-0 bg-opacity-80 z-50 transition duration-500 ease-in-out transform">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gray-50 opacity-80 z-10"></div>
        <div className="relative bg-white p-8 rounded-lg shadow-lg z-20 max-h-screen overflow-auto">
          <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          <div className="flex justify-center mb-6">
            <img src={MinistryLogo} alt="Ministry of Coal" className="h-[80px] object-contain" />
          </div>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Create <span className="text-yellow-600">Account</span></h2>

          <form className="mt-8" onSubmit={handleSignup}>
            {['firstName', 'lastName', 'mobile', 'email', 'password', 'confirmPassword'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                  {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input id={field} name={field} type={field.includes('password') ? 'password' : 'text'} value={formData[field]} onChange={handleChange} placeholder={`Enter your ${field}`} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
            ))}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-yellow-700">Sign Up</button>
          </form>

          <div className="text-center mt-6">
            <a href="/login" className="text-yellow-600 hover:underline">Already have an account? Sign in</a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center relative animate-fade-in-up border-t-4 border-[#CA8A04]">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-[#CA8A04]" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">{modalMessage}</p>
            <button
              onClick={handleSuccessClose}
              className="w-full py-3 bg-[#CA8A04] text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors shadow-md"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center relative animate-fade-in-up border-t-4 border-red-500">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="text-red-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Error!</h3>
            <p className="text-gray-600 mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
