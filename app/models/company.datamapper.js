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

  //! Delete a advertissement from a company
  deleteAdvertFromCompany: async (companyId) => {
    const deletedAdvert = await prisma.advertissements.delete({
      where: {
        companyId: companyId,
      },
    });
    return deletedAdvert;
  },

  //! Delete a company
  deleteCompany: async (companyId) => {
    const deletedCompany = await prisma.companies.delete({
      where: {
        companyId: companyId,
      },
    });
  },
};

module.exports = datamapper;
