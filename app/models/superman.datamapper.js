const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  getOneSuperman: async (userId) => {
    const superman = await prisma.user.findUnique({
      where: {
        userId: userId,
        isSuperman: true,
      },
    });
    return superman;
  },
};

module.exports = datamapper;
