import React, { useEffect, useState } from "react";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";
import RegisterPage from "./pages/Signup/RegisterPage";
import ContactPage from "./pages/Contact/ContactPage";

function App() {
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return <div>{renderContent(currentPath)}</div>;
}

function renderContent(path: string | null) {
  if (path === "/signin") {
    return <LoginPage />;
  } else if (path === "/signup") {
    return <SignupPage />;
  } else if (path === "/register") {
    return <RegisterPage />;
  } else if (path === "/contact") {
    return <ContactPage />;
  } else {
    return <HomePage />;
  }
}

export default App;
