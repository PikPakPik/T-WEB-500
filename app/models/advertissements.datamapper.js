const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  //! Show all advertissements
  getAdvertissements: async () => {
    const allAdvertissements = await prisma.advertissements.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return allAdvertissements;
  },

  //! Show one advertisement
  getOneAdvertisement: async (advertId) => {
    const oneAdvertisement = await prisma.advertissements.findUnique({
      where: {
        advertissementId: advertId,
      },
    });
    return oneAdvertisement;
  },

  //! Show all advertisements from one company
  getCompanyAdvertisements: async (companyId) => {
    const companyAdvertisements = await prisma.advertissements.findMany({
      where: {
        companyId: companyId,
      },
    });
    return companyAdvertisements;
  },
};

module.exports = datamapper;
