import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaHome,
  FaFileAlt,
  FaClipboardList,
  FaEye,
  FaChartBar,
  FaCalendarCheck,
  FaHistory,
  FaCogs,
  FaHeadset,
  FaSignOutAlt,
} from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi'; // Import hamburger and close icons
import WebLogo from '../assets/Web_Logo.png'; // Path to the Safe Mine logo
import IntroImage from '../assets/INTRO__Coal.png'; // Path to the intro image
import DashboardCharts from './DashboardChart'; // Import DashboardCharts component
import FillForm from './FillForm'; // Import the FillForm component
import WorkerReport from '../pages/WorkerReport';
import DetailFetchForm from '../pages/DetailFetchForm';
import ObservationPage from '../pages/Observation';
import ContactUs from '../pages/Contact';

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('/api/v1/details/stats');
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (activeContent === 'dashboard') {
      fetchDashboardStats();
    }
  }, [activeContent]);

  const renderContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return (
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 px-6 pt-4">Dashboard Overview</h2>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Loading stats...</p>
                </div>
              ) : (
                <DashboardCharts data={dashboardData} />
              )}
            </div>
          </div>
        );
      case 'fill-form':
        return <FillForm />;
      case 'rounds':
        return <DetailFetchForm />;
      case 'observation':
        return <ObservationPage />;
      case 'reports':
        return <WorkerReport />;
      case 'attendance':
        return <div>Attendance Content</div>;
      case 'history':
        return <div>History Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      case 'support':
        return <ContactUs />;
      case 'exit':
        window.location.href = '/';
        return null;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <header className="bg-white p-4 shadow-md flex justify-between items-center md:px-6">
        <img src={WebLogo} alt="Logo" className="h-10 object-contain" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {sidebarOpen ? (
            <HiOutlineX className="text-2xl" /> // Close (cut) icon
          ) : (
            <HiOutlineMenuAlt3 className="text-2xl" /> // Hamburger icon
          )}
        </button>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'block' : 'hidden'
            } md:block w-64 bg-white p-6 shadow-md flex-shrink-0 overflow-y-auto`}
        >
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => setActiveContent('dashboard')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaHome />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveContent('fill-form')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaFileAlt />
              <span>Fill Form</span>
            </button>
            <button
              onClick={() => setActiveContent('rounds')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaClipboardList />
              <span>Update</span>
            </button>
            <button
              onClick={() => setActiveContent('observation')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaEye />
              <span>Observation</span>
            </button>
            <button
              onClick={() => setActiveContent('reports')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaChartBar />
              <span>Worker Reports</span>
            </button>
            <button
              onClick={() => setActiveContent('attendance')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaCalendarCheck />
              <span>Attendance</span>
            </button>
            <button
              onClick={() => setActiveContent('history')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaHistory />
              <span>History</span>
            </button>
            <hr className="border-t border-gray-300 my-4" />
            <button
              onClick={() => setActiveContent('settings')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaCogs />
              <span>Settings</span>
            </button>
            <button
              onClick={() => setActiveContent('support')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaHeadset />
              <span>Support</span>
            </button>
            <button
              onClick={() => setActiveContent('exit')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 p-3 rounded-md transition-transform"
            >
              <FaSignOutAlt />
              <span>Exit</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
