// src/components/Services.jsx
import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FiLogOut, FiSettings, FiAlertCircle, FiFileText } from 'react-icons/fi'; // Icons for each service
import DashboardImage from '../assets/Dashboard.jpg'; // Adjust the path based on your project structure

const Services = () => {
  return (
    <div className="w-full max-w-screen-xl px-8 mb-12 flex">
      {/* Left Side: Services Text and List of Services */}
      <div className="w-1/4 flex flex-col justify-start">
        {/* Services Text */}
        <div
          className="font-roboto text-left text-[#4F4F4F]  text-[35.15px] font-bold mb-4"
          style={{
            width: '136.52px',
            height: '42.18px',
            marginLeft: '10.55px',
            fontFamily: 'Roboto',
            fontSize: '35.15px',
            lineHeight: '42.18px',
            
          }}
        >
          Services
        </div>

        {/* Shift Handover Log */}
        <div
          className="flex items-center justify-between p-3.5 mb-4 rounded-md bg-[#D4B030] shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1"
          style={{
            width: '268.91px',
            height: '47.45px',
          }}
        >
          <span className="flex items-center gap-2 text-left font-medium text-white">
            <FiLogOut />
            Shift Handover Log
          </span>
        </div>

        {/* All Services */}
        <div
          className="flex items-center justify-between p-3.5 mb-4 rounded-md bg-white shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1"
          style={{
            width: '268.91px',
            height: '47.45px',
          }}
        >
          <span className="flex items-center gap-2 text-left font-medium text-gray-700">
            <FiSettings />
            All Services
          </span>
        </div>

        {/* Safety Management Plan */}
        <div
          className="flex items-center justify-between p-3.5 mb-4 rounded-md bg-white shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1"
          style={{
            width: '268.91px',
            height: '47.45px',
          }}
        >
          <span className="flex items-center gap-2 text-left font-medium text-gray-700">
            <FiAlertCircle />
            Safety Management Plan
          </span>
          {/* Dropdown Icon */}
          <span className="text-gray-700">
            <FiChevronDown />
          </span>
        </div>

        {/* Hazard Identification */}
        <div
          className="flex items-center justify-between p-3.5 mb-4 rounded-md bg-white shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1"
          style={{
            width: '268.91px',
            height: '47.45px',
          }}
        >
          <span className="flex items-center gap-2 text-left font-medium text-gray-700">
            <FiFileText />
            Hazard Identification
          </span>
          {/* Dropdown Icon */}
          <span className="text-gray-700">
            <FiChevronDown />
          </span>
        </div>

        {/* Risk Assessment */}
        <div
          className="flex items-center justify-between p-3.5 rounded-md bg-white shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1"
          style={{
            width: '268.91px',
            height: '47.45px',
          }}
        >
          <span className="flex items-center gap-2 text-left font-medium text-gray-700">
            <FiAlertCircle />
            Risk Assessment
          </span>
          {/* Dropdown Icon */}
          <span className="text-gray-700">
            <FiChevronDown />
          </span>
        </div>
      </div>

      {/* Right Side: Dashboard Image */}
      <div
        className="flex-1 flex items-start justify-center"
        style={{
          background: '#F6F6F6',
          marginLeft: '20px', // Adjust to align with the spacing
          marginTop: '4px', // Adjust to position the image just below the "Services" section
        }}
      >
        <img
          src={DashboardImage}
          alt="Dashboard"
          className="object-cover"
          style={{
            width: '927px',
            height: '640.83px',
          }}
        />
      </div>
    </div>
  );
};

export default Services;
