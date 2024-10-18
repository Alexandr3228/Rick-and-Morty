import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "./../assets/image/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link className="logo" to="/">
          <Logo />
        </Link>
        <nav className="nav">
          <Link className="nav__link" to="/">
            Characters
          </Link>
          <Link className="nav__link" to="/locations">
            Locations
          </Link>
          <Link className="nav__link" href="/episodes">
            Episodes
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
