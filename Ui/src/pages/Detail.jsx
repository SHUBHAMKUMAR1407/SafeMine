import React, { useState } from 'react';

const DetailForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    rounds: {
      completed: 0,
      overdue: 0,
      skipped: 0,
      inProgress: 0,
      cancelled: 0
    },
    tasks: {
      completed: 0,
      incomplete: 0,
      skipped: 0
    },
    actions: {
      pending: 0,
      completed: 0
    },
    employees: {
      total: 0,
      present: 0,
      absent: 0,
      lateArrival: 0,
      onLeave: 0
    }
  });

  const handleInputChange = (category, subcategory, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: parseInt(value) || 0
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      alert("Data submitted successfully!");
      setFormData({
        date: new Date().toISOString().split('T')[0],
        rounds: { completed: 0, overdue: 0, skipped: 0, inProgress: 0, cancelled: 0 },
        tasks: { completed: 0, incomplete: 0, skipped: 0 },
        actions: { pending: 0, completed: 0 },
        employees: { total: 0, present: 0, absent: 0, lateArrival: 0, onLeave: 0 },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Daily Statistics Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Input */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Rounds Section */}
        <div className="p-4 bg-gray-50 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Rounds</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.keys(formData.rounds).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium text-sm mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.rounds[key]}
                  onChange={(e) => handleInputChange('rounds', key, e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="p-4 bg-gray-50 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.keys(formData.tasks).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium text-sm mb-1 capitalize">{key}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.tasks[key]}
                  onChange={(e) => handleInputChange('tasks', key, e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="p-4 bg-gray-50 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.keys(formData.actions).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium text-sm mb-1 capitalize">{key}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.actions[key]}
                  onChange={(e) => handleInputChange('actions', key, e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Employees Section */}
        <div className="p-4 bg-gray-50 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Employees</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.keys(formData.employees).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium text-sm mb-1 capitalize">{key}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.employees[key]}
                  onChange={(e) => handleInputChange('employees', key, e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DetailForm;
