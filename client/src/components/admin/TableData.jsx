import { useState } from "react";
import UpdateModal from "./modals/UpdateModal";

const ConfirmModal = ({ isOpen, data, onConfirm, onCancel }) => {
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
          <button onClick={onConfirm}>Oui</button>
          <button onClick={onCancel}>Non</button>
        </div>
      </div>
    </div>
  );
};

const TableData = ({ title, type, data, handleDelete, handleUpdate }) => {
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState(null);
  const [modalUpdateData, setModalUpdateData] = useState(null);

  const openModalDelete = (data) => {
    setModalDeleteData(data);
    setModalDeleteOpen(true);
  };

  const openModalUpdate = (data) => {
    setModalUpdateData(data);
    setModalUpdateOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  const closeUpdateModal = () => {
    setModalUpdateOpen(false);
  };

  const handleConfirmDelete = () => {
    const id =
      modalDeleteData.userId ||
      modalDeleteData.advertissementId ||
      modalDeleteData.companyId ||
      modalDeleteData.applicationId;

    handleDelete(id);
    closeDeleteModal();
  };

  const handleConfirmUpdate = (data) => {
    const id =
      modalUpdateData.userId ||
      modalUpdateData.advertissementId ||
      modalUpdateData.companyId ||
      modalUpdateData.applicationId;

    handleUpdate(id, data);
    closeUpdateModal();
  };

  if (data.length === 0)
    return <div className="text-center">Aucune donnée</div>;

  return (
    <>
      <ConfirmModal
        isOpen={isModalDeleteOpen}
        data={modalDeleteData}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
      />
      <UpdateModal
        isOpen={isModalUpdateOpen}
        data={modalUpdateData}
        onConfirm={(updatedData) => handleConfirmUpdate(updatedData)}
        type={type}
        onCancel={closeUpdateModal}
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
                      <span className="capitalize">{key}</span>
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
                        onClick={() => openModalDelete(d, handleDelete)}
                        className="hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out bg-red-100 text-red-500 px-2 py-1 rounded-md"
                      >
                        Supprimer
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          openModalUpdate(d, handleUpdate, handleDelete)
                        }
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
