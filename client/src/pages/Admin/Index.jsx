import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardStats from "../../components/admin/DashboarsStats";
import { useEffect, useState } from "react";
import TableData from "../../components/admin/TableData";
import { toast } from "react-toastify";

const AdminIndex = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDatas, setUserDatas] = useState([]);
  const [applicationsDatas, setApplicationsDatas] = useState([]);
  const [companyDatas, setCompanyDatas] = useState([]);
  const [advertDatas, setAdvertDatas] = useState([]);

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
        const [dataUser, dataCandidature, dataCompany, dataAdvert] =
          await Promise.all([
            fetchData("http://localhost:3001/superman/users"),
            fetchData("http://localhost:3001/superman/applications"),
            fetchData("http://localhost:3001/superman/company"),
            fetchData("http://localhost:3001/superman/advertissements"),
          ]);
        setUserDatas(dataUser);
        setApplicationsDatas(dataCandidature);
        setCompanyDatas(dataCompany);
        setAdvertDatas(dataAdvert);
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
            type={"user"}
            handleDelete={(id) => {
              fetch(`http://localhost:3001/superman/user/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((res) => res.json())
                .then((res) => {
                  if (res.error) {
                    console.error(res.error);
                  } else {
                    setUserDatas(
                      userDatas.filter((user) => user.userId !== id)
                    );
                    toast.success("Utilisateur supprimé");
                  }
                })
                .catch((err) => console.error(err));
            }}
            handleUpdate={(id, data) => {
              fetch(`http://localhost:3001/superman/user/${id}`, {
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
                    setUserDatas(
                      userDatas.map((user) => {
                        if (user.userId === id) {
                          Object.keys(data).forEach((key) => {
                            user[key] = data[key];
                          });
                        }
                        return user;
                      })
                    );
                  }
                })
                .catch((err) => console.error(err));
            }}
          />
          <TableData
            title="Liste des entreprises"
            type={"company"}
            data={companyDatas}
            handleDelete={
              (id) => {
                fetch(`http://localhost:3001/superman/company/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.error) {
                      console.error(res.error);
                    } else {
                      setCompanyDatas(
                        companyDatas.filter((company) => company.companyId !== id)
                      );
                      toast.success("Entreprise supprimée");
                    }
                  })
                  .catch((err) => console.error(err));
              }
            }
            handleUpdate={
              (id, data) => {
                fetch(`http://localhost:3001/superman/company/${id}/update`, {
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
                      setCompanyDatas(
                        companyDatas.map((company) => {
                          if (company.companyId === id) {
                            Object.keys(data).forEach((key) => {
                              company[key] = data[key];
                            });
                          }
                          return company;
                        })
                      );
                    }
                  })
                  .catch((err) => console.error(err));
              }
            }
          />
          <TableData
            title="Liste des annonces"
            type={"advert"}
            data={advertDatas}
            handleDelete={
              (id) => {
                fetch(`http://localhost:3001/superman/advertissement/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.error) {
                      console.error(res.error);
                    } else {
                      setAdvertDatas(
                        advertDatas.filter((advert) => advert.advertId !== id)
                      );
                      toast.success("Annonce supprimée");
                    }
                  })
                  .catch((err) => console.error(err));
              }
            }
            handleUpdate={
              (id, data) => {
                fetch(`http://localhost:3001/superman/advertissement/${id}/update`, {
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
                      setAdvertDatas(
                        advertDatas.map((advert) => {
                          if (advert.advertId === id) {
                            Object.keys(data).forEach((key) => {
                              advert[key] = data[key];
                            });
                          }
                          return advert;
                        })
                      );
                    }
                  })
                  .catch((err) => console.error(err));
              }
            }
          />
        </>
      )}
    </div>
  );
};

export default AdminIndex;
