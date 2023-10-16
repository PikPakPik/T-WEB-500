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

  //! Show job Information if exist
  getJobInformation: async (advertId, userId) => {
    const jobInformation = await prisma.jobinformation.findMany({
      where: {
        advertissementId: advertId,
        userId: userId,
      },
    });
    return jobInformation;
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

  //! Get one company by userId
  getOneCompany: async (userId) => {
    const getCompagny = await prisma.companies.findMany({
      where: {
        userId: userId,
      },
    });
    return getCompagny;
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
    const newAdvertisement = await prisma.advertissements.create({
      data: {
        title: title,
        description: description,
        date: new Date(),
        company: {
          connect: {
            companyId: companyId,
          },
        },
        wages: wages,
        place: place,
        workingTime: workingTime,
        expRequired: expRequired,
      },
    });
    return newAdvertisement;
  },

  //! Create a job information
  createJobInformation: async (advertId, userId, isSaved, isApplied) => {
    const jobInformation = await prisma.jobinformation.create({
      data: {
        isSaved: isSaved,
        isApplied: isApplied,
        advertissement: {
          connect: {
            advertissementId: advertId,
          },
        },
        user: {
          connect: {
            userId: userId,
          },
        },
      },
    });
    return jobInformation;
  },

  //! Update an Job Information

  updateJobInformation: async (advertId, userId, isSaved, isApplied) => {
    const updateJobinformation = await prisma.jobinformation.update({
      where: {
        advertissementId: advertId,
        userId: userId,
      },
      data: {
        isSaved: isSaved,
        isApplied: isApplied,
      },
    });
    return updateJobinformation;
  },

  //! Get all saved advertissements from one user
  getSavedAdvert: async (userId) => {
    const savedAdvert = await prisma.jobinformation.findMany({
      where: {
        userId: userId,
        isSaved: true,
      },
    });
    return savedAdvert;
  },

  //! Get all applied advertissements from one user
  getAppliedAdvert: async (userId) => {
    const appliedAdvert = await prisma.jobinformation.findMany({
      where: {
        userId: userId,
        isApplied: true,
      },
    });
    return appliedAdvert;
  },

  //!Delete a advertisement
  //TODO: finish this delete route
  deleteAdvertisement: async (advertId) => {
    const deletedAdvertisement = await prisma.advertissements.delete({
      where: {
        advertissementId: advertId,
      },
    });
    return deletedAdvertisement;
  },
};

module.exports = datamapper;
