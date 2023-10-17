import { useState } from "react";
import { formatDateToDateTime } from "../../../../utils/formatDateToDateTime";
import { toast } from "react-toastify";

const CompanyAds = ({ user }) => {
  const [currentAd, setCurrentAd] = useState(null);
  const [modalAction, setModalAction] = useState("Ajouter");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    wages: "",
    place: "",
    workingTime: "",
    expRequired: "",
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (action, ad) => {
    setModalAction(action);
    setCurrentAd(ad);
    document.getElementById("my_modal_2").showModal();
  };
  const handleAddAd = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/advert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Votre annonce a bien été ajoutée");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleUpdateAd = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/advert/${currentAd.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Votre annonce a bien été modifiée");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteAd = async () => {};
  return (
    <div>
      <h1 className="text-3xl">Mes annonces</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Wages</th>
              <th>Place</th>
              <th>Working Time</th>
              <th>Experience required</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.company.advertissements.map((ad, index) => (
              <tr key={index}>
                <td>{ad.id}</td>
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>{formatDateToDateTime(ad.date)}</td>
                <td>{ad.wages}</td>
                <td>{ad.place}</td>
                <td>{ad.workingTime}</td>
                <td>{ad.expRequired}</td>
                <td className={"flex"}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setFormData({
                        title: ad.title,
                        description: ad.description,
                        wages: ad.wages,
                        place: ad.place,
                        workingTime: ad.workingTime,
                        expRequired: ad.expRequired,
                      });
                      openModal("Modifier", ad);
                    }}
                  >
                    Modifier
                  </button>
                  <button className="btn btn-error" onClick={() => {}}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-success mt-8"
          onClick={() => openModal("Ajouter", null)}
        >
          Ajouter une annonce
        </button>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalAction} une annonce</h3>
          <label htmlFor="title" className="label">
            Titre de l'annonce
          </label>
          <input
            type="text"
            name="title"
            onChange={onInputChange}
            className="input input-bordered w-content ml-2 w-full"
            defaultValue={currentAd?.title || ""}
          />
          <label htmlFor="description" className="label">
            Description de l'annonce
          </label>
          <textarea
            name="description"
            onChange={onInputChange}
            className="textarea h-24 textarea-bordered ml-2 w-full"
            defaultValue={currentAd?.description || ""}
          />
          <label htmlFor="wages" className="label">
            Salaire
          </label>
          <input
            type="text"
            name="wages"
            onChange={onInputChange}
            className="input input-bordered w-content ml-2 w-full"
            defaultValue={currentAd?.wages || ""}
          />
          <label htmlFor="place" className="label">
            Lieu
          </label>
          <input
            type="text"
            name="place"
            onChange={onInputChange}
            className="input input-bordered w-content ml-2 w-full"
            defaultValue={currentAd?.place || ""}
          />
          <label htmlFor="workingTime" className="label">
            Temps de travail
          </label>
          <input
            type="text"
            name="workingTime"
            onChange={onInputChange}
            className="input input-bordered w-content ml-2 w-full"
            defaultValue={currentAd?.workingTime || ""}
          />
          <label htmlFor="exp" className="label">
            Expérience requise
          </label>
          <select
            name="expRequired"
            className="select select-bordered w-full ml-2"
            onChange={onInputChange}
            required
            value={currentAd?.expRequired || undefined}
          >
            <option selected disabled>
              --Choisir une option--
            </option>
            <option value="jeune">Jeune diplômé</option>
            <option value="junior">Junior</option>
            <option value="confirme">Confirmé</option>
            <option value="senior">Senior</option>
          </select>

          <div className="modal-action ">
            <button className="btn btn-primary" onClick={modalAction === "Ajouter" ? handleAddAd : handleUpdateAd}>
              {modalAction}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CompanyAds;
