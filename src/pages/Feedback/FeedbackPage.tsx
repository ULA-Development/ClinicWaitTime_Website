import { useState } from "react";
import Header from "../../components/Header/Header";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { dbHandler } from "../../data/firebase";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-circle-solid.svg";
import "./FeedbackPage.css";

const FeedbackPage = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value);
  const [cookies, setCookie, removeCookie] = useCookies(["feedbackSubmitted"]);
  const [invalid, setInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(
    cookies.feedbackSubmitted != undefined
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
  const subtitleText =
    "Thank you for using our website. We're always interested in hearing what you have to say.";
  const textareaDescription =
    "What's great, or not so great, about your experience so far?";
  const acknowledgementText =
    "By clicking 'Submit', you acknowledge that the information you have shared will be kept confidential and will be collected by MedFlow. Please don't include any sensitive information. You also acknowledge that we may contact you to address your feedback or concerns.";

  const submitInfoSection = () => {
    return (
      <>
        <h1>We're Listening.</h1>
        <h5 className="feed-subtitle">{subtitleText}</h5>
        <span style={{ marginBottom: "10px" }}>{textareaDescription}</span>
        <textarea
          value={feedback}
          onChange={(text) => [
            setFeedback(text.target.value),
            setInvalid(text.target.value.length === 0),
          ]}
          onBlur={() => setInvalid(feedback.length === 0)}
          className={invalid ? "invalid-textarea" : ""}
        />
        {invalid ? (
          <span className="required-feild-error">This field is required</span>
        ) : null}
        <h5 className="acknowledgement-text">{acknowledgementText}</h5>
        <Button onClick={handleSubmit} style={{ width: "200px" }} noImg={true}>
          Submit
        </Button>
        <SmallFooter />
      </>
    );
  };
  const successSubmitSection = () => {
    return (
      <>
        <h1>Thank you.</h1>
        <h5 className="feed-subtitle">Your feedback has been submitted.</h5>
        <span>
          {" "}
          We appreciate your support and will review your message very soon.
        </span>
        <h5 className="feed-subtitle">To submit more feedback, come back in 3hrs once this has been processed.</h5>
        <CheckIcon className="check-icon" />
        <button
          onClick={() => removeCookie("feedbackSubmitted")}
          style={{ display: "block", marginTop: "50px" }}
        >
          Reset cookies
        </button>
      </>
    );
  };
  return (
    <>
      <Header selectedItem={"Home"} />
      <div className="feedback-main-container">
        <div className="feedback-content" style={isMobile ? {width: "90%"} : {width: "600px"}}>
          {!submitted ? successSubmitSection() : submitInfoSection()}
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
