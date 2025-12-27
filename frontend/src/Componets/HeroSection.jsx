import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-[#007f7f] from-indigo-600 to-blue-500 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your work and worker </h1>
        <p className="text-lg md:text-xl mb-8">
          Explore thousands of opportunities and take the next step in your career.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="work and worker or workType"
            className="w-full md:w-1/3 px-4 py-2 rounded-md text-black bg-white"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full md:w-1/4 px-4 py-2 rounded-md text-black bg-white"
          />
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
