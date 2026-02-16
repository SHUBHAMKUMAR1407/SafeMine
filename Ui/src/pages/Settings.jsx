import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Lock, Bell, Moon, CheckCircle, XCircle } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [userData, setUserData] = useState({});
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser.data?.user || parsedUser.user || parsedUser);
        }
    }, []);

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setModalMessage("New passwords do not match.");
            setShowErrorModal(true);
            return;
        }

        try {
            await axios.post('/api/v1/users/change-password', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });
            setModalMessage("Password changed successfully!");
            setShowSuccessModal(true);
            setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (error) {
            setModalMessage(error.response?.data?.message || "Failed to change password. Please check your old password.");
            setShowErrorModal(true);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>

            <div className="bg-white rounded-xl shadow-md overflow-hidden min-h-[500px] flex flex-col md:flex-row">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4">
                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'account' ? 'bg-[#CA8A04] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-[#CA8A04]'}`}
                        >
                            <User size={18} />
                            <span className="font-medium">Account</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'security' ? 'bg-[#CA8A04] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-[#CA8A04]'}`}
                        >
                            <Lock size={18} />
                            <span className="font-medium">Security</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-[#CA8A04] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-[#CA8A04]'}`}
                        >
                            <Bell size={18} />
                            <span className="font-medium">Notifications</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('appearance')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'appearance' ? 'bg-[#CA8A04] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-[#CA8A04]'}`}
                        >
                            <Moon size={18} />
                            <span className="font-medium">Appearance</span>
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    {activeTab === 'account' && (
                        <div className="max-w-lg animate-fade-in">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Account Information</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                    <div className="text-gray-800 font-semibold text-lg">{userData.firstName} {userData.lastName}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                    <div className="text-gray-800 font-semibold text-lg">{userData.email}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                                    <div className="text-gray-800 font-semibold text-lg">{userData.mobile || "Not set"}</div>
                                </div>
                                <div className="pt-4">
                                    <p className="text-sm text-gray-500 italic">To edit these details, please use the "Update" feature in your Profile.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="max-w-lg animate-fade-in">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Change Password</h3>
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={passwordData.oldPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CA8A04]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CA8A04]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        value={passwordData.confirmNewPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CA8A04]"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#CA8A04] text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 transition shadow-md mt-4"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                    )}

                    {(activeTab === 'notifications' || activeTab === 'appearance') && (
                        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                            <div className="bg-gray-100 p-6 rounded-full mb-4">
                                <Lock className="text-gray-400" size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Coming Soon</h3>
                            <p className="text-gray-500 max-w-xs">This feature is currently under development and will be available in the next update.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center relative animate-fade-in-up border-t-4 border-[#CA8A04]">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-[#CA8A04]" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                        <p className="text-gray-600 mb-6">{modalMessage}</p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full py-3 bg-[#CA8A04] text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors shadow-md"
                        >
                            OK, Close
                        </button>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center relative animate-fade-in-up border-t-4 border-[#CA8A04]">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="text-[#CA8A04]" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Attention!</h3>
                        <p className="text-gray-600 mb-6">{modalMessage}</p>
                        <button
                            onClick={() => setShowErrorModal(false)}
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

export default Settings;
