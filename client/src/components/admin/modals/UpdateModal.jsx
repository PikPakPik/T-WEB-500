import { useEffect, useState } from "react";

const UpdateModal = ({ isOpen, data, type, onConfirm, onCancel }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    if (type === "user") {
      if (!isOpen) return;
      setFormData({
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        school: data.school,
        skills: data.skills,
        newPassword: data.userPassword,
        exp: data.exp,
        isSuperman: data.isSuperman,
        isAdmin: data.isAdmin,
      });
    } else if (type === "company") {
      if (!isOpen) return;
      setFormData({
        companyId: data.companyId,
        logo: data.logo,
        name: data.name,
      });
    } else if (type === "advert") {
      if (!isOpen) return;
      setFormData({
        advertissementId: data.advertissementId,
        title: data.title,
        description: data.description,
        place: data.place,
        expRequired: data.expRequired,
        wages: data.wages,
        workingTime: data.workingTime,
      });
    }
  }, [data, isOpen, type]);

  if (type === "user") {
    if (!isOpen) return;
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-50">
        <div className="bg-slate-900 p-4 rounded-md">
          <h2>Voulez-vous vraiment modifier cet enregistrement ?</h2>

          <div className="flex flex-col form-control">
            <label className="label" htmlFor="firstName">
              Nom
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.firstName}
            />
            <label className="label" htmlFor="lastName">
              Prénom
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.lastName}
            />
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.email}
            />
            <label className="label" htmlFor="school">
              Ecole
            </label>
            <input
              type="text"
              name="school"
              id="school"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.school}
            />
            <label className="label" htmlFor="skills">
              Compétences
            </label>
            <input
              type="text"
              name="skills"
              id="skills"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.skills}
            />
            <label className="label" htmlFor="exp">
              Expérience
            </label>
            <select
              name="exp"
              className="select select-bordered w-full"
              onSelect={handleChange}
              defaultValue={data.exp || ""}
              required
            >
              <option disabled>--Choisir une option--</option>
              <option value="jeune">Jeune diplômé</option>
              <option value="junior">Junior</option>
              <option value="confirme">Confirmé</option>
              <option value="senior">Senior</option>
            </select>
            <label className="label cursor-pointer mt-2">
              <span className="label-text">Superman</span>
              <input
                type="checkbox"
                name="isSuperman"
                defaultChecked={data.isSuperman}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
            </label>
            <label className="label cursor-pointer mt-2">
              <span className="label-text">Admin</span>
              <input
                type="checkbox"
                name="isAdmin"
                defaultChecked={data.isAdmin}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>

          <div className="flex-row flex items-center justify-center gap-4 mt-2">
            <button onClick={() => onConfirm(formData)}>Modifier</button>
            <button onClick={onCancel}>Annuler</button>
          </div>
        </div>
      </div>
    );
  } else if (type === "advert") {
    if (!isOpen) return;
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-50">
        <div className="bg-slate-900 p-4 rounded-md">
          <h2>Voulez-vous vraiment modifier cet enregistrement ?</h2>

          <div className="flex flex-col form-control">
            <label className="label" htmlFor="title">
              Titre
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.title}
            />
            <label className="label" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.description}
            />
            <label className="label" htmlFor="place">
              Lieu
            </label>
            <input
              type="text"
              name="place"
              id="place"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.place}
            />
            <label className="label" htmlFor="expRequired">
              Expérience requise
            </label>
            <select
              name="expRequired"
              className="select select-bordered w-full"
              onSelect={handleChange}
              defaultValue={data.expRequired || ""}
              required
            >
              <option disabled>--Choisir une option--</option>
              <option value="jeune">Jeune diplômé</option>
              <option value="junior">Junior</option>
              <option value="confirme">Confirmé</option>
              <option value="senior">Senior</option>
            </select>
            <label className="label" htmlFor="wages">
              Salaire
            </label>
            <input
              type="number"
              name="wages"
              id="wages"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.wages}
            />
            <label className="label" htmlFor="workingTime">
              Temps de travail
            </label>
            <input
              type="text"
              name="workingTime"
              id="workingTime"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.workingTime}
            />
          </div>

          <div className="flex-row flex items-center justify-center gap-4 mt-2">
            <button onClick={() => onConfirm(formData)}>Modifier</button>
            <button onClick={onCancel}>Annuler</button>
          </div>
        </div>
      </div>
    );
  } else if (type === "company") {
    if (!isOpen) return;
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-50">
        <div className="bg-slate-900 p-4 rounded-md">
          <h2>Voulez-vous vraiment modifier cet enregistrement ?</h2>

          <div className="flex flex-col form-control">
            <label className="label" htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.name}
            />
            <label className="label" htmlFor="logo">
              Logo
            </label>
            <input
              type="text"
              name="logo"
              id="logo"
              className="input input-bordered w-full"
              onChange={handleChange}
              defaultValue={data.logo}
            />
            <div className="flex-row flex items-center justify-center gap-4 mt-2">
              <button onClick={() => onConfirm(formData)}>Modifier</button>
              <button onClick={onCancel}>Annuler</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UpdateModal;
