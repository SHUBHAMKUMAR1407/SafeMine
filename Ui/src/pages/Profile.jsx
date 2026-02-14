import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, LogOut, Edit, X } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Handle user data structure and form data initialization
  const userData = user ? (user.data?.user || user.user || user) : {};

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        mobile: userData.mobile || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming /api/v1/users/update-account exists and works
      const response = await axios.patch('/api/v1/users/update-account', formData);

      // Update local storage and state
      let newStorageData = { ...user };
      const updatedServerUser = response.data.data; // Assuming ApiResponse structure

      // Helper to merge deep structures if necessary, or just top level if that's how it's stored
      if (newStorageData.data && newStorageData.data.user) {
        newStorageData.data.user = { ...newStorageData.data.user, ...updatedServerUser };
      } else if (newStorageData.user) {
        newStorageData.user = { ...newStorageData.user, ...updatedServerUser };
      } else {
        newStorageData = { ...newStorageData, ...updatedServerUser };
      }

      localStorage.setItem('user', JSON.stringify(newStorageData));
      setUser(newStorageData);
      setIsEditModalOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden relative border-t-8 border-yellow-600">
        {/* Header Background - Clean Black with Ministry/App branding feel */}
        <div className="bg-black h-40 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-yellow-500 rounded-full border-4 border-white flex items-center justify-center text-white text-5xl font-bold uppercase shadow-lg">
              {userData.firstName ? userData.firstName.charAt(0) : 'U'}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                {userData.firstName} {userData.lastName}
                <span className="text-sm bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full font-medium">
                  {userData.firstName}
                </span>
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <Mail size={16} /> {userData.email}
              </p>
            </div>
            <div className="hidden sm:block">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm text-yellow-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm text-yellow-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium text-gray-900">{userData.mobile || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-4">Account Settings</h3>
              <div className="space-y-4">
                <button onClick={handleLogout} className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-red-200">
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 font-bold"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;