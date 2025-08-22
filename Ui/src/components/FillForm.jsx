import React, { useState } from 'react';
import WorkerForm from '../pages/worker.jsx';
import DetailForm from '../pages/Detail.jsx';

const FillForm = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [isFormSelectorVisible, setIsFormSelectorVisible] = useState(false); // Toggle visibility of form options

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Main Content */}
      <div className="w-full max-w-3xl">
        {selectedForm === 'detail' && <DetailForm />}
        {selectedForm === 'worker' && <WorkerForm />}
        {!selectedForm && (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <p className="text-xl font-roboto font-bold">Select a form to view its content</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsFormSelectorVisible(!isFormSelectorVisible)}
        className="mt-8 bg-[#D4B030] text-white p-4 rounded-full shadow-lg hover:bg-[#f3ce48] transition-colors duration-300"
      >
        {isFormSelectorVisible ? 'Close Options' : 'Open Form Options'}
      </button>

      {/* Form Selector */}
      {isFormSelectorVisible && (
        <div className="mt-6 w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Choose a Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSelectedForm('detail');
                setIsFormSelectorVisible(false); // Close selector
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors"
            >
              Detailed Form
            </button>
            <button
              onClick={() => {
                setSelectedForm('worker');
                setIsFormSelectorVisible(false); // Close selector
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors"
            >
              Worker Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FillForm;
