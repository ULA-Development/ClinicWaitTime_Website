import React, { useState } from "react";
import "./MobileHeader.css";
import umbrellaIcon from "../../assets/icons/umbrella-solid.svg";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mobile-header ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <div className="hamburger-menu" onClick={handleToggle}>
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div className="dropdown-menu">
        <div className="dropdown-menu-close">
          <span onClick={handleToggle}>X</span>
        </div>

        <div className="header-links">
          <a href="/signup" className="dropdown-menu-item">
            Sign Up
          </a>
          <a href="/signin" className="dropdown-menu-item">
            Sign In
          </a>
          <a href="/contact" className="dropdown-menu-item">
            Contact
          </a>
          <a href="/" className="dropdown-menu-item">
            Home
          </a>
        </div>

        <div className="footer-links">
          <a href="/about-us" className="dropdown-footer-item">
            About Us
          </a>
          <a href="/terms-of-use" className="dropdown-footer-item">
            Terms of Use
          </a>
        </div>

        <img className="umbrella-logo" src={umbrellaIcon} />
      </div>
    </div>
  );
}

export default MobileHeader;
