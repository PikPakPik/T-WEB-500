import React, { useState } from 'react';

const tabs = ['Découvrir', 'Sauvegardées', 'Candidatées', 'Fermées', 'Annulées', 'Discover'];

const Home = () => {
  const [activeTab, setActiveTab] = useState('Découvrir');

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-3xl">Trouver un job</h1>
      <div className="flex items-center rounded-full p-2 overflow-auto gap-4 relative">
        <div className="absolute left-6 w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1200px] h-4 bg-base-300 z-10"></div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center md:w-1/6 rounded-full p-3 py-2 justify-center z-30 transition-colors duration-300 hover:bg-violet-700 hover:text-white active:text-white active:bg-violet-700 ease-in-out ${
              activeTab === tab ? 'bg-violet-600 text-white' : 'bg-base-300'
            }`}
          >
            <span>{tab}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
