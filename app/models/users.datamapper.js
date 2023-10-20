const { PrismaClient, Prisma } = require("@prisma/client");
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

  //! Get the company of the user
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
        exp: exp,
        school: school,
        skills: skills,
      },
    });
    return updatedUser;
  },

  //! Update the password of the current user
  updatePassword: async (userId, hashedPassword) => {
    const updatedPassword = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        userPassword: hashedPassword,
      },
    });
    return updatedPassword;
  },

  //! Delete one user
  deletedUser: async (userId) => {
    const deleteUser = await Prisma.user.delete({
      where: {
        userId: userId,
      },
    });
    return deleteUser;
  },

  //! Get the applied advert of the user
  getApplicationsByUserId: async (userId) => {
    const applications = await prisma.applications.findMany({
      where: {
        userId: userId,
      },
    });
    return applications;
  },
};

module.exports = datamapper;
