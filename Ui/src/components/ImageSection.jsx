import React from 'react';
import HomeCoal from '../assets/HomeCoal.jpg'; // Update with the correct path to your image

const ImageSection = () => {
  return (
    <div className="w-full max-w-screen-xl px-4 sm:px-8 mb-8 sm:mb-12 mt-4">
      <img
        src={HomeCoal}
        alt="Coal Mine Safety"
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[448px] object-cover rounded-[16px] sm:rounded-[24px] shadow-lg"
      />
    </div>
  );
};

export default ImageSection;
