import React, { useState } from "react";
import Header from "../components/Header/Header";
import TextInput from "../components/TextInput";
import SmallFooter from "../components/SmallFooter";
import Button from "../components/Button";
import { ReactComponent as SignupIcon } from "../../assets/icons/folder-plus-solid.svg";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [resetInput, setResetInput] = useState(false)
  const [radioSelect, setRadioSelect] = useState("Individual provider");
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [passText, setPassText] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState<null | string>(null);
  const [nameText, setNameText] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState<null | string>(null);
  const [NPIText, setNPIText] = useState("");
  const [NPIErrorMessage, setNPIErrorMessage] = useState<null | string>(null);
  const [referralText, setReferralText] = useState("");
  const [referralErrorMessage, setReferralErrorMessage] = useState<
    null | string
  >(null);
  return (
    <div>
      <Header />
      <div className="content-container-register">
        <div className="content">
          <div className="title">
            <SignupIcon className="sign-in-logo" />
            <span className="title">Register your practice</span>
          </div>
          <div className="clinic-info">
            <p>I am registered as: </p>
            <label>
              <input
                className="radio-btn"
                type="radio"
                value="Inividual provider"
                checked={radioSelect === "Inividual provider"}
                onChange={() => setRadioSelect("Inividual provider")}
              />
              Inividual provider
            </label>
            <label>
              <input
                className="radio-btn"
                type="radio"
                value="Member clinic"
                checked={radioSelect === "Member clinic"}
                onChange={() => setRadioSelect("Member clinic")}
              />
              Member clinic
            </label>
          </div>

          <div className="input-fields">
            <TextInput
              value={nameText}
              onChange={setNameText}
              type="Name"
              errorMessage={nameErrorMessage}
              setError={setNameErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={emailText}
              onChange={setEmailText}
              type="Email"
              errorMessage={emailErrorMessage}
              setError={setEmailErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={passText}
              onChange={setPassText}
              type="Password"
              errorMessage={passErrorMessage}
              setError={setPassErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={NPIText}
              onChange={setNPIText}
              type="NPI"
              errorMessage={NPIErrorMessage}
              setError={setNPIErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={referralText}
              onChange={setReferralText}
              type="Referral"
              errorMessage={referralErrorMessage}
              setError={setReferralErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
          </div>
          <a href="/signup">Sign up as a user? Click here</a>
          <div style={{ alignSelf: "center", width: "70%" }}>
            <Button
              onClick={() => console.log("sign in")}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};

export default RegisterPage;
