import React, { useState } from "react";
import AdsCard from "../components/cards/AdCard";

const tabs = [
  "Découvrir",
  "Sauvegardées",
  "Candidatées",
  "Fermées",
  "Annulées",
  "Discover",
];

const companies = [
  {
    name: "Google",
    logo: "https://cdn.icon-icons.com/icons2/2428/PNG/512/google_black_logo_icon_147125.png",
  },
  {
    name: "Spotify",
    logo: "https://cdn.icon-icons.com/icons2/791/PNG/512/spotify_icon-icons.com_65503.png",
  },
  {
    name: "Facebook",
    logo: "https://cdn.icon-icons.com/icons2/1/PNG/256/social_facebook_fb_35.png"
  }
];

const ads = [
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[0],
  },
  {
    title: "UX Internship",
    description:
      "loremp ipsum dolor sit ametuhdfgdydgysgsgs sdygsdfgfd fddfgddjhfdhfgd dsysdfgdfysgfdhdfhgdgf",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[1],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[2],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[0],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[1],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[2],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[0],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[1],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[2],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[0],
  },
  {
    title: "UX Internship",
    description: "loremp ipsum dolor sit amet",
    date: new Date(Date.now() - 172800000),
    wages: 40000,
    place: "France",
    workingTime: "Full-time",
    expRequired: "Junior",
    company: companies[1],
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("Découvrir");
  const [displayCount, setDisplayCount] = useState(9);

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
          <AdsCard ad={ad} index={index} />
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
