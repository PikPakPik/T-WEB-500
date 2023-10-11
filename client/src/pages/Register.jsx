import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    exp: "",
    school: "",
    skills: "",
    userPassword: "",
    confirmUserPassword: "",
  });

  const isFormValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
        return formData.email;
      case 3:
        return formData.exp && formData.school && formData.skills;
      case 4:
        return formData.userPassword && formData.confirmUserPassword;
      default:
        return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Inscription réussie !");
        }
      })
      .catch((err) => console.log(err));
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <label className="label"> Prénom </label>
            <input
              type="text"
              name="firstName"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              value={formData.firstName}
              required
            />
            <label className="label"> Nom </label>
            <input
              type="text"
              name="lastName"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              value={formData.lastName}
              required
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label className="label"> Email </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>
        );
      case 3:
        return (
          <div>
            <label className="label"> Expérience </label>
            <select name="exp" onChange={handleInputChange} className="select select-bordered w-full" required>
              <option defaultValue="true" disabled>--Choisir une option--</option>
              <option value="jeune">Jeune diplômé</option>
              <option value="junior">Junior</option>
              <option value="confirme">Confirmé</option>
              <option value="senior">Senior</option>
            </select>
            <label className="label"> Ecole </label>
            <input
              type="text"
              name="school"
              className="textarea h-24 textarea-bordered w-full"
              onChange={handleInputChange}
              value={formData.school}
              required
            />
            <label className="label"> Compétences </label>
            <input
              type="text"
              name="skills"
              className="textarea h-24 textarea-bordered w-full"
              onChange={handleInputChange}
              value={formData.skills}
              required
            />
          </div>
        );
      case 4:
        return (
          <div>
            <label className="label"> Mot de passe </label>
            <input
              type="password"
              name="userPassword"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              required
            />
            <label className="label"> Confirmation mot de passe </label>
            <input
              type="password"
              name="confirmUserPassword"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-base-300 rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Inscription
        </h1>
        <ul className="steps steps-vertical lg:steps-horizontal mt-4">
          <li className={currentStep >= 1 ? "step step-primary" : "step"}>
            Informations personelles
          </li>
          <li className={currentStep >= 2 ? "step step-primary" : "step"}>
            Email
          </li>
          <li className={currentStep >= 3 ? "step step-primary" : "step"}>
            Expériences
          </li>
          <li className={currentStep >= 4 ? "step step-primary" : "step"}>
            Mot de passe
          </li>
        </ul>
        <hr className="my-6" />
        <form className="space-y-4">
          {renderForm()}
          <div className="flex justify-between gap-4">
            {currentStep !== 1 && (
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Précédent
              </button>
            )}
            {currentStep !== 4 && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (isFormValid()) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    alert("Veuillez remplir tous les champs pour continuer.");
                  }
                }}
              >
                Suivant
              </button>
            )}
            {currentStep === 4 && (
              <button
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                S'inscrire
              </button>
            )}
            <Link to="/login">
              <button>Me connecter</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
