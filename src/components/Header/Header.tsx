import Navbar from "./Navbar";
import "./Header.css";
import Umbrella from "../../assets/icons/umbrella-solid.svg";

function Header() {
  return (
    <section className="header">
      <section className="header-logo">
        <img src={Umbrella} alt="Umbrella Logo" />
      </section>
      <section className="header-navbar">
        <Navbar />
      </section>
    </section>
  );
}

export default Header;
