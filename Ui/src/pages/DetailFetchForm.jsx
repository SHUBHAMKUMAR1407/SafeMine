import React, { useState, useEffect } from "react";
import { CheckCircle } from 'lucide-react';

const StyledDetailFetchForm = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/details");
        if (!response.ok) throw new Error("Failed to fetch details.");
        const data = await response.json();
        setFormData(data.data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (category, subcategory, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: category === "employees" ? value : parseInt(value) || 0,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/v1/details/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update data.");
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err.message);
      alert("Failed to update data.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 font-roboto text-center mb-6">Update Details</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Date Input */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Date</h3>
          <input
            type="date"
            value={formData.date.split("T")[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
          />
        </div>

        {/* Rounds Input */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Rounds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(formData.rounds).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.rounds[key]}
                  onChange={(e) => handleInputChange("rounds", key, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Input */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(formData.tasks).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">{key}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.tasks[key]}
                  onChange={(e) => handleInputChange("tasks", key, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions Input */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(formData.actions).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">{key}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.actions[key]}
                  onChange={(e) => handleInputChange("actions", key, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Employees Input */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Employees</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.keys(formData.employees).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="text"
                  value={formData.employees[key]}
                  onChange={(e) => handleInputChange("employees", key, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-6 bg-[#D2B48C] text-white font-semibold rounded-lg hover:bg-[#D4B030] transition-colors disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Details"}
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
            <p className="text-gray-600 mb-6">Data updated successfully.</p>
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

export default StyledDetailFetchForm;
