import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import { ReactComponent as SigninIcon } from "../../assets/icons/sign-in-alt-solid.svg";
import "./SigninPage.css";
import { authHandler, handleErrorMessages } from "../../data/firebase";
import { useSelector } from "react-redux";

const SigninPage = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value);
  const [resetInput, setResetInput] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [passText, setPassText] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState<null | string>(null);

  const handleSignIn = () => {
    if (authHandler.auth.currentUser === null) {
      authHandler
        .signIn(authHandler.auth, emailText, passText)
        .then((user) => {
          if (user.user.emailVerified === false) {
            authHandler.auth.signOut();
            alert("Don't let them in, email not verified");
          } else {
            alert("successful sign in");
          }
        })
        .catch((error) => {
          const [type, message] = handleErrorMessages(error.code);
          if (type === "email") {
            setEmailErrorMessage(message);
          } else if (type === "password") {
            setPassErrorMessage(message);
          } else {
            setEmailErrorMessage(message);
            setPassErrorMessage(message);
          }
        });
    } else {
      authHandler.auth.signOut();
      alert("Cannot perform this action at the moment");
      setResetInput(true);
    }
  };

  return (
    <div>
      <Header/>
      <div className="content-container">
        <div
          className="content-signin"
          style={isMobile ? { width: "95%" } : { width: "515px" }}
        >
          <div className="title">
            <SigninIcon className="sign-in-logo" />
            <span className="title">Log in</span>
          </div>
          <a href="/signup">Don't have an account? Create account</a>
          <div className="input-fields-signin">
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
          </div>
          <a href="/forogotpassword">Forogt your password?</a>
          <div
            style={
              isMobile
                ? { width: "100%" }
                : { width: "70%", alignSelf: "center" }
            }
          >
            <Button onClick={() => handleSignIn()}>Sign in</Button>
          </div>
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};

export default SigninPage;
