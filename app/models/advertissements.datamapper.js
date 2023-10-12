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

  //! Create an advertisement
  createAdvertisement: async (
    companyId,
    title,
    description,
    wages,
    place,
    workingTime,
    expRequired
  ) => {
    const newAdvertisement = await prisma.company.create({
      data: {
        advertissements: {
          create: {
            title: title,
            description: description,
            wages: wages,
            place: place,
            workingTime: workingTime,
            expRequired: expRequired,
          },
        },
      },
    });
    return newAdvertisement;
  },
};

module.exports = datamapper;
