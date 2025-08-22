import React, { useEffect, useState } from "react";

const WorkerReport = () => {
  const [cachedWorkers, setCachedWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch workers from the backend
  const fetchWorkers = async () => {
    try {
      const response = await fetch("/api/v1/workers");
      if (!response.ok) throw new Error("Failed to fetch workers.");
      const responseData = await response.json();
      console.log("API Response:", responseData); // Debugging the response

      // Ensure we access the correct array of workers
      const workersArray = responseData.data || [];
      const formattedWorkers = workersArray.map(worker => ({
        firstName: worker.firstName,
        lastName: worker.lastName,
        age: worker.age, // Assuming age is already in a usable format
        designation: worker.designation,
        contactNumber: worker.contactNumber,
      }));

      setCachedWorkers(formattedWorkers);
      localStorage.setItem("workers", JSON.stringify(formattedWorkers));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data from localStorage initially
  useEffect(() => {
    const savedWorkers = localStorage.getItem("workers");
    if (savedWorkers) {
      setCachedWorkers(JSON.parse(savedWorkers));
    }
    fetchWorkers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-[#D4B030] mb-6">Worker Reports</h1>
      
      {/* Error & Loading states */}
      {loading && <p className="text-center text-[#D4B030]">Loading workers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Table Section */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2 text-[#D4B030] text-left">First Name</th>
              <th className="border px-4 py-2 text-[#D4B030] text-left">Last Name</th>
              <th className="border px-4 py-2 text-[#D4B030] text-left">Age</th>
              <th className="border px-4 py-2 text-[#D4B030] text-left">Designation</th>
              <th className="border px-4 py-2 text-[#D4B030] text-left">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {cachedWorkers.length > 0 ? (
              cachedWorkers.map((worker, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="border px-4 py-2">{worker.firstName}</td>
                  <td className="border px-4 py-2">{worker.lastName}</td>
                  <td className="border px-4 py-2">{worker.age}</td>
                  <td className="border px-4 py-2">{worker.designation}</td>
                  <td className="border px-4 py-2">{worker.contactNumber}</td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No workers found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerReport;
