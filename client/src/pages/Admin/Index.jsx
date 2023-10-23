import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardStats from "../../components/admin/DashboarsStats";
import { useEffect, useState } from "react";
import TableData from "../../components/admin/TableData";

const AdminIndex = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDatas, setUserDatas] = useState([]);
  const [applicationsDatas, setApplicationsDatas] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await fetch(url, { headers });
      if (!response.ok) {
        console.error("Failed to fetch data:", response);
        throw new Error(`Failed to fetch ${url}`);
      }
      return response.json();
    };

    const getStats = async () => {
      try {
        const [dataUser, dataCandidature, dataAdvert, dataCompany] =
          await Promise.all([
            fetchData("http://localhost:3001/superman/users"),
            fetchData("http://localhost:3001/superman/applications"),
          ]);
        console.log(dataCandidature);
        setUserDatas(dataUser);
        setApplicationsDatas(dataCandidature);
        setStats([
          {
            title: "Utilisateurs",
            value: dataUser?.length,
            icon: <Icon icon="fa:users" className="text-4xl" />,
          },
          {
            title: "Entreprises",
            value: dataCompany?.length,
            icon: <Icon icon="mdi:company" className="text-4xl" />,
          },
          {
            title: "Annonces",
            value: dataAdvert?.length,
            icon: <Icon icon="iconamoon:search-duotone" className="text-4xl" />,
          },
          {
            title: "Candidatures",
            value: dataCandidature?.length,
            icon: <Icon icon="map:post-box" className="text-4xl" />,
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getStats();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {stats.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Icon icon="akar-icons:loading" className="text-4xl animate-spin" />
        </div>
      ) : (
        <>
          <TableData
            title="Liste des utilisateurs"
            data={userDatas}
            handleDelete={() => {}}
          />
          <TableData
            title="Liste des candidatures"
            data={applicationsDatas}
            handleDelete={() => {}}
          />
        </>
      )}
    </div>
  );
};

export default AdminIndex;
