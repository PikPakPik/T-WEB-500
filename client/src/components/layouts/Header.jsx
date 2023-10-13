import React from 'react';
import { Link } from 'react-router-dom';
import ThemeChange from './ThemeChange';
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  // Utilisation du hook personnalisé useAuth pour obtenir les données de l'utilisateur connecté
  const { user } = useAuth();

  // Fonction pour afficher le prénom de l'utilisateur s'il est connecté
  const renderUserName = () => user ? user.firstName : '';

  return (
    <div className="flex justify-between m-5">
      {/* Le lien vers la page d'accueil avec un message de bienvenue personnalisé */}
      <Link to="/">
        <h1 className="text-3xl">
          Salut {renderUserName()} 👋
        </h1>
      </Link>
      <div className="flex gap-4">
        {/* Composant pour changer le thème */}
        <ThemeChange />
        {/* Composant pour le menu déroulant du profil utilisateur */}
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
