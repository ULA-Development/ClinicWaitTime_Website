import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Header.css";
import { ReactComponent as Logo } from "../../assets/download.svg";
import MobileHeader from "./MobileHeader";
interface HeaderProps {
  selectedItem: string | null;
}

function Header({ selectedItem }: HeaderProps) {
  const [resize, setResize] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () => setResize(window.innerWidth <= 700));

  const desktopHeader = () => {
    return (
      <section className="header">
        <section className="header-logo">
          <Logo className="logo" />
        </section>
        <section className="header-navbar">
          <Navbar selectedItem={selectedItem} />
        </section>
      </section>
    );
  };
  const mobileHeader = () => {
    return <MobileHeader />;
  };
  return resize ? mobileHeader() : desktopHeader();
}

export default Header;
