import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [previousSelectedItem, setPreviousSelectedItem] = useState<
    string | null
  >(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    setSelectedItem(getSelectedItem(pathname));
  }, []);

  useEffect(() => {
    setPreviousSelectedItem(selectedItem);
  }, [selectedItem]);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
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
          selectedItem === "signup" ? "selected" : ""
        } ${previousSelectedItem === "signup" ? "prev-selected" : ""}`}
        onClick={() => handleItemClick("signup")}
      >
        Sign Up
      </a>
      <a
        href="/login"
        className={`navbar-item ${selectedItem === "login" ? "selected" : ""} ${
          previousSelectedItem === "login" ? "prev-selected" : ""
        }`}
        onClick={() => handleItemClick("login")}
      >
        Log In
      </a>
      <a
        href="/contact"
        className={`navbar-item ${
          selectedItem === "contact" ? "selected" : ""
        } ${previousSelectedItem === "contact" ? "prev-selected" : ""}`}
        onClick={() => handleItemClick("contact")}
      >
        Contact Us
      </a>
      <a
        href="/home"
        className={`navbar-item ${selectedItem === "home" ? "selected" : ""} ${
          previousSelectedItem === "home" ? "prev-selected" : ""
        }`}
        onClick={() => handleItemClick("home")}
      >
        Home
      </a>
    </section>
  );
}

export default Navbar;
