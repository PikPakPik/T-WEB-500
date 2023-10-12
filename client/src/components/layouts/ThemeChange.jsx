import React, { useEffect, useState } from "react";

// Composant pour changer le thème
const ThemeChange = () => {
  // État local pour stocker le thème actuel
  const [theme, setTheme] = useState("dark");

  // Fonction pour basculer entre les thèmes sombre et clair
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Effet pour appliquer le thème à l'élément racine du document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    // Input pour changer le thème
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      {renderIcon(theme)}
    </label>
  );
};

// Fonction pour rendre l'icône en fonction du thème
const renderIcon = (theme) => {
  // Attributs communs aux icônes SVG
  const svgProps = {
    className: "fill-current w-10 h-10",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  };

  // Rendre l'icône spécifique au thème
  if (theme === "dark") {
    return <svg {...svgProps}><path d="..." /></svg>;
  }
  return <svg {...svgProps}><path d="..." /></svg>;
};

export default ThemeChange;
