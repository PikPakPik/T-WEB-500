import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Fonction pour récupérer les détails de l'annonce et de l'entreprise
const fetchAdAndCompany = async (avertissementId) => {
  const res1 = await fetch(`http://localhost:3001/advert/${avertissementId}`);
  const ad = await res1.json();
  const res2 = await fetch(`http://localhost:3001/company/${ad.companyId}`);
  const company = await res2.json();
  return { ...ad, company };
};

const AdDetail = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const { avertissementId } = useParams();

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données
    (async () => {
      try {
        const fetchedAd = await fetchAdAndCompany(avertissementId);
        setAd(fetchedAd);
        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Error fetching ad and company data:", error);
      }
    })();
  }, [avertissementId]);

  // Affichage de l'état de chargement
  if (loading) {
    return <div>loading...</div>;
  }

  // Destructuration des données de l'annonce
  const {
    title,
    company: { logo, name },
    place,
    expRequired,
    workingTime,
    date,
    wages,
    description,
  } = ad;

  return (
    <div className="container mx-auto px-4 mt-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex flex-row gap-3 mt-3">
              <img
                src={logo}
                alt="logo"
                className="w-12  h-12   inline-block mr-2"
              />
              <p className="text-xl font-semibold">{name}</p>
            </div>
            <div className="flex flex-row gap-3 mt-3">
              <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
                <Icon icon="fluent:location-24-regular" className="w-4 mr-1" />
                {place}
              </div>
              <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
                <Icon
                  icon="material-symbols:school-outline"
                  className="w-4 mr-1"
                />
                {expRequired}
              </div>
              <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
                <Icon icon="ri:time-line" className="w-4 mr-1" />
                {workingTime}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 self-end">
              <button className="btn btn-outline btn-circle btn-sm">
                <Icon icon="fluent:share-24-regular" />
              </button>
              <button className="btn btn-outline btn-circle btn-sm hover:text-red-600">
                <Icon icon="mdi:heart" />
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex flex-row gap-1 items-center text-xs">
                <Icon icon="ci:clock" />
                Posté il y a{" "}
                {moment.utc(date).local().startOf("seconds").fromNow()}
              </div>
              <span className="font-bold uppercase self-end">{wages}€/an</span>
            </div>
          </div>
        </div>
      </div>
      {/* Description de l'annonce */}
      <div className="flex flex-col mt-16">
        <h2 className="text-2xl font-bold">Description</h2>
        <p className="mt-3 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default AdDetail;
