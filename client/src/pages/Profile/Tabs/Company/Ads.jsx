import { useState } from "react";
import { formatDateToDateTime } from "../../../../utils/formatDateToDateTime";
import { toast } from "react-toastify";

const CompanyAds = ({ user }) => {
  const [modalAction, setModalAction] = useState("Ajouter");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    wages: "",
    place: "",
    workingTime: "",
    expRequired: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        formErrors[key] = "Ce champ est obligatoire";
      }
    });

    if (isNaN(formData.wages)) {
      formErrors.wages = "Le salaire doit être un nombre";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (action, ad) => {
    setModalAction(action);
    if (ad) {
      setFormData({
        id: ad.advertissementId,
        title: ad.title,
        description: ad.description,
        wages: ad.wages,
        place: ad.place,
        workingTime: ad.workingTime,
        expRequired: ad.expRequired,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        wages: "",
        place: "",
        workingTime: "",
        expRequired: "",
      });
    }
    document.getElementById("my_modal_2").showModal();
  };
  const handleAddAd = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
          toast.success("Votre annonce a bien été ajoutée");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleUpdateAd = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`http://localhost:3001/advert/${formData.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Votre annonce a bien été modifiée");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleDeleteAd = async (id) => {
    fetch(`http://localhost:3001/advert/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Votre annonce a bien été supprimée");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
                  <button
                    className="btn btn-error"
                    onClick={() => handleDeleteAd(ad.advertissementId)}
                  >
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
            className={`input input-bordered w-content ml-2 w-full ${
              errors.title ? "input-error" : ""
            }`}
            value={formData?.title}
          />
          {errors.title && <span className="text-error">{errors.title}</span>}
          <label htmlFor="description" className="label">
            Description de l'annonce
          </label>
          <textarea
            name="description"
            onChange={onInputChange}
            className={`textarea textarea-bordered w-content ml-2 w-full ${
              errors.description ? "input-error" : ""
            }`}
            value={formData?.description}
          />
          {errors.description && (
            <span className="text-error">{errors.description}</span>
          )}
          <label htmlFor="wages" className="label">
            Salaire
          </label>
          <input
            type="text"
            name="wages"
            onChange={onInputChange}
            className={`input input-bordered w-content ml-2 w-full ${
              errors.wages ? "input-error" : ""
            }`}
            value={formData?.wages}
          />
          {errors.wages && <span className="text-error">{errors.wages}</span>}
          <label htmlFor="place" className="label">
            Lieu
          </label>
          <input
            type="text"
            name="place"
            onChange={onInputChange}
            className={`input input-bordered w-content ml-2 w-full ${
              errors.place ? "input-error" : ""
            }`}
            value={formData?.place}
          />
          {errors.place && <span className="text-error">{errors.place}</span>}
          <label htmlFor="workingTime" className="label">
            Temps de travail
          </label>
          <input
            type="text"
            name="workingTime"
            onChange={onInputChange}
            className={`input input-bordered w-content ml-2 w-full ${
              errors.workingTime ? "input-error" : ""
            }`}
            value={formData?.workingTime}
          />
          {errors.workingTime && (
            <span className="text-error">{errors.workingTime}</span>
          )}
          <label htmlFor="exp" className="label">
            Expérience requise
          </label>
          <select
            name="expRequired"
            className={`select select-bordered w-content ml-2 w-full ${
              errors.expRequired ? "input-error" : ""
            }`}
            onChange={onInputChange}
            required
            value={formData?.expRequired}
          >
            <option selected disabled>
              --Choisir une option--
            </option>
            <option value="jeune">Jeune diplômé</option>
            <option value="junior">Junior</option>
            <option value="confirme">Confirmé</option>
            <option value="senior">Senior</option>
          </select>
          {errors.expRequired && (
            <span className="text-error">{errors.expRequired}</span>
          )}

          <div className="modal-action ">
            <button
              className="btn btn-primary"
              onClick={modalAction === "Ajouter" ? handleAddAd : handleUpdateAd}
            >
              {modalAction}
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_2").close()}
            >
              Annuler
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CompanyAds;
