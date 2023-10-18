const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Création d'un utilisateur
  const user = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "johndeo@exemple.com",
      userPassword: "$2b$10$7iuW81raBtrERJueRogHV.VRmyamXCBZqPujfNrLjOotXERGBbi1y",
      isAdmin: true,
      isSuperman: true,
      exp: "Junior",
      school: "Harvard University",
      skills: "Business, Management",
    },
  });
  const user1 = await prisma.user.create({
    data: {
      firstName: "Marie",
      lastName: "Doe",
      email: "mariedeo@exemple.com",
      userPassword: "$2b$10$7iuW81raBtrERJueRogHV.VRmyamXCBZqPujfNrLjOotXERGBbi1y",
      isAdmin: false,
      exp: "Early Career",
      school: "Harvard University",
      skills: "Business, Management",
    },
  });

  // Création d'une entreprise et de son admin et d'une offre d'emploi
  const company = await prisma.companies.create({
    data: {
      name: "Prisma",
      logo: "testting",
      user: {
        connect: {
          userId: user.userId,
        },
      },
      advertissements: {
        create: {
          title: "UX Internship",
          description: "loremp ipsum dolor sit amet",
          date: new Date(),
          wages: 40000,
          place: "France",
          workingTime: "Full-time",
          expRequired: "Junior",
        },
      },
    },
    include: {
      user: true,
      advertissements: true,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
