import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { Link } from "react-router-dom";

const colors = [
  "bg-red-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-purple-300",
];

const Badge = ({ icon, text }) => (
  <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
    <Icon icon={icon} className="w-4 mr-1" />
    {text}
  </div>
);

const AdsCard = ({ ad, index }) => (
  <div
    key={index}
    className="flex flex-col rounded-3xl shadow-lg overflow-hidden relative"
  >
    <Link to={`/ad/${ad.advertissementId}`}>
      <button className="absolute top-2 right-2 bg-base-300 rounded-3xl px-2 py-1 text-md flex flex-row items-center">
        View
        <Icon icon="fluent-mdl2:go" className="w-3 ml-1" />
      </button>
    </Link>
    <div className={`flex-1 p-6 flex flex-col justify-between ${colors[index % colors.length]}`}>
      <div className="flex-1 text-sm font-light text-black">
        <div className="flex items-center">
          <img src={ad.company.logo} alt="logo" className="w-12 h-12 inline-block mr-2" />
          <div className="flex flex-col">
            <p className="text-xl font-semibold text-gray-900">{ad.title}</p>
            <a href="#" className="hover:underline">
              {ad.company.name}
            </a>
          </div>
        </div>
        <div className="flex flex-row gap-3 mt-3">
          <Badge icon="fluent:location-24-regular" text={ad.place} />
          <Badge icon="material-symbols:school-outline" text={ad.expRequired} />
          <Badge icon="ri:time-line" text={ad.workingTime} />
        </div>
        <p className="mt-3 text-base text-gray-500">
          {ad.description.slice(0, 86)}...
        </p>
      </div>
    </div>
    <div className="flex flex-row justify-between text-sm text-gray-500 bg-white p-4">
      <div className="flex flex-row gap-1 items-center text-xs">
        <Icon icon="ci:clock" />
        Posté il y a {moment.utc(ad.date).local().startOf("seconds").fromNow()}
      </div>
      <span className="font-bold uppercase text-black">{ad.wages}€/an</span>
    </div>
  </div>
);

export default AdsCard;
