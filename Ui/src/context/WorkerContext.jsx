// File: context/WorkerContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

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
      const response = await api.get("/api/v1/workers");
      if (response.status === 200) {
        const payload = response.data?.data ?? response.data;
        if (Array.isArray(payload)) {
          setWorkers(payload);
        } else {
          setWorkers([]);
        }
      }
    } catch (err) {
      console.error('Worker fetch error:', err);
      const message = err.response?.data?.message || err.response?.rawText || err.message || 'Failed to fetch workers';
      setError(message);
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
