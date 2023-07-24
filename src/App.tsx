import React, { useEffect, useState } from "react";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";
import ContactPage from "./pages/Contact/ContactPage";
import RegisterPage from "./pages/Register/register";
import { useDispatch } from "react-redux";
import { updateBrowserView } from "./reducers/mobileReducer";
import FeedbackPage from "./pages/Feedback/FeedbackPage";
import TermsPage from "./pages/Terms/TermsPage";

function App() {
  // Handle browser view updating
  const dispatch = useDispatch();
  const handleResize = () => {
    dispatch(updateBrowserView());
  };
  window.addEventListener("resize", handleResize);

  // Path
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return <div>{renderContent(currentPath)}</div>;
}

// Conditional Renderingf
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
    case "terms-of-use": {
      return <TermsPage />;
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
