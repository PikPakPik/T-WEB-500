import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { useParams } from "react-router-dom";

const { useState } = require("react");
const { useEffect } = require("react");

const AdDetail = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const { avertissementId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/advert/${avertissementId}`)
      .then((res) => res.json())
      .then((data) => {
        const ad = data;
        const idCompany = ad.companyId;
        fetch(`http://localhost:3001/company/${idCompany}`)
          .then((res) => res.json())
          .then((data) => {
            const company = data;

            setAd({ ...ad, company });
            setLoading(false);
          });
      });
  });
  return loading ? (
    <div>loading...</div>
  ) : (
    <div className="container mx-auto px-4 mt-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{ad.title}</h1>
            <div className="flex flex-row gap-3 mt-3">
              <img
                src={ad.company.logo}
                alt="logo"
                className="w-12  h-12   inline-block mr-2"
              />
              <p className="text-xl font-semibold">{ad.company.name}</p>
            </div>
            <div className="flex flex-row gap-3 mt-3">
              <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
                <Icon icon="fluent:location-24-regular" className="w-4 mr-1" />
                {ad.place}
              </div>
              <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
                <Icon
                  icon="material-symbols:school-outline"
                  className="w-4 mr-1"
                />
                {ad.expRequired}
              </div>
              <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
                <Icon icon="ri:time-line" className="w-4 mr-1" />
                {ad.workingTime}
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
                {moment.utc(ad.date).local().startOf("seconds").fromNow()}
              </div>
              <span className="font-bold uppercase self-end">
                {ad.wages}€/an
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-16">
        <h2 className="text-2xl font-bold">Description</h2>
        <p className="mt-3 text-base text-gray-500">{ad.description}</p>
      </div>
    </div>
  );
};

export default AdDetail;
