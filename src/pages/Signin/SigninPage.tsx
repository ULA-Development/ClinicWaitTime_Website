import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput";
import SmallFooter from "../../components/SmallFooter";
import { ReactComponent as SigninIcon } from "../../assets/icons/sign-in-alt-solid.svg"
import "./SigninPage.css";

const SigninPage = () => {
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    "Incorrect email"
  );
  const [passText, setPassText] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState<null | string>(
    "null"
  );
  return (
    <div>
      <Header />
      <div className="content-container">
        <div className="content">
          <div className="title">
            <SigninIcon className="logo"/>
            <span className="title">Sign into ULA</span>
          </div>
          <span>Don't have an account? Create account</span>
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
          <span>Forogt your password?</span>
        </div>
      </div>
      <SmallFooter/>
    </div>
  );
};

export default SigninPage;
