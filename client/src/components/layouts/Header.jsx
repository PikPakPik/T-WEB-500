import ProfileDropdown from "./Profile";

const { default: ThemeChange } = require("./ThemeChange");

const Header = () => {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-3xl">Salut Alexandre 👋</h1>
      <div className="flex flex-row gap-4">
        <ThemeChange />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
