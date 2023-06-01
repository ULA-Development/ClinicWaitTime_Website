import Navbar from "./Navbar";
import "./Header.css";

function Header() {
  return (
    <section className="header">
      <section className="header-logo">LOGO</section>
      <section className="header-navbar">
        <Navbar />
      </section>
    </section>
  );
}

export default Header;
