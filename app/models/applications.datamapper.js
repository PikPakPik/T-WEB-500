const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  //! Check if the user already apply to the advertissement
  checkIfUserAlreadyApply: async (advertissementId, userId) => {
    const application = await prisma.applications.findFirst({
      where: {
        advertissementId: advertissementId,
        userId: userId,
      },
    });

    return application;
  },

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

  //! Get the job information
  getJobInformation: async (advertissementId, userId) => {
    const jobInformation = await prisma.jobinformation.findFirst({
      where: {
        advertissementId: advertissementId,
        userId: userId,
      },
    });

    return jobInformation;
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

  //! Update the job information
  updateJobInformation: async (applicationId, userId) => {
    const updatedJobInformation = await prisma.jobinformation.update({
      where: {
        applicationId_userId: {
          applicationId: applicationId,
          userId: userId,
        },
      },
      data: {
        isApplied: true,
      },
    });

    return updatedJobInformation;
  },

  //! Create the job information
  createJobInformation: async (advertissementId, userId) => {
    const newJobInformation = await prisma.jobinformation.create({
      data: {
        isApplied: true,
        advertissement: {
          connect: {
            advertissementId: advertissementId,
          },
        },
        user: {
          connect: {
            userId: userId,
          },
        },
      },
    });

    return newJobInformation;
  },
};

module.exports = datamapper;
