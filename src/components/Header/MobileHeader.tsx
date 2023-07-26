import React, { useState } from "react";
import "./MobileHeader.css";
import { ReactComponent as HamMenu } from "../../assets/icons/bars-solid.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/times-solid.svg";
import { ReactComponent as BGC } from "../../assets/download.svg";

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
        <div
          className="dropdown-menu-title"
          style={{ position: "relative", overflow: "hidden" }}
        >
          
          <BGC
            style={{
              position: "absolute",
              width: "350px",
              height: "350px",
              top: "-160px",
              left: "-70px",
              fill: "#00655a",
              opacity: "100%"
            }}
          />
          {/* <div className="sign-buttons">
            <a href="/signup" className="sign-up-button">Sign me up</a>
            <a href="/signin" className="sign-in-button">Log me in</a>
          </div> */}
          <CloseIcon className="dropmenu-close-button" style={{position: "absolute"}} onClick={handleToggle} />
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
            // href="/signup"
            className={`dropmenu-item-disabled ${
              selectedMenu === "products" ? "selected" : ""
            }`}
          >
            Products
          </a>
          <a
            // href="/signin"
            className={`dropmenu-item-disabled  ${
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
          <a href="/terms-of-use" className="dropdown-footer-item">
            Terms of Use
          </a>
          <a href="/feedback" className="dropdown-footer-item">
            Feedback
          </a>
          <a
            // href="/about-us"
            className="dropdown-footer-item"
            style={{ color: "lightgrey" }}
          >
            About Us
          </a>
          <a
            // href="/terms-of-use"
            className="dropdown-footer-item"
            style={{ color: "lightgrey" }}
          >
            Privacy Policy
          </a>

          <a
            // href="/terms-of-use"
            className="dropdown-footer-item"
            style={{ color: "lightgrey" }}
          >
            FAQ
          </a>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
