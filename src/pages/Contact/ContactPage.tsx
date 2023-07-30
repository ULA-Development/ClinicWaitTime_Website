import React, { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import SmallFooter from "../../components/SmallFooter";
import "./ContactPage.css";
import { sendEmail } from "../../data/email";
import { useCookies } from "react-cookie";
import Button from "../../components/Button";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-circle-solid.svg";

const Contact = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["contactedAlready"]);
  const [submitted, setSubmitted] = useState(
    cookies.contactedAlready != undefined
  );
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [resize, setResize] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () => setResize(window.innerWidth <= 700));
  const form = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (message.length !== 0 && cookies.contactedAlready === undefined) {
      setCookie("contactedAlready", true, { maxAge: 60 * 60 * 24 });
      // sendEmail(e, form);
    }
  };

  const contactForm = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="contact-content"
          style={resize ? { width: "90%" } : { width: "600px" }}
        >
          <div className="contact-title">
            <span style={{ display: "block", fontSize: "35px" }}>
              Contact Us
            </span>
            <span style={{ fontSize: "15px", color: "grey" }}>
              We're here when you need us.
            </span>
          </div>
          <form ref={form} onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              placeholder="Full Name"
              name="user_name"
              required
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email Address"
              name="user_email"
              required
              className="input-field"
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              required
              className="input-field"
            />
            <div
              style={{
                position: "relative",
                width: "100%",
                left: "0px",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <textarea
                name="message"
                cols={30}
                rows={10}
                onChange={(text) => [
                  setInvalid(text.target.value.length === 0),
                  setMessage(text.target.value),
                ]}
                onBlur={() => setInvalid(message.length === 0)}
                className={invalid ? "invalid-textarea" : "contact-textarea"}
              />
              {invalid ? (
                <span className="required-feild-error-contact">
                  This field is required
                </span>
              ) : null}
            </div>
            <Button typeOf="submit" noImg={true}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    );
  };
  const successSubmitSection = () => {
    return (
      <div className="success-main-container">
        <div
          className="success-content"
          style={resize ? { width: "90%" } : { width: "600px" }}
        >
          <h1>Thank you.</h1>
          <h5 className="contact-subtitle">Your message has been sent.</h5>
          <span>
            {" "}
            We appreciate your support and will review your message very soon.
          </span>
          <h5 className="contact-subtitle">
            While we process and respond to your message, submitting emails will
            be disabled for 24 hours.
          </h5>
          <CheckIcon className="check-icon" />
          <button
            onClick={() => removeCookie("contactedAlready")}
            style={{ display: "block", marginTop: "50px" }}
          >
            Reset cookies
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <Header selectedItem={"Home"} />
      {submitted ? successSubmitSection() : contactForm()}
      <SmallFooter />
    </>
  );
};

export default Contact;
