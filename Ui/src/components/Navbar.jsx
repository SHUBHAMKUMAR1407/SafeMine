import React, { useState } from 'react';
import { FaUser, FaSearch, FaUniversalAccess, FaLanguage, FaHome, FaExclamationTriangle, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import MinistryLogo from '../assets/Ministry.png';
import WebLogo from '../assets/Web_Logo.jpg';
import Search from './Search';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isLanguageVisible, setLanguageVisible] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Toggle Functions
  const handleSearchToggle = () => setSearchVisible(!isSearchVisible);
  const handleLanguageToggle = () => setLanguageVisible(!isLanguageVisible);
  const handleAlertToggle = () => setAlertVisible(!isAlertVisible);
  const handleLogin = () => navigate('/login');
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Language Change Function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageVisible(false);
  };

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout Function
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <header className="w-full flex flex-col items-center lg:px-8">
        {/* Upper Section: Logos and Icons */}
        <div className="flex items-center justify-between w-full lg:max-w-7xl p-4">
          <div className="flex items-center space-x-4">
            <img src={MinistryLogo} alt="Ministry Logo" className="h-[60px] lg:h-[100px] object-contain" />
            <img src={WebLogo} alt="Website Logo" className="h-[60px] lg:h-[100px] object-contain" />
          </div>

          {/* Icons for larger screens */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex items-center space-x-4">
              {user ? (
                <li className="relative group">
                  {/* Profile Icon */}
                  <FaUser
                    title={t('navbar.profile')}
                    className="cursor-pointer hover:text-gray-400 text-xl"
                  />

                  {/* Dropdown (only visible on hover) */}
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ul className="py-2">
                      <li>
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                          {t('navbar.profile')}
                        </Link>
                      </li>
                      <li>
                        <button onClick={logout} className="block px-4 py-2 hover:bg-gray-200">
                          {t('navbar.logout')}
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li>
                  <FaUser title={t('navbar.login')} className="cursor-pointer hover:text-gray-400 text-xl" onClick={handleLogin} />
                </li>
              )}
              <li>
                <FaSearch title={t('navbar.search')} className="cursor-pointer hover:text-gray-400 text-xl" onClick={handleSearchToggle} />
              </li>
              <li>
                <FaUniversalAccess title={t('navbar.accessibility')} className="cursor-pointer hover:text-gray-400 text-xl" />
              </li>
              <li>
                <FaLanguage title={t('navbar.language')} className="cursor-pointer hover:text-gray-400 text-xl" onClick={handleLanguageToggle} />
              </li>
              <li>
                <FaExclamationTriangle title={t('navbar.alert')} className="cursor-pointer hover:text-red-600 text-xl" onClick={handleAlertToggle} />
              </li>
            </ul>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-2xl focus:outline-none">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Lower Section: Navbar Links for larger screens */}
        <nav className="hidden lg:flex justify-center w-full mt-2 lg:max-w-7xl px-4 border-t border-gray-200">
          <ul className="flex space-x-8 font-medium mt-4">
            <li><Link to="/" className="hover:text-gray-500 font-bold">{t('navbar.home')}</Link></li>
            <li><Link to="/about" className="hover:text-gray-500 font-bold">{t('navbar.about')}</Link></li>
            <li><Link to="/contact" className="hover:text-gray-500 font-bold">{t('navbar.contact')}</Link></li>
            <li><Link to="/knowledge-center" className="hover:text-gray-500 font-bold">{t('navbar.knowledgeCenter')}</Link></li>
            <li><Link to="/media-center" className="hover:text-gray-500 font-bold">{t('navbar.mediaCenter')}</Link></li>
            <li><Link to="/dashboard" className="hover:text-gray-500 font-bold">{t('navbar.dashboard')}</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu for smaller screens */}
        {isMenuOpen && (
          <div className="lg:hidden w-full bg-gray-100 p-4">
            <div className="flex flex-col space-y-4">
              {user ? (
                <button onClick={logout} className="flex items-center space-x-2 hover:text-gray-400">
                  <FaUser /><span>{t('navbar.logout')}</span>
                </button>
              ) : (
                <button onClick={handleLogin} className="flex items-center space-x-2 hover:text-gray-400">
                  <FaUser /><span>{t('navbar.login')}</span>
                </button>
              )}
              <button onClick={handleSearchToggle} className="flex items-center space-x-2 hover:text-gray-400">
                <FaSearch /><span>{t('navbar.search')}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-gray-400">
                <FaUniversalAccess /><span>{t('navbar.accessibility')}</span>
              </button>
              <button onClick={handleLanguageToggle} className="flex items-center space-x-2 hover:text-gray-400">
                <FaLanguage /><span>{t('navbar.language')}</span>
              </button>
              <button onClick={handleAlertToggle} className="flex items-center space-x-2 hover:text-red-600">
                <FaExclamationTriangle /><span>{t('navbar.alert')}</span>
              </button>
            </div>

            {/* Mobile Navbar Links */}
            <ul className="flex flex-col space-y-2 mt-4">
              <li><Link to="/" className="hover:text-gray-500 font-bold">{t('navbar.home')}</Link></li>
              <li><Link to="/about" className="hover:text-gray-500 font-bold">{t('navbar.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-gray-500 font-bold">{t('navbar.contact')}</Link></li>
              <li><Link to="/knowledge-center" className="hover:text-gray-500 font-bold">{t('navbar.knowledgeCenter')}</Link></li>
              <li><Link to="/media-center" className="hover:text-gray-500 font-bold">{t('navbar.mediaCenter')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-gray-500 font-bold">{t('navbar.dashboard')}</Link></li>
            </ul>
          </div>
        )}
      </header>

      {/* Search Component */}
      <Search isVisible={isSearchVisible} onClose={() => setSearchVisible(false)} />

      {/* Language Selection Overlay */}
      {isLanguageVisible && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-lg z-50 p-4">
          <button onClick={() => changeLanguage('en')} className="m-2 p-2 bg-gray-200 hover:bg-gray-300 rounded">English</button>
          <button onClick={() => changeLanguage('hi')} className="m-2 p-2 bg-gray-200 hover:bg-gray-300 rounded">Hindi</button>
        </div>
      )}

      {/* Alert Overlay */}
      {isAlertVisible && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <FaExclamationTriangle className="text-red-600 text-6xl mb-4" />
            <p className="text-xl font-bold mb-4">{t('alert.message')}</p>
            <button onClick={handleAlertToggle} className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
              {t('alert.close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
