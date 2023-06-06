import React, { useState } from "react";
import "./SmallFooter.css";
import HomePage from "../pages/Home/HomePage";

const SmallFooter = () => {
  const [showAnotherPage, setShowAnotherPage] = useState(false);

  return (
    <div className="footer">
      <div className="footer-buttons">
        <button className="footer-button">COMPANY</button>
        <button className="footer-button">ABOUT US</button>
        <button className="footer-button">SERVICES</button>
      </div>
      <span style={{ color: "white" }} className="footer-logo">
        ULA LOGO
      </span>
    </div>
  );
};

export default SmallFooter;

{
  /* <img
        src="assets/icons/user-solid.png"
        alt="Logo"
        className="footer-logo"
      /> */
}
