import React, { useState, useEffect, useRef } from 'react';
import DashboardCharts from '../components/DashboardChart.jsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ObservationPage = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const componentRef = useRef();

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

  const handleExportPDF = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const doc = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

    while (imgHeight > pageHeight) {
      position -= pageHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    }

    doc.save('dashboard-report.pdf');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 relative">
      {/* Header Section with Heading and Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0 text-center sm:text-left">
          Dashboard
        </h1>

        {/* Export PDF Button */}
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center space-x-2 px-3 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-50 text-sm sm:text-base self-center sm:self-auto"
        >
          <span className="font-semibold">Export PDF</span>
          <div className="w-3 h-3 border-t-2 border-r-2 border-blue-600 rotate-45 transform"></div>
        </button>
      </div>

      {/* Dashboard Content */}
      <div ref={componentRef} className="bg-white rounded-lg shadow p-4 sm:p-6">
        {formData ? (
          <DashboardCharts data={formData} />
        ) : (
          <div className="flex items-center justify-center text-gray-500">
            <p className="text-base sm:text-lg">No data available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObservationPage;
