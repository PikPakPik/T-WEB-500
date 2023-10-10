import { Link } from "react-router-dom";
import ProfileDropdown from "./Profile";

const { default: ThemeChange } = require("./ThemeChange");

const Header = () => {
  return (
    <div className="flex flex-row justify-between m-5">
      <Link to="/"><h1 className="text-3xl">Salut 👋</h1></Link>
      <div className="flex flex-row gap-4">
        <ThemeChange />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
