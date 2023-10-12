import React, { useEffect, useState } from "react";
import AdsCard from "../components/cards/AdCard";

const tabs = [
  "Découvrir",
  "Sauvegardées",
  "Candidatées",
  "Fermées",
  "Annulées",
  "Discover",
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("Découvrir");
  const [displayCount, setDisplayCount] = useState(9);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => {
        const promises = data.map((ad) =>
          fetch(`http://localhost:3001/company/${ad.companyId}`).then((res) =>
            res.json()
          )
        );
        
        Promise.all(promises).then((companies) => {
          const newAds = data.map((ad, index) => ({
            ...ad,
            company: companies[index],
          }));
          setAds(newAds);
        });
      });
  }, []);
  

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-3xl">Trouver un job</h1>
      <div className="flex items-center rounded-full p-2 overflow-auto gap-4 relative">
        <div className="absolute left-6 w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1200px] h-3 bg-base-300 z-10"></div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center md:w-1/6 rounded-full p-3 py-2 justify-center z-30 transition-colors duration-300 hover:bg-violet-700 hover:text-white hover:cursor-pointer active:text-white active:bg-violet-700 ease-in-out ${
              activeTab === tab ? "bg-violet-600 text-white" : "bg-base-300"
            }`}
          >
            <span>{tab}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {ads.slice(0, displayCount).map((ad, index) => (
          <AdsCard ad={ad} index={index} key={index}/>
        ))}
      </div>
      {ads.length > displayCount && (
        <div className="flex justify-center">
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-full"
            onClick={() => setDisplayCount(displayCount + 6)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
