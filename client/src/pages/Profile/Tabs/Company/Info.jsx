const CompanyInfo = ({ company }) =>
  !company ? <NoCompanyInfo /> : <ActualCompanyInfo company={company} />;

export const NoCompanyInfo = () => (
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

export const ActualCompanyInfo = ({ company }) => (
  <div className="flex justify-center items-center">
    <div className="max-w-md w-full bg-base-200 shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-blue-600">
        <div className="flex">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={company.logo}
            alt={company.name}
          />
          <div className="mx-3">
            <h2 className="text-white font-semibold">{company.name}</h2>
            <span className="text-blue-300">
              {company.advertissements.length} annonces publiées
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyInfo;