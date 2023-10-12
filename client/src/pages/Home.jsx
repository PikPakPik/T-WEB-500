import React, { useEffect, useState } from "react";
import AdsCard from "../components/cards/AdCard";

// Constantes pour le fetch et l'affichage
const FETCH_URL = "http://localhost:3001";
const INITIAL_DISPLAY_COUNT = 9;
const INCREMENT_COUNT = 6;
const tabs = [
  "Découvrir",
  "Sauvegardées",
  "Candidatées",
  "Fermées",
  "Annulées",
  "Discover",
];

// Fonction asynchrone pour récupérer les annonces et les entreprises liées
const fetchAdsAndCompanies = async () => {
  const adsRes = await fetch(FETCH_URL);
  const adsData = await adsRes.json();

  // Création de promesses pour chaque entreprise
  const promises = adsData.map((ad) =>
    fetch(`${FETCH_URL}/company/${ad.companyId}`).then((res) => res.json())
  );

  const companies = await Promise.all(promises);
  return adsData.map((ad, index) => ({ ...ad, company: companies[index] }));
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("Découvrir");
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Récupération initiale des annonces
    (async () => {
      try {
        const fetchedAds = await fetchAdsAndCompanies();
        setAds(fetchedAds);
      } catch (error) {
        console.error("Error fetching ads and companies:", error);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-3xl">Trouver un job</h1>
      <div className="flex items-center rounded-full p-2 overflow-auto gap-4 relative">
        <div className="absolute left-6 w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1200px] h-3 bg-base-300 z-10"></div>
        {/* Barre de navigation des onglets */}
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
        {/* Affichage des annonces en fonction du nombre sélectionné */}
        {ads.slice(0, displayCount).map((ad, index) => (
          <AdsCard ad={ad} index={index} key={index} />
        ))}
      </div>
      {ads.length > displayCount && (
        <div className="flex justify-center">
          {/* Bouton pour charger plus d'annonces */}
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-full"
            onClick={() => setDisplayCount(displayCount + INCREMENT_COUNT)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
