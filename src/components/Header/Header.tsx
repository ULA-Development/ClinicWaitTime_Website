import Navbar from "./Navbar";
import "./Header.css";
import { ReactComponent as Logo } from  "../../assets/icons/umbrella-solid.svg";

function Header() {
  return (
    <section className="header">
      <section className="header-logo">
        <Logo className="logo"/>
      </section>
      <section className="header-navbar">
        <Navbar />
      </section>
    </section>
  );
}

export default Header;
