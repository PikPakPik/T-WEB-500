import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isValidEmail } from "../utils/validateEmail";

const Step1 = ({ formData, handleInputChange }) => (
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

const Step2 = ({ formData, handleInputChange }) => (
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

const Step3 = ({ formData, handleInputChange }) => (
  <div>
    <label className="label"> Expérience </label>
    <select
      name="exp"
      onChange={handleInputChange}
      className="select select-bordered w-full"
      required
    >
      <option selected disabled>
        --Choisir une option--
      </option>
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

const Step4 = ({ formData, handleInputChange }) => (
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

const stepsComponents = [Step1, Step2, Step3, Step4];

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
  const [error, setError] = useState("");

  const isFormValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
        return formData.email && isValidEmail(formData.email);
      case 3:
        return formData.exp && formData.school && formData.skills;
      case 4:
        return (
          formData.userPassword &&
          formData.confirmUserPassword &&
          formData.userPassword === formData.confirmUserPassword
        );
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 409) {
            setError("Cet email est déjà utilisé");
          }
        }
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          toast.success("Votre compte a bien été créé");
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CurrentStepComponent = stepsComponents[currentStep - 1];

  return (
    <div className="relative flex flex-col justify-center mt-24 overflow-hidden">
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
          <CurrentStepComponent
            formData={formData}
            handleInputChange={handleInputChange}
          />
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-between gap-4">
            {currentStep !== 1 && (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentStep(currentStep - 1);
                }}
              >
                Précédent
              </button>
            )}
            {currentStep !== 4 && (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (isFormValid()) {
                    setCurrentStep(currentStep + 1);
                    setError("");
                  } else {
                    setError("Veuillez remplir tous les champs correctement");
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
