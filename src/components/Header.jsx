import React from "react";
import { ReactComponent as Logo } from "./../assets/image/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <a className="logo" href="/">
          <Logo />
        </a>
        <nav className="nav">
          <a className="nav__link" href="!#">
            Characters
          </a>
          <a className="nav__link" href="!#">
            Locations
          </a>
          <a className="nav__link" href="!#">
            Episodes
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
