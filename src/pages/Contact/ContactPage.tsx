import React, { useRef } from "react";
import Header from "../../components/Header/Header";
import SmallFooter from "../../components/SmallFooter";
import "./ContactPage.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: any) => {
    e.preventDefault();

    if (form.current) {
      // Generate a unique reference number
      let referenceNumber = Date.now().toString();

      let hiddenInput = document.createElement("input");
      hiddenInput.setAttribute("type", "hidden");
      hiddenInput.setAttribute("name", "reference_number");
      hiddenInput.setAttribute("value", referenceNumber);
      form.current.appendChild(hiddenInput);

      emailjs
        .sendForm(
          "service_0uxrxuf",
          "template_41a8tfh",
          form.current,
          "ICVhNG2gPY2OLlrnk"
        )
        .then(
          () => {
            if (form.current) {
              form.current.removeChild(hiddenInput);
            }
            e.target.reset();
            alert("Email sent successfully!");
          },
          (error) => {
            alert("Failed to send email: " + error.text);
          }
        );
    }
  };
  return (
    <div>
      <Header selectedItem={"Home"} />
      <div className="contact-content">
        <h2>Contact Us</h2>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
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
