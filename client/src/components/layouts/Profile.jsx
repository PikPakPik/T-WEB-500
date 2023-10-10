import React from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
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
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-200 relative z-50"
      >
        <li>
          <Link to="/login" className="flex items-center gap-2">Se connecter</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
