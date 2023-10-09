const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  // Seed users
  const users = await prisma.user.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        userPassword: "password123",
        exp: "5 years",
        school: "Example University",
        skills: "JavaScript, Python",
        isAdmin: true,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        userPassword: "securepassword",
        exp: "3 years",
        school: "Another University",
        skills: "Java, C++",
        isAdmin: false,
      },
    ],
  });

  // Seed companies
  const companies = await prisma.companies.createMany({
    data: [
      {
        name: "Tech Company A",
        userId: users[0].userId,
      },
      {
        name: "Data Company B",
        userId: users[1].userId,
      },
    ],
  });

  // Seed advertisements
  await prisma.advertissements.createMany({
    data: [
      {
        title: "Software Engineer",
        description: "Looking for a skilled software engineer",
        companyId: companies[0].companyId,
        wages: 80000,
        place: "New York",
        workingTime: "Full-time",
        expRequired: "3 years",
      },
      {
        title: "Data Analyst",
        description: "Data analyst position available",
        companyId: companies[1].companyId,
        wages: 60000,
        place: "San Francisco",
        workingTime: "Part-time",
        expRequired: "2 years",
      },
    ],
  });

  // Seed applications
  await prisma.applications.createMany({
    data: [
      {
        userId: users[0].userId,
        advertissementId: 1,
        status: "Pending",
      },
      {
        userId: users[1].userId,
        advertissementId: 2,
        status: "Submitted",
      },
    ],
  });

  // Seed application information
  await prisma.applicationinformation.createMany({
    data: [
      {
        lastName: "Doe",
        firstName: "John",
        email: "john.doe@example.com",
        exp: "5 years",
        school: "Example University",
        skills: "JavaScript, Python",
        applicationId: 1,
      },
      {
        lastName: "Smith",
        firstName: "Jane",
        email: "jane.smith@example.com",
        exp: "3 years",
        school: "Another University",
        skills: "Java, C++",
        applicationId: 2,
      },
    ],
  });

  // Seed job information
  await prisma.jobinformation.createMany({
    data: [
      {
        applicationId: 1,
        isSaved: true,
        isApplied: false,
      },
      {
        applicationId: 2,
        isSaved: false,
        isApplied: true,
      },
    ],
  });

  console.log("Seeding completed.");
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
