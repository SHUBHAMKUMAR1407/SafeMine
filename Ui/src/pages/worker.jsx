// File: components/WorkerForm.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
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
  const [successMessage, setSuccessMessage] = useState("");

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
        setSuccessMessage("Worker saved successfully!");
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
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Worker Details</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
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
    </div>
  );
};

export default WorkerForm;
