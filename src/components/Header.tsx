import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/image/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link className="logo" to="/">
          <img src={logo} alt="" />
        </Link>
        <nav className="nav">
          <Link className="nav__link" to="/">
            Characters
          </Link>
          <Link className="nav__link" to="/locations">
            Locations
          </Link>
          <Link className="nav__link" to="/episodes">
            Episodes
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
