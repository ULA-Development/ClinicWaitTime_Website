import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import { ReactComponent as SigninIcon } from "../../assets/icons/sign-in-alt-solid.svg"
import "./SigninPage.css";

const SigninPage = () => {
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [passText, setPassText] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState<null | string>(
    null
  );
  return (
    <div>
      <Header />
      <div className="content-container">
        <div className="content">
          <div className="title">
            <SigninIcon className="sign-in-logo"/>
            <span className="title">Sign into ULA</span>
          </div>
          <a href="/signup">Don't have an account? Create account</a>
          <div className='input-fields'>
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
          </div>
          <a href="/forogotpassword">Forogt your password?</a>
          <div style={{alignSelf: 'center'}}>
          <Button width={450} height={50} onClick={() => console.log("sign in")}>Sign in</Button>
          </div>
        </div>
      </div>
      <SmallFooter/>
    </div>
  );
};

export default SigninPage;
