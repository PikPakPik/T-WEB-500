import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DropdownContent = ({ user, logout }) => (
  <ul
    tabIndex={0}
    className="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-200 relative z-50"
  >
    {user ? (
      <>
        <li>
          <p>{user.firstName}</p>
        </li>
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
  const { user, logout } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://cdn-icons-png.flaticon.com/256/3237/3237447.png"
            alt="avatar"
          />
        </div>
      </label>
      <DropdownContent user={user} logout={logout} />
    </div>
  );
};

export default ProfileDropdown;
