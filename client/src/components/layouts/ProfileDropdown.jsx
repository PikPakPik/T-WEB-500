import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Ce composant affiche le contenu du menu déroulant du profil
const DropdownContent = ({ user, logout }) => (
  <ul
    tabIndex={0}
    className="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-200 relative z-50"
  >
    {/* Affiche les options en fonction de l'état de connexion de l'utilisateur */}
    {user ? (
      <>
        {/* Affiche le prénom de l'utilisateur */}
        <li>
          <p>{user.firstName}</p>
        </li>
        {user.isSuperman && (
          <li>
            <Link to="/admin" className="flex items-center gap-2">
              Panel
            </Link>
          </li>
        )}
        <li>
          <Link to="/profile" className="flex items-center gap-2">
            Mon profil
          </Link>
        </li>
        <li>
          <p className="flex items-center gap-2" onClick={logout}>
            Se déconnecter
          </p>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/login" className="flex items-center gap-2">
            Se connecter
          </Link>
        </li>
        <li>
          <Link to="/register" className="flex items-center gap-2">
            S'inscrire
          </Link>
        </li>
      </>
    )}
  </ul>
);

const ProfileDropdown = () => {
  // Utilisation du hook personnalisé useAuth pour récupérer les données utilisateur et la fonction de déconnexion
  const { user, logout } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      {/* Bouton du menu déroulant avec avatar */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://cdn-icons-png.flaticon.com/256/3237/3237447.png"
            alt="avatar"
          />
        </div>
      </label>
      {/* Affiche le contenu du menu déroulant */}
      <DropdownContent user={user} logout={logout} />
    </div>
  );
};

export default ProfileDropdown;
