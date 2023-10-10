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
};

module.exports = datamapper;
