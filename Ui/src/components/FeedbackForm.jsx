// src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import api from '../services/api';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      await api.post('/api/v1/feedback/submit', formData);
      setStatus({ type: 'success', message: 'Feedback submitted successfully!' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit feedback. Please try again.';
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  return (
    <div className="w-full max-w-screen-xl px-8 mb-12">
      <div className="flex flex-col items-start gap-6">
        {/* Heading */}
        <div
          className="font-bold text-[#4F4F4F]"
          style={{
            width: '302px',
            height: '43px',
            fontFamily: 'Roboto',
            fontSize: '35.15px',
            fontWeight: '700',
            lineHeight: '42.18px',
            textAlign: 'left',
          }}
        >
          Feedback Form
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full bg-transparent border border-gray-300 rounded-lg shadow-lg p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-bold text-gray-700">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-gray-600"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-bold text-gray-700">Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-gray-600"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-bold text-gray-700">Message:</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your feedback"
              rows="4"
              className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-gray-600"
              required
            ></textarea>
          </label>

          {status.message && (
            <div className={`text-sm font-medium ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            className="self-start bg-[#D4B030] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#B09C1A]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
