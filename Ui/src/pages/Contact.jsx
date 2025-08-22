import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CoalContact from '../assets/Coal Contact.jpg'; // Import the photo

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add a function to handle the form submission, e.g., sending data to an API
    alert(t('contactUs.messageSubmitted'));
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-8 mb-12 mt-12 font-roboto">
      {/* Header Section */}
      <header className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            <span style={{ color: 'black' }}>{t('contactUs.headerTitle').split(' ')[0]} </span>
            <span style={{ color: '#D4B030' }}>{t('contactUs.headerTitle').replace('Contact ', '')}</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            {t('contactUs.headerSubtitle')}
          </p>
        </div>
      </header>

      {/* Contact Form and Photo Section */}
      <section className="container mx-auto py-16 px-6 flex flex-wrap">
        {/* Form Section */}
        <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto h-full flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">{t('contactUs.formTitle')}</h2>
            <p className="text-gray-600 text-center mt-2">
              {t('contactUs.formSubtitle')}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 flex-1">
              {/* Name Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  {t('contactUs.nameLabel')}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
                  placeholder={t('contactUs.namePlaceholder')}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  {t('contactUs.emailLabel')}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
                  placeholder={t('contactUs.emailPlaceholder')}
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  {t('contactUs.messageLabel')}
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
                  rows="5"
                  placeholder={t('contactUs.messagePlaceholder')}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
                >
                  {t('contactUs.sendButtonText')}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Photo Section */}
        <div className="w-full md:w-1/2 pl-4">
          <div className="h-full bg-gray-200 flex items-center justify-center">
            <img
              src={CoalContact}
              alt={t('contactUs.photoAltText')}
              className="object-cover h-full w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{t('contactUs.addressTitle')}</h3>
            <p className="text-gray-600 mt-2">{t('contactUs.addressLine1')}</p>
            <p className="text-gray-600">{t('contactUs.addressLine2')}</p>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{t('contactUs.phoneTitle')}</h3>
            <p className="text-gray-600 mt-2">{t('contactUs.phoneNumber')}</p>
            <p className="text-gray-600">{t('contactUs.phoneHours')}</p>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{t('contactUs.emailTitle')}</h3>
            <p className="text-gray-600 mt-2">{t('contactUs.emailAddress')}</p>
            <p className="text-gray-600">{t('contactUs.emailResponseTime')}</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      
    </div>
  );
};

export default ContactUs;
