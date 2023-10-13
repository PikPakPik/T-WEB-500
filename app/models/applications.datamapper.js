const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  //! If the user is logged, Apply to an advertissement
  applyToAdvertUserLogged: async (advertissementId, userId) => {
    const newApplication = await prisma.applications.create({
      data: {
        date: new Date(),
        status: "Active",
        user: {
          connect: {
            userId: userId,
          },
        },
        advertissements: {
          connect: {
            advertissementId: advertissementId,
          },
        },
      },
    });

    return newApplication;
  },

  //! If the user is not logged, Apply to an advertissement
  applyToAdvert: async (advertissementId) => {
    const newApplication = await prisma.applications.create({
      data: {
        date: new Date(),
        status: "Active",
        advertissements: {
          connect: {
            advertissementId: advertissementId,
          },
        },
      },
    });
    return newApplication;
  },

  //! Create application information
  createApplicationInformation: async (
    firstName,
    lastName,
    email,
    exp,
    school,
    skills,
    applicationId
  ) => {
    const newApplicationInformation =
      await prisma.applicationinformation.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          exp: exp,
          school: school,
          skills: skills,
          application: {
            connect: {
              applicationId: applicationId,
            },
          },
        },
      });

    return newApplicationInformation;
  },
};

module.exports = datamapper;
