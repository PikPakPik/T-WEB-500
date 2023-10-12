import React, { useEffect, useState } from "react";

const ThemeChange = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      {renderIcon(theme)}
    </label>
  );
};

const renderIcon = (theme) => {
  const svgProps = {
    className: "fill-current w-10 h-10",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  };

  if (theme === "dark") {
    return <svg {...svgProps}><path d="..." /></svg>;
  }
  return <svg {...svgProps}><path d="..." /></svg>;
};

export default ThemeChange;
