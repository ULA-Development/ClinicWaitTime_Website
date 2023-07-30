import React, { useEffect, useState } from "react";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";
import ContactPage from "./pages/Contact/ContactPage";
import RegisterPage from "./pages/Register/register";
import FeedbackPage from "./pages/Feedback/FeedbackPage";
import TermsPopUp from "./components/TermsPopUp";
import { useSelector } from "react-redux";

function App() {
  const showTerms = useSelector((state: any) => state.termsReducer.value)
  return (
    <div>
      {renderContent(window.location.pathname)}
      { showTerms ? <TermsPopUp/> : null}
    </div>
  );
}

// Conditional Rendering
function renderContent(path: string | null) {
  switch (path?.replace("/", "")) {
    case "signin": {
      return <LoginPage />;
    }
    case "signup": {
      return <SignupPage />;
    }
    case "contact": {
      return <ContactPage />;
    }
    case "feedback": {
      return <FeedbackPage />;
    }
    case "register": {
      return <RegisterPage />;
    }
    default: {
      return <HomePage />;
    }
  }
}

export default App;
