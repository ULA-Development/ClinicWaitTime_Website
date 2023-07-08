import React, { useState } from "react";
import "./SmallFooter.css";
import logo from "../assets/icons/umbrella-solid.svg";
import { useSelector } from "react-redux";

const SmallFooter = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value);
  return (
    <div
      className="footer"
      style={
        isMobile
          ? { justifyContent: "center" }
          : { justifyContent: "space-between" }
      }
    >
      <div className="footer-buttons">
        <a href="/About-Us" className="footer-button">
          About Us
        </a>
        <p>|</p>
        <a href="/Contact" className="footer-button">
          Contact
        </a>
        <p>|</p>
        <a href="Terms-of-Use" className="footer-button">
          Terms of Use
        </a>
      </div>
      {isMobile ? null : (
        <img className="footer-logo" src={logo} alt="ULA LOGO" />
      )}
    </div>
  );
};

export default SmallFooter;
