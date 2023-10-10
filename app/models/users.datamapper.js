const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  //! Create a new user
  createUser: async (
    firstName,
    lastName,
    email,
    userPassword,
    isAdmin,
    exp,
    school,
    skills
  ) => {
    const createdUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userPassword: userPassword,
        isAdmin: isAdmin,
        exp: exp,
        school: school,
        skills: skills,
      },
    });
    return createdUser;
  },

  //! login with JWT

  login: async (email, userPassword) => {
    const user = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
    // if (!user) {
    //   return null;
    // }
    // if (user.userPassword !== userPassword) {
    //   return null;
    // }
    return user;
  },
};

module.exports = datamapper;
