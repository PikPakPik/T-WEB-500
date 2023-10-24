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
      logo: "https://w7.pngwing.com/pngs/130/82/png-transparent-prisma-hd-logo.png",
      user: {
        connect: {
          userId: user.userId,
        },
      },
      advertissements: {
        create: {
          title: "UX Internship",
          description: `Prisma est à la recherche d'un(e) stagiaire en UX pour rejoindre notre équipe dynamique. En tant que stagiaire en UX, vous travaillerez en étroite collaboration avec notre équipe de conception pour aider à créer des expériences utilisateur exceptionnelles pour nos produits. Vous aurez l'opportunité de travailler sur des projets passionnants et de contribuer à la croissance de notre entreprise.

          Responsabilités :
          
          Travailler en étroite collaboration avec l'équipe de conception pour créer des expériences utilisateur exceptionnelles pour nos produits
          Participer à la recherche utilisateur pour comprendre les besoins et les comportements des utilisateurs
          Créer des wireframes, des prototypes et des maquettes pour les projets en cours
          Collaborer avec les développeurs pour assurer une mise en œuvre efficace des conceptions
          Participer à des tests utilisateurs pour évaluer l'efficacité des conceptions
          Exigences :
          
          Étudiant(e) en design d'interaction, design graphique, psychologie ou domaine connexe
          Connaissance de Sketch, Figma ou d'autres outils de conception
          Compréhension des principes de conception UX/UI
          Capacité à travailler en équipe et à communiquer efficacement
          Passion pour la création de produits exceptionnels qui améliorent la vie des utilisateurs
          Si vous êtes passionné(e) par la conception UX et que vous cherchez à acquérir une expérience pratique dans une entreprise en pleine croissance, nous aimerions vous entendre. Postulez dès maintenant pour rejoindre notre équipe !`,
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
  const company2 = await prisma.companies.create({
    data: {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png",
      user: {
        connect: {
          userId: user1.userId,
        },
      },
      advertissements: {
        create: {
          title: "Developper FullStack",
          description: "Nous recherchons un développeur Fullstack passionné pour rejoindre notre équipe chez Google. Vous travaillerez sur des projets passionnants et innovants, en utilisant les dernières technologies et outils. Vous devrez avoir une solide expérience en développement web, en particulier avec Angular, ainsi qu'une connaissance approfondie des bases de données et des API. Vous devrez également être capable de travailler en équipe et de communiquer efficacement avec les autres membres de l'équipe. Si vous êtes prêt à relever ce défi passionnant, postulez dès maintenant pour rejoindre notre équipe chez Google !",
          date: new Date(),
          wages: 80000,
          place: "France",
          workingTime: "Part-time",
          expRequired: "Senior",
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
