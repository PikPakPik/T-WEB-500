const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  //! Show one company
  getCompany: async (companyId) => {
    const oneCompany = await prisma.companies.findUnique({
      where: {
        companyId: companyId,
      },
    });
    return oneCompany;
  },

  //! Create one company
  createCompany: async (userId, name, logo) => {
    const newCompany = await prisma.companies.create({
      data: {
        name: name,
        logo: logo,
        user: {
          connect: {
            userId: userId,
          },
        },
      },
    });
    return newCompany;
  },

  //! Check if the user is an admin
  isAdmin: async (userId) => {
    const isAdmin = await prisma.user.findUnique({
      where: {
        userId: userId,
        isAdmin: true,
      },
    });
    return isAdmin;
  },

  //! Update one company
  updateCompany: async (companyId, name, logo) => {
    const updatedCompany = await prisma.companies.update({
      where: {
        companyId: companyId,
      },
      data: {
        name: name,
        logo: logo,
      },
    });
    return updatedCompany;
  },

  //! Delete a company and his association
  deleteCompany: async (companyId) => {
    // Get the advertId from the several advert of the company
    const advert = await prisma.advertissements.findMany({
      where: {
        companyId: companyId,
      },
    });

    //Boucle pour supprimer les associations de advertissementId dans les autres tables
    for (let i = 0; i < advert.length; i++) {
      const advertId = advert[i].advertissementId;

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

      //Delete the advert of the company
      const deletedAdvert = await prisma.advertissements.deleteMany({
        where: {
          companyId: companyId,
        },
      });
    }
    const deletedCompany = await prisma.companies.delete({
      where: {
        companyId: companyId,
      },
    });

    return deletedCompany;
  },
};

module.exports = datamapper;
