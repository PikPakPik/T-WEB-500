import { toast } from "react-toastify";

const InputField = ({ name, label, defaultValue }) => (
  <div className="my-2">
    <label htmlFor={name} className="label">
      {label}
    </label>
    <input
      name={name}
      type="text"
      defaultValue={defaultValue}
      className="input input-bordered ml-2 w-full"
    />
  </div>
);

const CompanySettings = ({ company }) => {
  const handleUpdate = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/company/${company.companyId}`, {
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
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/company/${company.companyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Votre entreprise a bien été supprimée");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1 className="text-3xl">Settings</h1>
      <form action="">
        <InputField
          name="name"
          label="Nom de l'entreprise"
          defaultValue={company.name}
        />
        <InputField
          name="logo"
          label="Logo de l'entreprise"
          defaultValue={company.logo}
        />
        <div className="my-2">
          <button
            name="submit"
            className="btn btn-primary ml-2"
            onClick={handleUpdate}
          >
            Modifier
          </button>
          <button
            name="delete"
            className="btn btn-error ml-2"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanySettings;
