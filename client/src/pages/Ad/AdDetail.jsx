import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Fonction pour récupérer les détails de l'annonce et de l'entreprise
const fetchAdAndCompany = async (avertissementId) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (window.localStorage.token) {
    headers["Authorization"] = "Bearer " + window.localStorage.token;
  }

  const res1 = await fetch(`http://localhost:3001/advert/${avertissementId}`, {
    method: "GET",
    headers,
  });

  const ad = await res1.json();
  const res2 = await fetch(
      `http://localhost:3001/company/${ad.oneAdvertisement.companyId}`,
  );
  const company = await res2.json();
  return { ...ad, company };
};

const AdDetail = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const { avertissementId } = useParams();
  const { user } = useAuth();

  const [formData, setFormData] = useState({});

  const toggleSavedStatus = async () => {
    try {
      const res = await fetch(
          `http://localhost:3001/advert/${avertissementId}/save`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.token || ""}`,
            },
            body: JSON.stringify({ isSaved: !isSaved, isApplied: !isApplied }),
          },
      );

      if (res.ok) {
        setIsSaved(!isSaved); // Mettre à jour le state
      }
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données
    (async () => {
      try {
        const fetchedAd = await fetchAdAndCompany(avertissementId);
        setAd(fetchedAd);

        setFormData({
          firstName: user ? user.firstName : "",
          lastName: user ? user.lastName : "",
          email: user ? user.email : "",
          exp: user ? user.exp : "",
          school: user ? user.school : "",
          skills: user ? user.skills : "",
        });

        if (window.localStorage.token) {
          if (fetchedAd.jobInformation.length > 0)
            setIsSaved(fetchedAd.jobInformation[0].isSaved);
        }
        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Error fetching ad and company data:", error);
      }
    })();
  }, [avertissementId, user]);

  const onInputChange = (e) => {
    formData[e.target.name] = e.target.value;
  };

  const sendApplication = async () => {
    const token = user ? "Bearer " + window.localStorage.token : "";
    try {
      const res = await fetch(
          "http://localhost:3001/application/" + avertissementId,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: token },
            body: JSON.stringify({
              ...formData,
            }),
          },
      );
      const data = await res.json();
      if (res.ok) {
        setIsApplied(true);
        document.getElementById("my_modal_5").close();
      }
    } catch (error) {
      console.error("Error sending application:", error);
    }
  };

  // Affichage de l'état de chargement
  if (loading) {
    return <div>loading...</div>;
  }

  // Destructuration des données de l'annonce
  let {
    oneAdvertisement: {
      title,
      place,
      expRequired,
      workingTime,
      date,
      wages,
      description,
    },
    company: { logo, name },
    jobInformation,
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
                    className="w-28 h-28 inline-block mr-2"
                />
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">{name}</p>
                  <div className="flex md:flex-row flex-col gap-3 mt-3">
                    <div className="badge badge-outline md:whitespace-nowrap md:text-xs">
                      <Icon
                          icon="fluent:location-24-regular"
                          className="w-4 mr-1"
                      />
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
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-3 self-end">
                <button className="btn btn-outline btn-circle btn-sm">
                  <Icon icon="fluent:share-24-regular" />
                </button>
                {user && (
                <button
                    className="btn btn-outline btn-circle btn-sm hover:text-red-600"
                    onClick={toggleSavedStatus}
                >
                  <Icon
                      icon="mdi:heart"
                      className={isSaved ? "text-red-600" : ""}
                  />
                </button>
                )}
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <div className="flex flex-row gap-1 items-center text-xs">
                  <Icon icon="ci:clock" />
                  Posté il y a{" "}
                  {moment.utc(date).local().startOf("seconds").fromNow()}
                </div>
                <span className="font-bold uppercase self-end">{wages}€/an</span>
                {/* Bouton pour postuler */}
                <button
                    className="btn btn-info"
                    onClick={() =>
                        document.getElementById("my_modal_5").showModal()
                    }
                >
                  Je postule
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Description de l'annonce */}
        <div className="flex flex-col mt-16">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="mt-3 text-base text-gray-500">{description}</p>
        </div>

        {/* Modal */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="font-bold text-lg">
              Je postule chez <span className="underline">{name}</span>
            </div>
            <hr className="my-6" />
            <form className="space-y-2">
              <label htmlFor="firstName" className="label">
                Prénom
              </label>
              <input
                  name="firstName"
                  type="text"
                  placeholder="John"
                  className="input input-bordered w-full"
                  onChange={onInputChange}
                  defaultValue={formData.firstName}
              />
              <label htmlFor="lastName" className="label">
                Nom
              </label>
              <input
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered w-full"
                  onChange={onInputChange}
                  defaultValue={formData.lastName}
              />
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                  name="email"
                  type="email"
                  placeholder="johndoe@exemple.com"
                  className="input input-bordered w-full"
                  onChange={onInputChange}
                  defaultValue={formData.email}
              />
              <label htmlFor="exp" className="label">
                Expérience
              </label>
              <select
                  name="exp"
                  className="select select-bordered w-full"
                  required
                  defaultValue={formData.exp}
                  onChange={onInputChange}
              >
                <option disabled>
                  --Choisir une option--
                </option>
                <option value="jeune">Jeune diplômé</option>
                <option value="junior">Junior</option>
                <option value="confirme">Confirmé</option>
                <option value="senior">Senior</option>
              </select>
              <label htmlFor="school" className="label">
                Ecole
              </label>
              <input
                  name="school"
                  type="text"
                  placeholder="Ecole 42"
                  className="input input-bordered w-full"
                  onChange={onInputChange}
                  defaultValue={formData.school}
              />
              <label htmlFor="skills" className="label">
                Compétences
              </label>
              <input
                  name="skills"
                  type="text"
                  placeholder="React, Node.js, ..."
                  className="input input-bordered w-full"
                  onChange={onInputChange}
                  defaultValue={formData.skills}
              />
            </form>
            <div className="modal-action border-t-2 mt-6 pt-4 flex justify-between gap-4">
              <button className="btn btn-primary" onClick={sendApplication}>
                Envoyer
              </button>
              <form method="dialog">
                {/* Formulaire de candidature */}
                <button className="btn">Annuler</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
  );
};

export default AdDetail;
