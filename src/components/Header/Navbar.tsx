import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    setSelectedPath(getSelectedItem(pathname));
  }, []);

  const getSelectedItem = (pathname: string) => {
    const item = pathname.slice(1);
    if (item === "") {
      return "home";
    }
    return item;
  };

  return (
    <section className="navbar">
      <a
        // href="/register"
        className={`navbar-item ${
          selectedPath === "register" ? "selected" : ""
        }`}
        style={{ color: "lightgrey" }}
      >
        Register
      </a>
      <a
        style={{ color: "lightgrey" }}
        // href="/signup"
        className={`navbar-item ${selectedPath === "signup" ? "selected" : ""}`}
      >
        Sign Up
      </a>
      <a
        style={{ color: "lightgrey" }}
        // href="/signin"
        className={`navbar-item ${selectedPath === "signin" ? "selected" : ""}`}
      >
        Sign In
      </a>
      {/* <a
        href="/contact"
        className={`navbar-item ${
          selectedPath === "contact" ? "selected" : ""
        }`}
      >
        Contact
      </a> */}
      <a
        href="/"
        className={`navbar-item ${selectedPath === "home" ? "selected" : ""}`}
      >
        Home
      </a>
    </section>
  );
}

export default Navbar;
