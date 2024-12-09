// src/components/ThemeToggleButton.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "react-bootstrap";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  // console.log(theme);

  return (
    <Button variant={theme} onClick={toggleTheme}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};

export default ThemeToggleButton;
