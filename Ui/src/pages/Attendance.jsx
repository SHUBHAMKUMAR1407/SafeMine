import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar, Users, UserCheck, UserX, Clock, UserMinus } from 'lucide-react';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        avgPresent: 0,
        avgAbsent: 0,
        totalEntries: 0
    });

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await api.get('/api/v1/details');
                const data = response.data.data;
                setAttendanceData(data);

                // Calculate summary stats
                if (data.length > 0) {
                    const totalPresent = data.reduce((acc, curr) => acc + (curr.employees?.present || 0), 0);
                    const totalAbsent = data.reduce((acc, curr) => acc + (curr.employees?.absent || 0), 0);
                    setStats({
                        avgPresent: Math.round(totalPresent / data.length),
                        avgAbsent: Math.round(totalAbsent / data.length),
                        totalEntries: data.length
                    });
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CA8A04]"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Attendance Overview</h2>
                <p className="text-gray-600">Daily employee attendance records and statistics.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#CA8A04] flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase">Avg. Present</p>
                        <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.avgPresent}</h3>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-full">
                        <UserCheck className="text-[#CA8A04]" size={28} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase">Avg. Absent</p>
                        <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.avgAbsent}</h3>
                    </div>
                    <div className="p-3 bg-red-50 rounded-full">
                        <UserX className="text-red-500" size={28} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase">Total Days Recorded</p>
                        <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.totalEntries}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full">
                        <Calendar className="text-blue-500" size={28} />
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Attendance History</h3>
                    <button className="text-[#CA8A04] hover:text-yellow-700 font-medium text-sm">Download Report</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-center">Total Workforce</th>
                                <th className="px-6 py-4 font-semibold text-center text-green-600">Present</th>
                                <th className="px-6 py-4 font-semibold text-center text-red-500">Absent</th>
                                <th className="px-6 py-4 font-semibold text-center text-orange-500">Late Arrival</th>
                                <th className="px-6 py-4 font-semibold text-center text-blue-500">On Leave</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attendanceData.length > 0 ? (
                                attendanceData.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                            {new Date(item.date).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                weekday: 'short'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-600 font-medium">{item.employees?.total || 0}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold">
                                                {item.employees?.present || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-red-100 text-red-700 py-1 px-3 rounded-full text-xs font-bold">
                                                {item.employees?.absent || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-orange-600 font-medium">{item.employees?.lateArrival || 0}</td>
                                        <td className="px-6 py-4 text-center text-blue-600 font-medium">{item.employees?.onLeave || 0}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No attendance records found.
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

export default Attendance;
