import { Link } from "react-router-dom";
import ProfileDropdown from "./Profile";
import { useAuth } from "../../hooks/useAuth";

const { default: ThemeChange } = require("./ThemeChange");

const Header = () => {
  const auth = useAuth();
  return (
    <div className="flex flex-row justify-between m-5">
      <Link to="/">
        <h1 className="text-3xl">Salut {auth.user ? auth.user.firstName : ""} 👋</h1>
      </Link>
      <div className="flex flex-row gap-4">
        <ThemeChange />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
