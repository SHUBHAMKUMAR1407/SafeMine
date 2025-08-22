import React, { useEffect } from 'react';
import ChatImage from '../assets/chat.png'; // Image for the chatbot heading section


const InteractiveChatbot = () => {
  useEffect(() => {
    // Load Botpress webchat script
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    // Load Botpress config script
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/05/16/20250105165416-2BABZS29.js';
    script2.async = true;
    document.body.appendChild(script2);

    // Cleanup scripts on component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const toggleChatbot = () => {
    if (window.botpressWebChat) {
      const isVisible = window.botpressWebChat.isOpen(); // Check if chatbot is open
      if (isVisible) {
        window.botpressWebChat.hide();
      } else {
        window.botpressWebChat.show();
      }
    } else {
      console.error('Botpress is not loaded yet.');
    }
  };

  return (
    <div className="w-full max-w-screen-xl px-4 sm:px-8 mb-8 sm:mb-12 relative">
      {/* Heading */}
      <div className="font-roboto text-left text-[#4F4F4F] text-2xl sm:text-[35.15px] font-bold leading-[1.2] sm:leading-[42.18px] mb-4">
        Interactive Chatbot
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={ChatImage}
          alt="Interactive Chatbot"
          className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-auto object-cover rounded-md sm:rounded-[24px] shadow-lg"
        />
      </div>

      {/* Chatbot Icon */}
    
      </div>
    
  );
};

export default InteractiveChatbot;
