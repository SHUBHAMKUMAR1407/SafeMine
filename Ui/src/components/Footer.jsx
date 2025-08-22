// src/components/Footer.jsx
import React from 'react';
import WebLogo from '../assets/Web_Logo.jpg'; // Make sure the path to your logo is correct

const Footer = () => {
  return (
    <footer className="py-10 w-full max-w-screen-xl mx-auto px-8 mb-12 mt-8">
      {/* Horizontal Alignment for All Sections */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img src={WebLogo} alt="Safe Mine Logo" className="h-40 mb-2" /> {/* Increased logo size */}
          {/* Social Icons */}
          <div className="flex space-x-4 p-2 mb-4 md:mb-0">
            <a href="#" className="text-[#CA8A04] hover:text-gray-900 text-2xl" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-[#CA8A04] hover:text-gray-900 text-2xl" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-[#CA8A04] hover:text-gray-900 text-2xl" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-[#CA8A04] hover:text-gray-900 text-2xl" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-[#CA8A04] hover:text-gray-900 text-2xl" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Links Sections */}
        <div className="flex justify-around flex-wrap md:flex-row w-full md:w-auto">
          {/* Product */}
          <div className="mx-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Case studies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Reviews</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Updates</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="mx-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Culture</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="mx-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Getting started</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Help center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Server status</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Report a bug</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Chat support</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="mx-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@company.com" className="text-gray-600 hover:text-gray-900">
                  <i className="far fa-envelope"></i> contact@company.com
                </a>
              </li>
              <li>
                <a href="tel:(414)6875892" className="text-gray-600 hover:text-gray-900">
                  <i className="fas fa-phone"></i> (414) 687 – 5892
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <i className="fas fa-map-marker-alt"></i> 245 RGIRT, Jais, Uttar Pradesh, 229305
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
        <span>Copyright © 2024 </span>
        <span>All Rights Reserved</span>
        <a href="#" className="text-gray-600 hover:text-gray-900 mx-4">Terms and Conditions</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
