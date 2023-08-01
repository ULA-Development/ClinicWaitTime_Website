import { useState } from "react";
import logo from "../assets/logo.svg";
import { useDispatch } from "react-redux";
import { show } from "../reducers/termsReducer";
import "./SmallFooter.css";

const SmallFooter = () => {
  const dispatch = useDispatch();
  const [isMobile, setisMobile] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () =>
    setisMobile(window.innerWidth <= 700)
  );

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
        <a
          className="footer-button"
          onClick={() => {
            dispatch(show());
          }}
        >
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
