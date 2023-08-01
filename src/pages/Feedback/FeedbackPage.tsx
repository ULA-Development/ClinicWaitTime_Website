import { useState } from "react";
import Header from "../../components/Header/Header";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import SuccessSubmit from "../../components/SuccessSubmit";
import { useCookies } from "react-cookie";
import { dbHandler } from "../../data/firebase";
import "./FeedbackPage.css";

const FeedbackPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () =>
    setIsMobile(window.innerWidth <= 700)
  );
  const [cookies, setCookie] = useCookies(["feedbackSubmitted"]);
  const [invalid, setInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(
    cookies.feedbackSubmitted !== undefined
  );
  const [feedback, setFeedback] = useState("");
  function handleSubmit() {
    if (feedback.length === 0) {
      setInvalid(false);
      return;
    }
    if (cookies.feedbackSubmitted === undefined) {
      setCookie("feedbackSubmitted", true, { maxAge: 60 * 60 * 4 });
      dbHandler
        .createFeedback(feedback)
        .then(() => setSubmitted(true))
        .catch((error) => alert(error));
    }
  }
 
  const submitInfoSection = () => {
    return (
      <div className="feedback-main-container">
        <div
          className="feedback-content"
          style={isMobile ? { width: "90%" } : { width: "600px" }}
        >
          <h1>We're Listening.</h1>
          <h5 className="feed-subtitle">
            Thank you for using our website. We're always interested in hearing
            what you have to say.
          </h5>
          <span style={{ marginBottom: "10px" }}>
            What's great, or not so great, about your experience so far?
          </span>
          <textarea
            value={feedback}
            onChange={(text) => [
              setFeedback(text.target.value),
              setInvalid(text.target.value.length === 0),
            ]}
            onBlur={() => setInvalid(feedback.length === 0)}
            className={invalid ? "invalid-textarea" : "textarea-feedback"}
          />
          {invalid ? (
            <span className="required-feild-error">This field is required</span>
          ) : null}
          <h5 className="acknowledgement-text">
            By clicking 'Submit', you acknowledge that the information you have
            shared will be kept confidential and will be collected by MedFlow.
            Please don't include any sensitive information. You also acknowledge
            that we may contact you to address your feedback or concerns.
          </h5>
          <Button
            onClick={handleSubmit}
            style={{ width: "200px" }}
            noImg={true}
          >
            Submit
          </Button>
          <SmallFooter />
        </div>
      </div>
    );
  };
  return (
    <>
      <Header />
      {submitted ? (
        <SuccessSubmit cookie={["feedbackSubmitted"]} />
      ) : (
        submitInfoSection()
      )}
      <SmallFooter />
    </>
  );
};

export default FeedbackPage;
