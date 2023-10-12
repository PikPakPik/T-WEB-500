import React from 'react';
import { Link } from 'react-router-dom';
import ThemeChange from './ThemeChange';
import ProfileDropdown from './Profile';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user } = useAuth();

  const renderUserName = () => user ? user.firstName : '';

  return (
    <div className="flex justify-between m-5">
      <Link to="/">
        <h1 className="text-3xl">
          Salut {renderUserName()} 👋
        </h1>
      </Link>
      <div className="flex gap-4">
        <ThemeChange />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
