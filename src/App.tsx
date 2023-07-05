import React, { useEffect, useState } from "react";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";
import ContactPage from "./pages/Contact/ContactPage";
import { useDispatch } from "react-redux";
import { updateBrowserView } from './reducers/mobileReducer'

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
  if (path === "/signin") {
    return <LoginPage />;
  } else if (path === "/signup") {
    return <SignupPage />;
  } else if (path === "/contact") {
    return <ContactPage />;
  } else {
    return <HomePage />;
  }
}

export default App;
