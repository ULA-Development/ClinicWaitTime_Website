import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import { ReactComponent as SignupIcon } from "../../assets/icons/folder-plus-solid.svg";
import {
  dbHandler,
  authHandler,
  handleErrorMessages,
} from "../../data/firebase";
import "./SignupPage.css";
import { UserCredential } from "firebase/auth";

const SignupPage = () => {
  const [resetInput, setResetInput] = useState(false)
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
  const handleSignUp = () => {
    if (!/^[a-zA-Z]+$/.test(nameText)) {
      setNameErrorMessage("Name can only contain letters");
      return;
    }
    if (confirmText != passText) {
      setConfirmErrorMessage("Password does not match");
      return;
    }

    if (authHandler.auth.currentUser === null) {
      authHandler
        .signUp(authHandler.auth, emailText, passText)
        .then((newUser) => {
          verifyAndCreateUser(newUser)
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
            setConfirmErrorMessage(message);
            setNameErrorMessage(message);
          }
        });
    } else {
      authHandler.auth.signOut();
      alert("Cannot perform this action at the moment")
      setResetInput(true)
    }
  };
  const verifyAndCreateUser = (newUser: UserCredential) => {
    const uid = newUser.user.uid;
    authHandler.updateProfile(newUser.user, { displayName: nameText });
    authHandler.sendEmailVerification(newUser.user).then(() => {
      dbHandler.createUser(uid, nameText, emailText);
      alert("Email verified - account created")
    }).catch((error) => {
      alert(error)
    })
    
  }
  return (
    <div>
      <Header />
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
              value={confirmText}
              onChange={setConfirmText}
              type="Confirm Password"
              errorMessage={confirmErrorMessage}
              setError={setConfirmErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
          </div>
          <a href="/signin">Already have an account? Sign in</a>
          <div style={{ alignSelf: "center", width: "70%" }}>
            <Button onClick={() => handleSignUp()}>Create new account</Button>
          </div>
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};

export default SignupPage;
