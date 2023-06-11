import React, { useState } from "react";
import "./SmallFooter.css";
import logo from "../assets/icons/umbrella-solid.svg";

const SmallFooter = () => {
  const [showAnotherPage, setShowAnotherPage] = useState(false);

  return (
    <div className="footer">
      <div className="footer-buttons">
        <a href="/About-Us" className="footer-button">
          About Us
        </a>
        <a href="/Contact" className="footer-button">
          Contact
        </a>
        <a href="Terms-of-Use" className="footer-button">
          Terms of Use
        </a>
      </div>
      <img className="footer-logo" src={logo} alt="ULA LOGO" />
    </div>
  );
};

export default SmallFooter;
