import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const DashboardCharts = ({ data }) => {
  const roundsData = {
    labels: ['Completed', 'Overdue', 'Skipped', 'In Progress', 'Cancelled'],
    datasets: [
      {
        data: [
          data?.rounds?.completed || 0,
          data?.rounds?.overdue || 0,
          data?.rounds?.skipped || 0,
          data?.rounds?.inProgress || 0,
          data?.rounds?.cancelled || 0,
        ],
        backgroundColor: ['#4CAF50', '#FFA726', '#EF5350', '#42A5F5', '#FF7043'],
      },
    ],
  };

  const tasksData = {
    labels: ['Completed', 'Incomplete', 'Skipped'],
    datasets: [
      {
        data: [
          data?.tasks?.completed || 0,
          data?.tasks?.incomplete || 0,
          data?.tasks?.skipped || 0,
        ],
        backgroundColor: ['#4CAF50', '#FFA726', '#EF5350'],
      },
    ],
  };

  const actionsData = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        data: [
          data?.actions?.pending || 0,
          data?.actions?.completed || 0,
        ],
        backgroundColor: ['#FFA726', '#4CAF50'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
        },
      },
    },
  };

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Rounds</h3>
        <div className="h-64">
          <Doughnut data={roundsData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Tasks</h3>
        <div className="h-64">
          <Doughnut data={tasksData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        <div className="h-64">
          <Doughnut data={actionsData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow col-span-full">
        <h3 className="text-lg font-semibold mb-4">Employee Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-blue-600">
              {data?.employees?.total || 0}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Present</p>
            <p className="text-2xl font-bold text-green-600">
              {data?.employees?.present || 0}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-red-600">
              {data?.employees?.absent || 0}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Late Arrival</p>
            <p className="text-2xl font-bold text-yellow-600">
              {data?.employees?.lateArrival || 0}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">On Leave</p>
            <p className="text-2xl font-bold text-purple-600">
              {data?.employees?.onLeave || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
