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
        advertissementId_userId: {
          advertissementId: advertId, // la variable que vous avez passée en argument
          userId: userId, // la variable que vous avez passée en argument
        },
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

  //! Update an advertisement
  updateAdvertisement: async (
    advertId,
    title,
    description,
    wages,
    place,
    workingTime,
    expRequired
  ) => {
    const updateAdvertisement = await prisma.advertissements.update({
      where: {
        advertissementId: advertId,
      },
      data: {
        title: title,
        description: description,
        wages: wages,
        place: place,
        workingTime: workingTime,
        expRequired: expRequired,
      },
    });
    return updateAdvertisement;
  },

  //! Check if user isAdmin
  isAdmin: async (userId) => {
    const isAdmin = await prisma.user.findUnique({
      where: {
        userId: userId,
        isAdmin: true,
      },
    });
    return isAdmin;
  },

  //! Get one company by advertId
  getCompanyByAdvertId: async (advertId) => {
    const company = await prisma.advertissements.findUnique({
      where: {
        advertissementId: advertId,
      },
      select: {
        company: true,
      },
    });
    return company.company;
  },

  //!Delete a advertisement
  deleteAdvertisement: async (advertId) => {
    //Get the applicationId from the several application of the advert
    const application = await prisma.applications.findMany({
      where: {
        advertissementId: advertId,
      },
    });

    // Boucle pour supprimer les associations de applicationId dans applicationInformation
    for (let j = 0; j < application.length; j++) {
      const applicationId = application[j].applicationId;

      //Delete the applicationInformation of the application
      const deleteApplicationInformation =
        await prisma.applicationinformation.deleteMany({
          where: {
            applicationId: applicationId,
          },
        });
    }
    //Delete the application of the advert
    const deleteApplication = await prisma.applications.deleteMany({
      where: {
        advertissementId: advertId,
      },
    });

    //Delete the Job Information of the advert
    const deletedJobInformation = await prisma.jobinformation.deleteMany({
      where: {
        advertissementId: advertId,
      },
    });

    // Finally, delete the advert
    const deletedAdvertisement = await prisma.advertissements.delete({
      where: {
        advertissementId: advertId,
      },
    });
    return deletedAdvertisement;
  },

  //! Search an advertissement by his name
  searchAdvert: async (advertName) => {
    const searchAdvert = await prisma.advertissements.findMany({
      where: {
        title: {
          contains: advertName,
        },
      },
    });
    return searchAdvert;
  },
};

module.exports = datamapper;
