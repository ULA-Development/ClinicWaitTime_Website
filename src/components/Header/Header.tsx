import React from "react";
import Navbar from "./Navbar";
import "./Header.css";
import { ReactComponent as Logo } from "../../assets/download.svg";
import { useSelector } from "react-redux";
import MobileHeader from "./MobileHeader";
interface HeaderProps {
  selectedItem: string | null;
}

function Header({ selectedItem }: HeaderProps) {
  const isMobile = useSelector((state: any) => state.isMobile.value);

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
  return isMobile ? mobileHeader() : desktopHeader();
}

export default Header;
