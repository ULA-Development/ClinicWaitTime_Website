import { useState } from "react";
import { ReactComponent as CheckIcon } from "../assets/icons/check-circle-solid.svg";
import { useCookies } from "react-cookie";
import "./SuccessSubmit.css"

interface SuccessProps {
  cookie: string[];
}
const SuccessSubmit = ({ cookie }: SuccessProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () =>
    setIsMobile(window.innerWidth <= 700)
  );
  const [cookies, setCookie, removeCookie] = useCookies(cookie);
  return (
    <div className="success-main-container">
      <div
        className="success-content"
        style={isMobile ? { width: "90%" } : { width: "600px" }}
      >
        <h1>Thank you.</h1>
        <h5 className="success-subtitle">Your message has been submitted.</h5>
        <span>
          {" "}
          We appreciate your support and will review your message very soon.
        </span>
        <h5 className="success-subtitle">
          Submitting more messages will be disabled until your message has been
          processed.
        </h5>
        <CheckIcon className="check-icon" />
        {/* <button
        onClick={() => removeCookie(cookie[0])}
        style={{ display: "block", marginTop: "50px" }}
      >
        Reset cookies
      </button> */}
      </div>
    </div>
  );
};
export default SuccessSubmit;
