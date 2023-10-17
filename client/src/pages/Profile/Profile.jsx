import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const renderOverview = (user) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-3">
      <h1 className="text-3xl">{`${user?.firstName} ${user?.lastName}`}</h1>
      <div className="flex flex-col">
        {["email", "exp", "school", "skills"].map((field) => (
          <div key={field} className="my-2">
            <strong>{`${field.charAt(0).toUpperCase()}${field.slice(
              1,
            )}:`}</strong>{" "}
            {user[field]}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const renderSettings = (user) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="col-span-3">
      <h1 className="text-3xl">Settings</h1>
      <form action="">
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
        </div>
      </form>
    </div>
  </div>
);

const renderPassword = () => <p>This is the password tab.</p>;

const renderCompanyInfo = (user) =>
  user.company ? (
    <div className="flex justify-center items-center">
      <div className="max-w-md w-full bg-base-200 shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-blue-600">
          <div className="flex">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={user.company.logo}
              alt={user.company.name}
            />
            <div className="mx-3">
              <h2 className="text-white font-semibold">{user.company.name}</h2>
              <span className="text-blue-300">
                {user.company.advertissements.length} annonces publiées
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <span className="text-red-500">Aucune information disponible</span>
      <button
        className="btn btn-success"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        {" "}
        Ajouter mon entreprise
      </button>
    </div>
  );

const renderCompanyAds = (user) => (
    <div>
        <h1 className="text-3xl">Mes annonces</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
          </thead>
          <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
);
const renderCompanySettings = (user) => (
  <div>
    <h1 className="text-3xl">Settings</h1>
    <form action="">
      <div className="flex flex-col">
        <div className="my-2">
          <label htmlFor="name" className="label">
            Nom de l'entreprise
          </label>
          <input
            name="name"
            type="text"
            defaultValue={user.company.name}
            className="input input-bordered ml-2"
          />
        </div>
        <div className="my-2">
          <label htmlFor="logo" className="label">
            Logo de l'entreprise
          </label>
          <input
            name="logo"
            type="text"
            defaultValue={user.company.logo}
            className="input input-bordered ml-2 w-1/2"
          />
        </div>
        <div className="my-2">
          <button
            name="submit"
            className="btn btn-primary ml-2"
            onClick={() => {
              fetch(`http://localhost:3001/company/${user.company.companyId}`, {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: document.getElementsByName("name")[0].value,
                  logo: document.getElementsByName("logo")[0].value,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  window.location.reload();
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            Modifier
          </button>
          <button
            name="delete"
            className="btn btn-error ml-2"
            onClick={() => {
              fetch(`http://localhost:3001/company/${user.company.id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  window.location.reload();
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </form>
  </div>
);


const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, isLoading, isError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
  });
  const [error, setError] = useState("");
  const [activeCompanyTab, setActiveCompanyTab] = useState("info");

  const companyTabRenderers = {
    info: renderCompanyInfo,
  };

  if (user?.company) {
    companyTabRenderers.settings = renderCompanySettings;
    companyTabRenderers.ads = renderCompanyAds;
  }

  const renderCompany = (user) => {
    const renderCompanyTabContent = () => {
      return (
        companyTabRenderers[activeCompanyTab]?.(user) || (
          <p>Pas d'onglet sélectionné.</p>
        )
      );
    };

    return (
      <>
        <div className="flex border-b">
          {Object.keys(companyTabRenderers).map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                activeCompanyTab === tab ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveCompanyTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-4">{renderCompanyTabContent()}</div>
      </>
    );
  };

  const tabRenderers = {
    overview: renderOverview,
    settings: renderSettings,
    password: renderPassword,
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
        window.location.reload();
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
