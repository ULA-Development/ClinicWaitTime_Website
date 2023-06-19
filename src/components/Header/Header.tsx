import React from "react";
import Navbar from "./Navbar";
import "./Header.css";
import { ReactComponent as Logo } from "../../assets/icons/umbrella-solid.svg";

interface HeaderProps {
  selectedItem: string | null;
}

function Header({ selectedItem }: HeaderProps) {
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
}

export default Header;
