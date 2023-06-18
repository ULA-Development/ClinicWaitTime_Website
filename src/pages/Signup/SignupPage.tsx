import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import { ReactComponent as SignupIcon } from "../../assets/icons/folder-plus-solid.svg";
import "./SignupPage.css";

const SignupPage = () => {
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [passText, setPassText] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState<null | string>(null);
  const [nameText, setNameText] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState<null | string>(null);
  const [confirmText, setConfirmText] = useState("");
  const [confirmErrorMessage, setConfirmErrorMessage] = useState<null | string>(
    null
  );
  return (
    <div>
      <Header selectedItem={"Signup"} />
      <div className="content-container">
        <div className="content">
          <div className="title">
            <SignupIcon className="sign-in-logo" />
            <span className="title">Create new account</span>
          </div>
          <a href="/register">Register as a practice? Click here</a>
          <div className="input-fields">
            <TextInput
              value={nameText}
              onChange={setNameText}
              type="Name"
              errorMessage={nameErrorMessage}
              setError={setNameErrorMessage}
            />
            <TextInput
              value={emailText}
              onChange={setEmailText}
              type="Email"
              errorMessage={emailErrorMessage}
              setError={setEmailErrorMessage}
            />
            <TextInput
              value={passText}
              onChange={setPassText}
              type="Password"
              errorMessage={passErrorMessage}
              setError={setPassErrorMessage}
            />
            <TextInput
              value={confirmText}
              onChange={setConfirmText}
              type="Confirm Password"
              errorMessage={confirmErrorMessage}
              setError={setConfirmErrorMessage}
            />
          </div>
          <a href="/signin">Already have an account? Sign in</a>
          <div style={{ alignSelf: "center", width: "70%" }}>
            <Button onClick={() => console.log("sign in")}>
              Create new account
            </Button>
          </div>
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};

export default SignupPage;
