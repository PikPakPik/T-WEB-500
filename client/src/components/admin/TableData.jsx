import { useState } from "react";

const ConfirmModal = ({ isOpen, data, handleDelete, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-50">
      <div className="bg-slate-900 p-4 rounded-md">
        <h2>Voulez-vous vraiment supprimer cette ligne?</h2>
        <div className="overflow-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {Object.keys(data).map((key, k) => {
                  return (
                    <th key={k} className="px-4 py-2">
                      {key}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr key={data.id}>
                {Object.values(data).map((v, k) => {
                  return (
                    <td key={k} className="px-4 py-2">
                      {typeof v === "boolean" ? (v ? "🟢" : "🔴") : v}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex-row flex items-center justify-center gap-2">
          <button onClick={handleDelete}>Oui</button>
          <button onClick={onCancel}>Non</button>
        </div>
      </div>
    </div>
  );
};

const TableData = ({ title, data, handleDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(modalData.id);
    closeModal();
  };

  if (data.length === 0)
    return <div className="text-center">Aucune donnée</div>;

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        data={modalData}
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
      />
      <div className="mt-6 border border-slate-600 rounded-md shadow-md p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key, k) => {
                  return (
                    <th key={k} className="px-4 py-2">
                      {key}
                    </th>
                  );
                })}
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, k) => {
                return (
                  <tr key={k}>
                    {Object.values(d).map((v, k) => {
                      return (
                        <td key={k} className="px-4 py-2">
                          {typeof v === "boolean" ? (v ? "🟢" : "🔴") : v}
                        </td>
                      );
                    })}
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => openModal(d, handleDelete)}
                        className="hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out bg-red-100 text-red-500 px-2 py-1 rounded-md"
                      >
                        Supprimer
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleDelete(d.id)}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableData;
