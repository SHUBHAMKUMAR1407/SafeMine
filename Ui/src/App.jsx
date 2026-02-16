import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import NewsPage from './pages/News';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import ForgotPasswordPage from './components/ForgotPassword';
import Footer from './components/Footer';
import FillForm from './components/FillForm';
import Dashboard from './components/Dashboard';
import KnowledgeCenter from './pages/KnowledgeCenter';
import { useAuth } from './context/AuthContext';

import './i18n'; // Import i18n configuration


const App = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { isAuthenticated } = useAuth();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen">
        {/* Routes that need Navbar and Footer */}
        <Routes>
          {/* Routes that include Navbar and Footer */}
          <Route
            path="/"
            element={
              <>
                <Navbar onLanguageChange={handleLanguageChange} />
                <main className="flex-1 p-8">
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar onLanguageChange={handleLanguageChange} />
                <main className="flex-1 p-8">
                  <About />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar onLanguageChange={handleLanguageChange} />
                <main className="flex-1 p-8">
                  <Contact />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/media-center"
            element={
              <>
                <Navbar onLanguageChange={handleLanguageChange} />
                <main className="flex-1 p-8">
                  <NewsPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar onLanguageChange={handleLanguageChange} />
                <main className="flex-1 p-8">
                  <Profile />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/knowledge-center"
            element={
              <>
                <Navbar onLanguageChange={handleLanguageChange} />
                <main className="flex-1 p-8">
                  <KnowledgeCenter />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />


          {/* Dashboard route without Navbar or Footer */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/dashboard/fill-form" element={<FillForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
