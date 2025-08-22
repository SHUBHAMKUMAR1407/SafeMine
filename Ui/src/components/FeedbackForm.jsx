// src/components/FeedbackForm.jsx
import React from 'react';

const FeedbackForm = () => {
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
        <form className="w-full bg-transparent border border-gray-300 rounded-lg shadow-lg p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-bold text-gray-700">Name:</span>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-gray-600"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-bold text-gray-700">Email:</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-gray-600"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-bold text-gray-700">Message:</span>
            <textarea
              placeholder="Enter your feedback"
              rows="4"
              className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:border-gray-600"
            ></textarea>
          </label>
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
