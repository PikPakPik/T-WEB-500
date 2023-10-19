const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  //! Check if the user is a superman
  getOneSuperman: async (userId) => {
    const superman = await prisma.user.findUnique({
      where: {
        userId: userId,
        isSuperman: true,
      },
    });
    return superman;
  },

  //! Get all advertissements
  getAdvertissements: async (itemsPerPage, skip) => {
    const advertissements = await prisma.advertisements.findMany({
      take: itemsPerPage,
      skip: skip,
    });
    return advertissements;
  },

  //! Get all users
  getUsers: async (itemsPerPage, skip) => {
    const users = await prisma.user.findMany({
      take: itemsPerPage,
      skip: skip,
    });
    return users;
  },

  //! Get all applications
  getApplications: async (itemsPerPage, skip) => {
    const applications = await prisma.applications.findMany({
      take: itemsPerPage,
      skip: skip,
    });
    return applications;
  },
};

module.exports = datamapper;
