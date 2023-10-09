import Profile from "./Profile";

const { default: ThemeChange } = require("./ThemeChange");

const Header = () => {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-3xl">Hello 👋</h1>
      <div className="flex flex-row gap-4">
        <ThemeChange />
        <Profile />
      </div>
    </div>
  );
};

export default Header;
