import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import MinistryLogo from '../assets/Ministry.png';

const Search = ({ isVisible, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-md w-80 max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img src={MinistryLogo} alt="Ministry Logo" className="h-[100px] object-contain mb-4" />
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <div className="flex justify-center space-x-4">
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <FaSearch />
            </button>
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <FaMicrophone />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
