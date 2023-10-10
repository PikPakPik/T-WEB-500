const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Création d'un utilisateur
  const user = await prisma.user.create({
    data: {
      firstName: "patrick",
      lastName: "dupont",
      email: "patrick@gmail.com",
      userPassword: "123456",
      isAdmin: false,
      exp: "2 years",
      school: "Harvard University",
      skills: "Business, Management",
    },
  });

  // Création d'une entreprise et de son admin et d'une offre d'emploi
  const company = await prisma.companies.create({
    data: {
      name: "Prisma",
      logo: "https://www.prisma.io/images/ogimage.png",
      user: {
        create: {
          firstName: "John",
          lastName: "Doe",
          email: "bob@gmail.com",
          userPassword: "azerty",
          isAdmin: true,
          exp: "8 years",
          school: "Epitech",
          skills: "Programming, Design, Management",
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
