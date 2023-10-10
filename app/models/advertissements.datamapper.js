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
};

module.exports = datamapper;
