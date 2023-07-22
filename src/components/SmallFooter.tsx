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
        <a href="/feedback" className="footer-button">
          Feedback
        </a>
        <p>|</p>
        <a href="/contact" className="footer-button">
          Contact
        </a>
        <p>|</p>
        <a href="/terms-of-use" className="footer-button">
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
