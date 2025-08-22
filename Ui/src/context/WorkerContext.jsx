// File: context/WorkerContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WorkerContext = createContext();

export const WorkerProvider = ({ children }) => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch workers from the backend
  const fetchWorkers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/v1/workers");
      if (response.status === 200 && Array.isArray(response.data)) {
        setWorkers(response.data);
      }
    } catch (err) {
      setError("Failed to fetch worker details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new worker to the list
  const addWorker = (newWorker) => {
    setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
  };

  // Fetch workers on mount
  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <WorkerContext.Provider value={{ workers, addWorker, loading, error }}>
      {children}
    </WorkerContext.Provider>
  );
};
