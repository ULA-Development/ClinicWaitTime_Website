import React, { useRef } from "react";
import Header from "../../components/Header/Header";
import SmallFooter from "../../components/SmallFooter";
import "./ContactPage.css";
import { sendEmail } from "../../data/email";
import { send } from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    sendEmail(e, form);
  };
  return (
    <div>
      <Header selectedItem={"Home"} />
      <div className="contact-content">
        <h2>Contact Us</h2>
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
          <textarea
            name="message"
            cols={30}
            rows={10}
            className="input-field"
          ></textarea>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
      <SmallFooter />
    </div>
  );
};

export default Contact;
