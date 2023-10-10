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
};

module.exports = datamapper;
