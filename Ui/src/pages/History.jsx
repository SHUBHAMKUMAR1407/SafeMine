import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FileText, CheckCircle, Clock, AlertTriangle, Download } from 'lucide-react';

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Reuse the same details endpoint for now, but in a real app this might be a separate /history endpoint
                // or filtered by date range.
                const response = await api.get('/api/v1/details');
                // Sort by date descending
                const sortedData = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setHistoryData(sortedData);
            } catch (error) {
                console.error("Error fetching history data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const getStatusBadge = (item) => {
        // Mock status logic based on completion of rounds/tasks
        const totalTasks = (item.tasks?.completed || 0) + (item.tasks?.incomplete || 0) + (item.tasks?.skipped || 0);
        const completedTasks = item.tasks?.completed || 0;

        if (totalTasks > 0 && completedTasks === totalTasks) {
            return (
                <span className="flex items-center space-x-1 bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold">
                    <CheckCircle size={14} />
                    <span>Completed</span>
                </span>
            );
        } else if (completedTasks > 0) {
            return (
                <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-bold">
                    <Clock size={14} />
                    <span>In Progress</span>
                </span>
            );
        } else {
            return (
                <span className="flex items-center space-x-1 bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-bold">
                    <AlertTriangle size={14} />
                    <span>Pending</span>
                </span>
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CA8A04]"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-full">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Report History</h2>
                    <p className="text-gray-600">Archive of all submitted Daily Safety Reports.</p>
                </div>
                <button className="flex items-center space-x-2 bg-[#CA8A04] text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition shadow-md">
                    <Download size={18} />
                    <span>Export All</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <th className="px-6 py-4 font-semibold">Report Date</th>
                                <th className="px-6 py-4 font-semibold">Report ID</th>
                                <th className="px-6 py-4 font-semibold">Total Staff</th>
                                <th className="px-6 py-4 font-semibold">Rounds Done</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {historyData.length > 0 ? (
                                historyData.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                            {new Date(item.date).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                                            #{item._id.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{item.employees?.total || 0}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {item.rounds?.completed || 0} / {(item.rounds?.completed || 0) + (item.rounds?.inProgress || 0) + (item.rounds?.skipped || 0) + (item.rounds?.overdue || 0)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(item)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#CA8A04] hover:text-yellow-700 font-medium text-sm flex items-center justify-end space-x-1 ml-auto">
                                                <FileText size={16} />
                                                <span>View</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No history records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;
