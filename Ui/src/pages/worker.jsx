// File: components/WorkerForm.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { WorkerContext } from "../context/WorkerContext";

const WorkerForm = () => {
  const { addWorker } = useContext(WorkerContext);

  const [workerDetails, setWorkerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    designation: "",
    shift: "",
    contactNumber: "",
    emergencyContact: "",
    address: "",
  });

  const [error, setError] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setWorkerDetails({
      ...workerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/workers", workerDetails);
      if (response.status === 201) {
        setShowSuccessModal(true);
        setError("");
        setWorkerDetails({
          firstName: "",
          lastName: "",
          email: "",
          age: "",
          designation: "",
          shift: "",
          contactNumber: workerDetails.contactNumber, // Retain contact number
          emergencyContact: "",
          address: "",
        });
        addWorker(workerDetails); // Update context with the new worker
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while submitting the form.";
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Worker Details</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Render form fields */}
        {Object.keys(workerDetails).map((key) => (
          <div key={key}>
            <label className="block text-gray-700 mb-2 capitalize" htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
            </label>
            <input
              type={key === "email" ? "email" : key === "age" ? "number" : "text"}
              id={key}
              name={key}
              value={workerDetails[key]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button type="submit" className="self-start bg-[#D4B030] text-white py-2 px-6 rounded-lg hover:bg-[#B09C1A]">
          Submit
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center relative animate-fade-in-up border-t-4 border-[#CA8A04]">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-[#CA8A04]" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">Worker saved successfully.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#CA8A04] text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors shadow-md"
            >
              OK, Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerForm;
