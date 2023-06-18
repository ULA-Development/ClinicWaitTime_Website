import React, { useState, useEffect } from "react";
import "./Navbar.css";

interface NavbarProps {
  selectedItem: string | null;
}

function Navbar({ selectedItem }: NavbarProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    setSelectedPath(getSelectedItem(pathname));
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedPath(item);
  };

  const getSelectedItem = (pathname: string) => {
    const item = pathname.slice(1); // Remove the leading "/"
    if (item === "") {
      return "home";
    }
    return item;
  };

  return (
    <section className="navbar">
      <a
        href="/signup"
        className={`navbar-item ${
          selectedPath === "signup" || selectedPath === "register"
            ? "selected"
            : ""
        }`}
        onClick={() => handleItemClick("signup")}
      >
        Sign Up
      </a>
      <a
        href="/signin"
        className={`navbar-item ${selectedPath === "signin" ? "selected" : ""}`}
        onClick={() => handleItemClick("login")}
      >
        Sign In
      </a>
      <a
        href="/contact"
        className={`navbar-item ${
          selectedPath === "contact" ? "selected" : ""
        }`}
        onClick={() => handleItemClick("contact")}
      >
        Contact
      </a>
      <a
        href="/"
        className={`navbar-item ${selectedPath === "home" ? "selected" : ""}`}
        onClick={() => handleItemClick("home")}
      >
        Home
      </a>
    </section>
  );
}

export default Navbar;
