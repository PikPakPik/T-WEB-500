import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CompanyTab from "./Tabs/CompanyTab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const renderOverview = (user) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-3">
      <h1 className="text-3xl">{`${user?.firstName} ${user?.lastName}`}</h1>
      <div className="flex flex-col">
        {["email", "exp", "school", "skills"].map((field) => (
          <div key={field} className="my-2">
            <strong>{`${field.charAt(0).toUpperCase()}${field.slice(
              1
            )}:`}</strong>{" "}
            {user[field]}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const renderSettings = (user, handleFormSubmit) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-3">
      <h1 className="text-3xl">Settings</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <div className="my-2">
            <label htmlFor="firstName">Prénom</label>
            <input
              name="firstName"
              type="text"
              defaultValue={user.firstName}
              className="input input-bordered ml-2"
            />
          </div>
          <div className="my-2">
            <label htmlFor="lastName">Nom</label>
            <input
              name="lastName"
              type="text"
              defaultValue={user.lastName}
              className="input input-bordered ml-2"
            />
          </div>
          <div className="my-2">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              defaultValue={user.email}
              className="input input-bordered w-content w-1/3 ml-2"
            />
          </div>
          <div className="my-2">
            <label htmlFor="school">Ecole</label>
            <input
              name="school"
              type="text"
              defaultValue={user.school}
              className="input input-bordered w-content ml-2"
            />
          </div>
          <div className="my-2">
            <label htmlFor="skills">Compétences</label>
            <input
              name="skills"
              type="text"
              defaultValue={user.skills}
              className="input input-bordered w-content ml-2"
            />
          </div>
          <div className="my-2">
            <label htmlFor="exp">Expérience</label>
            <select
              name="exp"
              className="select select-bordered w-content ml-2"
              defaultValue={user.exp.toLowerCase() || ""}
              required
            >
              <option disabled>--Choisir une option--</option>
              <option value="jeune">Jeune diplômé</option>
              <option value="junior">Junior</option>
              <option value="confirme">Confirmé</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Sauvegarder
        </button>
      </form>
    </div>
  </div>
);

const renderPassword = (handleFormSubmitPassword) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-3">
      <h1 className="text-3xl">Changer de mot de passe</h1>
      <form onSubmit={handleFormSubmitPassword}>
        <div className="flex flex-col">
          <div className="my-2">
            <label htmlFor="oldPassword">Nouveau mot de passe</label>
            <input
              name="newPassword"
              type="password"
              defaultValue={""}
              className="input input-bordered ml-2"
            />
          </div>
          <div className="my-2">
            <label htmlFor="oldPassword">Confirmer le mot de passe</label>
            <input
              name="confirmPassword"
              type="password"
              defaultValue={""}
              className="input input-bordered ml-2"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Sauvegarder
        </button>
      </form>
    </div>
  </div>
);


const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { setUser, user, isLoading, isError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const renderCompany = () => <CompanyTab user={user} />;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    fetch(`http://localhost:3001/user/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.error(res.error);
        } else {
          setUser(res);
          toast.success("Profil modifié");
          navigate("/profile");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleFormSubmitPassword = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    fetch(`http://localhost:3001/user/password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.error(res.error);
        } else {
          toast.success("Mot de passe modifié");
          navigate("/profile");
        }
      })
      .catch((err) => console.error(err));
  }

  const tabRenderers = {
    overview: renderOverview,
    settings: (user) => renderSettings(user, handleFormSubmit),
    password: () => renderPassword(handleFormSubmitPassword),
    company: renderCompany,
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError || !user) {
      return <p>Error loading user information.</p>;
    }

    return tabRenderers[activeTab]?.(user) || <p>No tab selected.</p>;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addCompany = () => {
    if (!formData.name || !formData.logo) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // check if the logo is a real image url
    const img = new Image();
    img.src = formData.logo;
    img.onload = () => {
      setError("");
    };
    img.onerror = () => {
      setError("L'url du logo n'est pas valide");
      return;
    };

    fetch("http://localhost:3001/company", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          toast.success("Entreprise ajoutée");
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b">
        {Object.keys(tabRenderers).map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="p-4">{renderTabContent()}</div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ajouter mon entreprise</h3>
          <p className="py-4">
            <label htmlFor="name" className="label">
              Nom de l'entreprise
            </label>
            <input
              name="name"
              type="text"
              onChange={handleInputChange}
              className="input input-bordered w-content ml-2 w-full"
            />
            <label htmlFor="logo" className="label">
              Logo de l'entreprise (URL)
            </label>
            <input
              name="logo"
              type="text"
              onChange={handleInputChange}
              className="input input-bordered w-content ml-2 w-full"
            />
            <span className="text-red-500">{error}</span>
          </p>
          <div className="modal-action ">
            <button className="btn btn-primary" onClick={addCompany}>
              Ajouter
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Annuler</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
