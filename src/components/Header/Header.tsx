import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Navbar from "./Navbar";
import MobileHeader from "./MobileHeader";
import "./Header.css";

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () =>
    setIsMobile(window.innerWidth <= 700)
  );

  return isMobile ? (
    <MobileHeader />
  ) : (
    <section className="header">
      <section className="header-logo">
        <Logo className="logo" />
      </section>
      <section className="header-navbar">
        <Navbar />
      </section>
    </section>
  );
}

export default Header;
