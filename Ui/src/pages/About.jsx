import React from "react";
import CoalAbout from '../assets/CoalAbout.jpg'; // Adjust the path as needed
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const AboutUs = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <div className="w-full max-w-screen-xl mx-auto px-8 mb-12 mt-12 font-roboto">
      {/* Header Section */}
      <header className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            <span style={{ color: 'black' }}>{t('aboutUs.headerTitle').split(' ')[0]} </span>
            <span style={{ color: '#D4B030' }}>{t('aboutUs.headerTitle').replace('About the ', '')}</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            {t('aboutUs.headerSubtitle')}
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="container mx-auto py-16 px-6">
        {/* Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <img src={CoalAbout} alt={t('aboutUs.missionImageAlt')} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800">{t('aboutUs.missionTitle')}</h2>
            <p className="text-gray-600 mt-4">
              {t('aboutUs.missionDescription')}
            </p>
          </div>
        </div>

        {/* Our Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800">{t('aboutUs.visionTitle')}</h2>
            <p className="text-gray-600 mt-4">
              {t('aboutUs.visionDescription')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <img src={CoalAbout} alt={t('aboutUs.visionImageAlt')} className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <img src={CoalAbout} alt={t('aboutUs.valuesImageAlt')} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800">{t('aboutUs.valuesTitle')}</h2>
            <p className="text-gray-600 mt-4">
              {t('aboutUs.valuesDescription')}
            </p>
          </div>
        </div>

        {/* Our History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800">{t('aboutUs.historyTitle')}</h2>
            <p className="text-gray-600 mt-4">
              {t('aboutUs.historyDescription')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <img src={CoalAbout} alt={t('aboutUs.historyImageAlt')} className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      
    </div>
  );
};

export default AboutUs;
