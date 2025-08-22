import React from 'react';
import Dash from '../assets/Dash.jpg';
import Map from '../assets/map.jpg';

const TextAndDivs = () => {
  return (
    <>
      {/* Header Section */}
      <div className="w-full max-w-screen-xl px-4 sm:px-8 mb-8 sm:mb-12">
        <h1 className="text-lg sm:text-3xl font-semibold font-['Roboto'] tracking-[-0.02em]">
          <span className="text-black">Welcome to </span>
          <span className="text-[#D4B030] text-[24px] sm:text-[40px]">Ministry of Coal</span>
        </h1>
        <p className="mt-2 sm:mt-4 text-base sm:text-lg font-['Roboto'] font-light">
          Welcome to the website of Ministry of Coal, Government of India.
        </p>
      </div>

      <div className="relative w-full max-w-screen-xl px-4 sm:px-8 mb-8 sm:mb-12">
        {/* Upper Row */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 mb-8 sm:mb-12">
          {/* 1st div */}
          <div className="w-full lg:w-[60%] h-[280px] sm:h-[367px] rounded-[16px] sm:rounded-[24px] bg-gradient-to-b from-[#CC9F9F] to-[#DFDFDF] shadow-md relative">
            <div className="p-4 sm:p-6">
              <h2 className="text-left font-['Roboto'] text-lg sm:text-[34.36px] font-bold">
                Multilingual Log System
              </h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base font-['Roboto']">
                Multilingual log system filled by supervisor for every shift. Generating a PDF report based on the details filled by the supervisor.
              </p>
            </div>
            <img
              src={Dash}
              alt="Dashboard"
              className="absolute bottom-2 sm:bottom-0 right-2 sm:right-0 w-[180px] h-[120px] sm:w-[300px] sm:h-[180px] lg:w-[350px] lg:h-[220px] object-cover rounded-[8px] sm:rounded-[16px]"
            />
          </div>

          {/* 2nd div */}
          <div className="w-full lg:w-[40%] h-[280px] sm:h-[367px] rounded-[16px] sm:rounded-[24px] bg-gradient-to-b from-[#C2BD8E] via-[#E2B269] to-[#EDEDED] shadow-md">
            <div className="p-4 sm:p-6">
              <h2 className="text-left font-['Roboto'] text-lg sm:text-[34.36px] font-bold">
                Profile
              </h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base font-['Roboto']">
                Important contact details and profile of every worker and supervisor.
              </p>
            </div>
          </div>
        </div>

        {/* Lower Row with Gap */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* 3rd div */}
          <div className="w-full lg:w-[40%] h-[300px] sm:h-[411px] rounded-[16px] sm:rounded-[24px] bg-gradient-to-b from-[#84FFFF] to-[#FFFFFF] shadow-md">
            <div className="p-4 sm:p-6">
              <h2 className="text-left font-['Roboto'] text-lg sm:text-[34.36px] font-bold">
                SMP
              </h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base font-['Roboto']">
                Safety Manual (SMP) which will display the safety rules through images, written guidelines, and a specialized chatbot that will suggest the appropriate safety measures whenever asked.
              </p>
            </div>
          </div>

          {/* 4th div */}
          <div className="w-full lg:w-[60%] h-[300px] sm:h-[411px] rounded-[16px] sm:rounded-[24px] bg-gradient-to-b from-[#DFDFDF] to-[#83A2D0] shadow-md relative">
            <div className="p-4 sm:p-6">
              <h2 className="text-left font-['Roboto'] text-lg sm:text-[34.36px] font-bold">
                Worker Tracking Map
              </h2>
            </div>
            <img
              src={Map}
              alt="Map"
              className="absolute bottom-2 sm:bottom-0 right-2 sm:right-0 w-[200px] h-[150px] sm:w-[400px] sm:h-[250px] object-cover rounded-[8px] sm:rounded-[16px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextAndDivs;
