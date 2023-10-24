# Job Board

Le Job Board est une plateforme en ligne conçue pour aider les chercheurs d'emploi à trouver des opportunités professionnelles correspondant à leurs compétences et à leurs intérêts, tout en offrant aux employeurs un moyen efficace de recruter des talents qualifiés. Cette application web conviviale permet aux utilisateurs de parcourir les offres d'emploi, de postuler à des postes vacants et aux employeurs de publier des offres d'emploi.

## Fonctionnalités

- **Recherche d'emplois**: Les chercheurs d'emploi peuvent rechercher des postes vacants en utilisant des filtres tels que le titre du poste, la localisation, le salaire et le type de contrat.
- **Postulation en ligne**: Les utilisateurs peuvent postuler à des offres d'emploi directement sur la plateforme en renseignant leurs informations.
- **Espace Employeur**: Les employeurs peuvent créer un compte et publier des offres d'emploi.

## Installation

1. **Clonage du référentiel**:
```bash
git clone git@github.com:EpitechMscProPromo2026/T-WEB-501-NAN_2.git
```

2. **Installation des dépendances**:
```bash
cd T-WEB-501-NAN_2
npm install
cd client
npm install
```

3. **Configuration de la base de données**:
```bash
cd ..
cd server
touch .env
```
Copiez le contenu du fichier `.env.example` dans le fichier `.env` et remplacez les valeurs par défaut par les vôtres.

4. **Démarrage du serveur**:
```bash
cd ..
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Technologies Utilisées

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Base de données**: Prisma ORM
- **Gestion des dépendances**: npm
- **Authentification**: JSON Web Tokens (JWT)
- **Autres Outils**: Git, GitHub

La documentation complète des endpoints de l'API est disponible [ici](http://localhost:3001/api-docs/).

## Contributeurs

- [Alexandre Tressel](https://github.com/PikPakPik)
- [Léo Verger](https://github.com/BeoLeo2)