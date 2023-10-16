const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const datamapper = {
  //! Create a new user
  createUser: async (
    firstName,
    lastName,
    email,
    hashedPassword,
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
        userPassword: hashedPassword,
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
        // userPassword: userPassword,
      },
    });
    return user;
  },

  getUserCompany: async (userId) => {
    const company = await prisma.companies.findUnique({
      where: {
        userId: userId,
      },
    });
    return company;
  },

  //! Get one user
  getOneUser: async (userId) => {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    return user;
  },

  //! Update one user
  updateUser: async (
    userId,
    firstName,
    lastName,
    email,
    hashedPassword,
    exp,
    school,
    skills
  ) => {
    const updatedUser = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userPassword: hashedPassword,
        exp: exp,
        school: school,
        skills: skills,
      },
    });
    return updatedUser;
  },
};

module.exports = datamapper;
