// src/pages/Home.jsx
import React from 'react';
import ImageSection from '../components/ImageSection';
import TextAndDivs from '../components/TextAndDivs';
import Services from '../components/Services';
import InteractiveChatbot from '../components/InteractiveChatbot';
import FeedbackForm from '../components/FeedbackForm';

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center mt-8">
      <ImageSection />
      <TextAndDivs />
      <Services />
      <InteractiveChatbot/>
      <FeedbackForm/>
    </section>
  );
};

export default Home;
