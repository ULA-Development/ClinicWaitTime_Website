import React, { useState } from "react";
import "./MobileHeader.css";
import { ReactComponent as HamMenu } from "../../assets/icons/bars-solid.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/times-solid.svg";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedMenu = window.location.href.split("/").at(-1);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mobile-header ${isOpen ? "open" : ""}`}>
      <div className="hamburger-menu">
        <HamMenu className="menu-icon" onClick={handleToggle} />
        <a href="/home" className="home-title">
          MedFlow
        </a>
      </div>

      <div className="dropdown-menu">
        <div className="dropdown-menu-title">
          <div className="sign-buttons">
            <a href="/signup" className="sign-up-button">Sign me up</a>
            <a href="/signin" className="sign-in-button">Log me in</a>
          </div>
          <CloseIcon className="dropmenu-close-button" onClick={handleToggle} />
        </div>

        <div className="header-links">
          <a
            href="/"
            className={`dropdown-menu-item ${
              selectedMenu === "home" || selectedMenu === "" ? "selected" : ""
            }`}
          >
            Home
          </a>
          <a
            href="/contact"
            className={`dropdown-menu-item ${
              selectedMenu === "contact" ? "selected" : ""
            }`}
          >
            Contact
          </a>
          <a
            href="/signup"
            className={`dropdown-menu-item ${
              selectedMenu === "products" ? "selected" : ""
            }`}
          >
            Products
          </a>
          <a
            href="/signin"
            className={`dropdown-menu-item ${
              selectedMenu === "blog" ? "selected" : ""
            }`}
          >
            Blog
          </a>
        </div>
        <div
          style={{
            background: "grey",
            width: "87%",
            height: "1px",
            marginLeft: "14px",
          }}
        />
        <div className="footer-links">
          <a href="/about-us" className="dropdown-footer-item">
            About Us
          </a>
          <a href="/terms-of-use" className="dropdown-footer-item">
            Terms of Use
          </a>
          <a href="/terms-of-use" className="dropdown-footer-item">
            Privacy Policy
          </a>
          <a href="/terms-of-use" className="dropdown-footer-item">
            Feedback
          </a>
          <a href="/terms-of-use" className="dropdown-footer-item">
            FAQ
          </a>
        </div>
      </div>
      {/* <div style={{width: "100%", height: "100%", backgroundColor:"black", opacity:"15%", position: "absolute"}}/> */}
    </div>
  );
}

export default MobileHeader;
