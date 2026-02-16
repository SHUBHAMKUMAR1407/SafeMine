import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, LogOut, Edit, X, Camera, Trash2, CheckCircle, XCircle } from 'lucide-react';
import api from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      const response = await api.patch('/api/v1/users/update-account', formData);

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
      setModalMessage("Profile updated successfully!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating profile", error);
      setModalMessage("Failed to update profile. Please try again.");
      setShowErrorModal(true);
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden relative">
        {/* Header Background - Dark Slate with Ministry/App branding feel */}
        <div className="bg-gray-100 h-40 relative">
          <div className="absolute -bottom-16 left-8 group">
            <div className="relative">
              <div className="w-32 h-32 bg-[#CA8A04] rounded-full border-4 border-white flex items-center justify-center text-white text-5xl font-bold uppercase shadow-lg overflow-hidden">
                {userData.avatar ? (
                  <img
                    src={userData.avatar.replace('public', '').replace(/\\/g, '/')}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userData.firstName ? userData.firstName.charAt(0) : 'U'
                )}
              </div>

              {/* Classic Camera Icon Badge */}
              <div className="absolute bottom-0 right-0 flex gap-1">
                <button
                  className="bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
                  onClick={() => document.getElementById('avatar-upload').click()}
                  title="Update Profile Picture"
                >
                  <Camera size={18} />
                </button>
                {userData.avatar && (
                  <button
                    className="bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors text-red-500"
                    onClick={() => setIsDeleteModalOpen(true)}
                    title="Remove Profile Picture"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('avatar', file);

                try {
                  const response = await api.post('/api/v1/users/avatar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });

                  // Update local user state
                  const updatedUser = { ...user };
                  if (updatedUser.data?.user) {
                    updatedUser.data.user.avatar = response.data.data.avatar;
                  } else if (updatedUser.user) {
                    updatedUser.user.avatar = response.data.data.avatar;
                  }

                  localStorage.setItem('user', JSON.stringify(updatedUser));
                  setUser(updatedUser);
                  setModalMessage("Profile picture updated!");
                  setShowSuccessModal(true);
                } catch (error) {
                  console.error('Error uploading avatar:', error);
                  alert('Failed to upload profile picture.');
                }
              }}
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                {userData.firstName} {userData.lastName}
                <span className="text-sm bg-yellow-100 text-[#CA8A04] py-1 px-3 rounded-full font-medium">
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
                  <div className="bg-white p-2 rounded-full shadow-sm text-[#CA8A04]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm text-[#CA8A04]">
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#CA8A04]"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#CA8A04]"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#CA8A04]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#CA8A04] text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 font-bold"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center relative">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Remove Profile Picture?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to remove your profile picture? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await api.delete('/api/v1/users/avatar');

                    const updatedUser = { ...user };
                    if (updatedUser.data?.user) {
                      updatedUser.data.user.avatar = null;
                    } else if (updatedUser.user) {
                      updatedUser.user.avatar = null;
                    }

                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    setIsDeleteModalOpen(false);
                    setModalMessage("Profile picture removed!");
                    setShowSuccessModal(true);
                  } catch (error) {
                    console.error("Error removing avatar:", error);
                    alert("Failed to remove profile picture");
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
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

export default Profile;