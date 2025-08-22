import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiLogOut, FiSettings, FiAlertCircle, FiFileText } from 'react-icons/fi';
import DashboardImage from '../assets/Dashboard.jpg';

const Services = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-screen-xl px-4 sm:px-8 mb-12 flex flex-col lg:flex-row">
      {/* Left Side: Services Text and List of Services */}
      <div className="w-full lg:w-1/4 flex flex-col justify-start mb-6 lg:mb-0">
        {/* Services Text */}
        <div className="font-roboto text-left text-[#4F4F4F] text-2xl sm:text-[35.15px] font-bold mb-4">
          Services
        </div>

        {/* Service List Items */}
        {[
          { icon: <FiLogOut />, label: 'Shift Handover Log', bgColor: 'bg-[#D4B030]', textColor: 'text-white' },
          { icon: <FiSettings />, label: 'All Services', bgColor: 'bg-white', textColor: 'text-gray-700' },
          { icon: <FiAlertCircle />, label: 'Safety Management Plan', bgColor: 'bg-white', textColor: 'text-gray-700' },
          { icon: <FiFileText />, label: 'Hazard Identification', bgColor: 'bg-white', textColor: 'text-gray-700' },
          { icon: <FiAlertCircle />, label: 'Risk Assessment', bgColor: 'bg-white', textColor: 'text-gray-700' },
        ].map((service, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 sm:p-4 mb-4 rounded-md ${service.bgColor} shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1`}
          >
            <span className={`flex items-center gap-2 text-left font-medium ${service.textColor}`}>
              {service.icon}
              {service.label}
            </span>
            {service.label !== 'Shift Handover Log' && <FiChevronDown className={service.textColor} />}
          </div>
        ))}
      </div>

      {/* Right Side: Dashboard Image */}
      <div
        className="w-full lg:w-3/4 flex items-center justify-center relative mt-6 lg:mt-0"
        style={{
          background: '#3674EC',
        }}
      >
        <img
          src={DashboardImage}
          alt="Dashboard"
          className="object-cover w-full lg:w-[927px] h-[200px] sm:h-[400px] lg:h-[640px] rounded-md"
        />

        {/* Submit Button */}
        <button
          onClick={handleNavigate}
          className="absolute bottom-4 left-4 w-36 sm:w-48 h-10 sm:h-12 text-white font-semibold rounded-md shadow-lg transition-colors duration-300 bg-blue-500"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Services;
