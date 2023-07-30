import React, { useState } from "react";
import "./SmallFooter.css";
import logo from "../assets/download.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { show } from "../reducers/termsReducer";

const SmallFooter = () => {
  const dispatch = useDispatch()
  const [resize, setResize] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () => setResize(window.innerWidth <= 700));
  return (
      <div
        className="footer"
        style={
           resize
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
          <a
            className="footer-button"
            onClick={() => {
              dispatch(show())
              // dispatch(showTerms());
            }}
          >
            Terms of Use
          </a>
        </div>
        {resize ? null : (
          <img className="footer-logo" src={logo} alt="ULA LOGO" />
        )}
      </div>
  );
};

export default SmallFooter;
