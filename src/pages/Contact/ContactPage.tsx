import React, { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import SuccessSubmit from "../../components/SuccessSubmit";
import { sendEmail } from "../../data/email";
import { useCookies } from "react-cookie";
import "./ContactPage.css";

const Contact = () => {
  const [cookies, setCookie] = useCookies(["contactedAlready"]);
  const [submitted, setSubmitted] = useState(
    cookies.contactedAlready !== undefined
  );
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () =>
    setIsMobile(window.innerWidth <= 700)
  );
  const form = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (message.length !== 0 && cookies.contactedAlready === undefined) {
      setCookie("contactedAlready", true, { maxAge: 60 * 60 * 24 });
      sendEmail(e, form, setSubmitted);
    }
  };

  const contactForm = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="contact-content"
          style={isMobile ? { width: "90%" } : { width: "600px" }}
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
  return (
    <>
      <Header />
      {!submitted ? (
        <SuccessSubmit cookie={["contactedAlready"]} />
      ) : (
        contactForm()
      )}
      <SmallFooter />
    </>
  );
};

export default Contact;
